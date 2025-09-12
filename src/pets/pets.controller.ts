import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetStatus } from './enums/status-pet.enum';
import { PetsCaresService } from 'src/pets_cares/pets_cares.service';
import { PetsImagesService } from 'src/pets_images/pets_images.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService, private readonly petCaresService: PetsCaresService, private readonly petImagesService: PetsImagesService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createPetDto: CreatePetDto
  ) {
    const pet = await this.petsService.create(createPetDto);

    if (createPetDto.cares) {
      await this.petCaresService.create(createPetDto.cares)
    }

    if (files.length > 0) {
      await this.petImagesService.create(pet.id, files)
    }

    return pet;
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('status') status?: PetStatus,
    @Query('size') size?: string,
    @Query('userId') userId?: number,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('orderBy') orderBy?: string,
    @Query('order') order?: 'ASC' | 'DESC',
  ) {
    return this.petsService.findAll({
      name,
      status,
      size,
      userId,
      page,
      limit,
      orderBy,
      order,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(+id, updatePetDto);
  }
}
