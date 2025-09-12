import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetsCareDto } from './dto/create-pets_care.dto';
import { UpdatePetsCareDto } from './dto/update-pets_care.dto';
import { PetsCaresRepository } from './pets_cares.repository';

@Injectable()
export class PetsCaresService {
  constructor(private readonly petCaresRepository: PetsCaresRepository) { }

  async create(createPetsCareDto: CreatePetsCareDto) {
    const petCares = this.petCaresRepository.create({
      ...createPetsCareDto,
      pet: { id: createPetsCareDto.petId }
    });
    await this.petCaresRepository.save(petCares);
  }

  async findOne(id: number) {
    const petCares = await this.petCaresRepository.findOneBy({ id });

    if (!petCares) {
      throw new NotFoundException(`Pet care with id ${id}, not found`);
    }

    return petCares;
  }

  async update(pet_id: number, updatePetsCareDto: UpdatePetsCareDto) {
    const petsCare = await this.petCaresRepository.findOne({ where: { pet: { id: pet_id } } });

    if (!petsCare) {
      throw new NotFoundException(`Pet care of pet with ID ${pet_id} not found`);
    }

    this.petCaresRepository.merge(petsCare, updatePetsCareDto);

    await this.petCaresRepository.save(petsCare);
  }
}
