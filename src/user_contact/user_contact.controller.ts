import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserContactService } from './user_contact.service';
import { CreateUserContactDto } from './dto/create-user_contact.dto';
import { UpdateUserContactDto } from './dto/update-user_contact.dto';

@Controller('user-contact')
export class UserContactController {
  constructor(private readonly userContactService: UserContactService) {}

  @Post()
  create(@Body() createUserContactDto: CreateUserContactDto) {
    return this.userContactService.create(createUserContactDto);
  }

  @Get()
  findAll() {
    return this.userContactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userContactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserContactDto: UpdateUserContactDto) {
    return this.userContactService.update(+id, updateUserContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userContactService.remove(+id);
  }
}
