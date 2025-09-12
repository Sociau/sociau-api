import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserContactDto } from './dto/create-user_contact.dto';
import { UpdateUserContactDto } from './dto/update-user_contact.dto';
import { UserContactRepository } from './user_contact.repository';
import { UserContact } from './entities/user_contact.entity';

@Injectable()
export class UserContactService {
  constructor(private userContactRepository: UserContactRepository) { }

  async create(createUserContactDto: CreateUserContactDto): Promise<void> {
    const contact = this.userContactRepository.create(createUserContactDto);
    await this.userContactRepository.save(contact);
  }

  async update(id: number, updateUserContactDto: UpdateUserContactDto): Promise<void> {
    const contact = await this.userContactRepository.findOne({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`Contact with ID ${id} not found`);
    }

    this.userContactRepository.merge(contact, updateUserContactDto);

    await this.userContactRepository.save(contact);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userContactRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
  }

  async getById(id: number): Promise<UserContact> {
    const contact = await this.userContactRepository.findOneBy({ id });

    if (!contact) {
      throw new NotFoundException();
    }

    return contact;
  }
}
