import { Injectable } from '@nestjs/common';
import { CreatePetsImageDto } from './dto/create-pets_image.dto';
import { UpdatePetsImageDto } from './dto/update-pets_image.dto';

@Injectable()
export class PetsImagesService {
  create(createPetsImageDto: CreatePetsImageDto) {
    return 'This action adds a new petsImage';
  }

  findAll() {
    return `This action returns all petsImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} petsImage`;
  }

  update(id: number, updatePetsImageDto: UpdatePetsImageDto) {
    return `This action updates a #${id} petsImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} petsImage`;
  }
}
