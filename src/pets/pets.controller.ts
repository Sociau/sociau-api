import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetStatus } from './enums/status-pet.enum';
import { PetsCaresService } from 'src/pets_cares/pets_cares.service';
import { PetsImagesService } from 'src/pets_images/pets_images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService, private readonly petCaresService: PetsCaresService, private readonly petImagesService: PetsImagesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiBody({ type: CreatePetDto })
  @ApiResponse({ status: 201, description: 'The pet has been successfully created.' })
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
  @ApiOperation({ summary: 'Get all pets' })
  @ApiResponse({ status: 200, description: 'Pets list' })
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
  @ApiOperation({ summary: 'Get pet' })
  @ApiResponse({ status: 200, description: 'Pet details' })
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBody({ type: UpdatePetDto })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @UseInterceptors(FilesInterceptor('files'))
  async update(@UploadedFiles() files: Express.Multer.File[], @Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    const pet = await this.petsService.update(id, updatePetDto);

    if (updatePetDto.cares) {
      await this.petCaresService.update(id, updatePetDto.cares)
    }

    if (files.length > 0) {
      await this.petImagesService.update(id, files)
    }

    return pet;
  }
}
