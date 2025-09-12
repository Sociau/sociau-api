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

    if (profilePic) {
      const profilePicUrl = await uploadImageToFirebase(profilePic, "user-profile-pic");
      updateUserDto.profile_pic = profilePicUrl;
    }

    const user = await this.userService.update(id, updateUserDto);

    const address: Partial<CreateAddressDto> = Object.fromEntries(
      Object.entries(updateUserDto)
        .filter(([key, value]) => value !== undefined && value !== "")
    ) as Partial<CreateAddressDto>;

    address.user = user;

    if (Object.keys(address).length > 1) {
      await this.addressService.update(user.address.id, address);
    }

    const contact: Partial<CreateUserContactDto> = Object.fromEntries(
      Object.entries(updateUserDto).filter(([key, value]) => value != undefined && value != "")
    ) as Partial<CreateUserContactDto>;

    contact.user = user;

    await this.userContactService.update(user.contact.id, contact);

    return user;
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
