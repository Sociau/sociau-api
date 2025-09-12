import { Injectable } from '@nestjs/common';
import { CreatePetsCareDto } from './dto/create-pets_care.dto';
import { UpdatePetsCareDto } from './dto/update-pets_care.dto';

@Injectable()
export class PetsCaresService {
  create(createPetsCareDto: CreatePetsCareDto) {
    return 'This action adds a new petsCare';
  }

  findAll() {
    return `This action returns all petsCares`;
  }

  findOne(id: number) {
    return `This action returns a #${id} petsCare`;
  }

  update(id: number, updatePetsCareDto: UpdatePetsCareDto) {
    return `This action updates a #${id} petsCare`;
  }

  remove(id: number) {
    return `This action removes a #${id} petsCare`;
  }
}
