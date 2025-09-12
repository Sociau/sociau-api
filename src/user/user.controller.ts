import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Public } from 'src/auth/auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AddressService } from 'src/address/address.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly addressService: AddressService) { }


  @Public()
  @Post('/create_account')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto);

    if (createUserDto.address) {

      const address = await this.addressService.create({
        ...createUserDto.address,
        user: user,
      });

      user.address = address;
    }

    return user;
  }
}
