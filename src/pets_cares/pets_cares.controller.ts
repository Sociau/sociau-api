import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetsCaresService } from './pets_cares.service';
import { CreatePetsCareDto } from './dto/create-pets_care.dto';
import { UpdatePetsCareDto } from './dto/update-pets_care.dto';

@Controller('pets-cares')
export class PetsCaresController {
  constructor(private readonly petsCaresService: PetsCaresService) {}

  @Post()
  create(@Body() createPetsCareDto: CreatePetsCareDto) {
    return this.petsCaresService.create(createPetsCareDto);
  }

  @Get()
  findAll() {
    return this.petsCaresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsCaresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetsCareDto: UpdatePetsCareDto) {
    return this.petsCaresService.update(+id, updatePetsCareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsCaresService.remove(+id);
  }
}
