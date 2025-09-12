import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetsRepository } from './pets.repository';
import { PetStatus } from './enums/status-pet.enum';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(private petRepository: PetsRepository) { }
  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const pet = this.petRepository.create(createPetDto);
    return await this.petRepository.save(pet);
  }

  async findAll(filters: {
    name?: string;
    status?: PetStatus;
    size?: string;
    userId?: number;
    page?: number;
    limit?: number;
    orderBy?: string;
    order?: 'ASC' | 'DESC';
  }) {
    const query = this.petRepository.createQueryBuilder('pet');

    if (filters.name) {
      query.andWhere('pet.name ILIKE :name', { name: `%${filters.name}%` });
    }

    if (filters.status) {
      query.andWhere('pet.status = :status', { status: filters.status });
    }

    if (filters.size) {
      query.andWhere('pet.size = :size', { size: filters.size });
    }

    if (filters.userId) {
      query.andWhere('pet.userId = :userId', { userId: filters.userId });
    }

    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const limit = filters.limit && filters.limit > 0 ? filters.limit : 10;
    const offset = (page - 1) * limit;

    query.skip(offset).take(limit);

    if (filters.orderBy) {
      query.orderBy(`pet.${filters.orderBy}`, filters.order ?? 'ASC');
    }

    const [items, total] = await query.getManyAndCount();

    return {
      data: items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }


  async findOne(id: number): Promise<Pet> {
    const pet = await this.petRepository.findOneBy({ id });

    if (!pet) {
      throw new NotFoundException(`Pet with id ${id}, not found`);
    }

    return pet;
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    const pet = await this.petRepository.findOne({ where: { id } });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    this.petRepository.merge(pet, updatePetDto);

    await this.petRepository.save(pet);
  }
}
