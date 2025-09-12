import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Public } from 'src/auth/auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddressService } from 'src/address/address.service';
import { UserContactService } from 'src/user_contact/user_contact.service';

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
}
