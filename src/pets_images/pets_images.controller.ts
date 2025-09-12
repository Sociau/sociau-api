import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PetsImagesService } from './pets_images.service';
import { CreatePetsImageDto } from './dto/create-pets_image.dto';
import { UpdatePetsImageDto } from './dto/update-pets_image.dto';

@Controller('pets-images')
export class PetsImagesController {
  constructor(private readonly petsImagesService: PetsImagesService) {}

  @Post()
  create(@Body() createPetsImageDto: CreatePetsImageDto) {
    return this.petsImagesService.create(createPetsImageDto);
  }

  @Get()
  findAll() {
    return this.petsImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetsImageDto: UpdatePetsImageDto) {
    return this.petsImagesService.update(+id, updatePetsImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsImagesService.remove(+id);
  }
}
