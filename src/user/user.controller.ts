import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Public } from 'src/auth/auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddressService } from 'src/address/address.service';
import { UserContactService } from 'src/user_contact/user_contact.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly addressService: AddressService, private readonly userContactService: UserContactService) { }

  @Public()
  @Post('/create_account')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto);

    if (createUserDto.address) {

      await this.addressService.create({
        ...createUserDto.address,
        user: user,
      });
    }

    if (createUserDto.contact) {
      await this.userContactService.create({
        ...createUserDto.contact,
        email: createUserDto.email,
        user: user,
      })
    }

    return user;
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userService.update(id, updateUserDto);

    if (updateUserDto.address) {
      await this.addressService.update(user.address.id, updateUserDto.address);
    }

    if (updateUserDto.contact) {
      await this.userContactService.update(user.contact.id, updateUserDto.contact);
    }

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
