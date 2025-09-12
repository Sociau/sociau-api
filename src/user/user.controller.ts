import { Controller, Get, Post, Body, Patch, Param, UseInterceptors, UploadedFile, HttpException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Public } from 'src/auth/auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddressService } from 'src/address/address.service';
import { UserContactService } from 'src/user_contact/user_contact.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadImageToFirebase } from 'src/lib/firebase/uploadImage';
import { CreateUserContactDto } from 'src/user_contact/dto/create-user_contact.dto';
import { CreateAddressDto } from 'src/address/dto/create-address-dto';
import { deleteImageFromFirebase } from 'src/lib/firebase/deleteImage';
import { admin } from 'src/lib/firebase/connection';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly addressService: AddressService, private readonly userContactService: UserContactService) { }

  @Public()
  @Post('/create_account')
  @UseInterceptors(FileInterceptor('profile_pic'))
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ description: 'Create user data with profile picture', type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  async signUp(
    @UploadedFile() profilePic: Express.Multer.File,
    @Body() createUserDto: CreateUserDto
  ): Promise<User> {

    const userByCpf = await this.userService.findUserByCpf(createUserDto.cpf);
    if (userByCpf) {
      throw new BadRequestException("User with this CPF already exists");
    }

    const userByEmail = await this.userService.findUserByEmail(createUserDto.email);
    if (userByEmail) {
      throw new BadRequestException("User with this email already exists");
    }

    let profilePicUrl = "";
    if (profilePic) {
      profilePicUrl = await uploadImageToFirebase(profilePic, "user-profile-pic");
    }

    const userData: CreateUserDto = {
      ...createUserDto,
      profile_pic: profilePicUrl,
    };
    const user = await this.userService.create(userData);

    const addressFields = ['number', 'street', 'neighborhood', 'city', 'state', 'line_2'];
    const address: Partial<CreateAddressDto> = {};
    addressFields.forEach(field => {
      if (createUserDto[field]) address[field] = createUserDto[field];
    });
    if (Object.keys(address).length > 0) {
      address.user = user;
      await this.addressService.create(address as CreateAddressDto);
    }

    const contactFields = ['phone', 'facebook', 'instagram'];
    const contact: Partial<CreateUserContactDto> = {};
    contactFields.forEach(field => {
      if (createUserDto[field]) contact[field] = createUserDto[field];
    });
    if (Object.keys(contact).length > 0) {
      contact.user = user;
      await this.userContactService.create(contact as CreateUserContactDto);
    }

    return user;
  }



  @Patch(':id')
  @UseInterceptors(FileInterceptor('profile_pic'))
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  async update(
    @UploadedFile() profilePic: Express.Multer.File,
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {

    const user = await this.userService.getUserById(id);

    if (updateUserDto.cpf && updateUserDto.cpf !== user.cpf) {
      const cpfExists = await this.userService.findUserByCpf(updateUserDto.cpf);
      if (cpfExists) {
        throw new BadRequestException("Another user with this CPF already exists");
      }
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailExists = await this.userService.findUserByEmail(updateUserDto.email);
      if (emailExists) {
        throw new BadRequestException("Another user with this email already exists");
      }
    }

    if (profilePic) {

      if (user.profile_pic) {
        await deleteImageFromFirebase(admin.storage().bucket(), user.profile_pic);
      }

      const profilePicUrl = await uploadImageToFirebase(profilePic, "user-profile-pic");
      updateUserDto.profile_pic = profilePicUrl;
    }

    const userFields = Object.fromEntries(
      Object.entries(updateUserDto).filter(
        ([key, value]) => ['first_name', 'last_name', 'email', 'cpf', 'password', 'profile_pic'].includes(key) && value != null && value !== ""
      )
    );
    await this.userService.update(id, userFields);

    const addressFields = ['number', 'street', 'neighborhood', 'city', 'state', 'line_2'];
    const address: Partial<CreateAddressDto> = {};
    addressFields.forEach(field => {
      if (updateUserDto[field] != null && updateUserDto[field] !== "") address[field] = updateUserDto[field];
    });
    if (Object.keys(address).length > 0) {
      address.user = user;
      if (user.address) {
        await this.addressService.update(user.address.id, address);
      } else {
        await this.addressService.create(address as CreateAddressDto);
      }
    }

    const contactFields = ['phone', 'facebook', 'instagram'];
    const contact: Partial<CreateUserContactDto> = {};
    contactFields.forEach(field => {
      if (updateUserDto[field] != null && updateUserDto[field] !== "") contact[field] = updateUserDto[field];
    });
    if (Object.keys(contact).length > 0) {
      contact.user = user;
      if (user.contact) {
        await this.userContactService.update(user.contact.id, contact);
      } else {
        await this.userContactService.create(contact as CreateUserContactDto);
      }
    }

    return this.userService.getUserById(id);
  }



  @Get(':id')
  @ApiOperation({ summary: 'Get an existing user by id' })
  @ApiResponse({ status: 200, description: 'User data' })
  async getById(
    @Param("id") id: number,
  ): Promise<User> {
    return await this.userService.getUserById(id);
  }
}
