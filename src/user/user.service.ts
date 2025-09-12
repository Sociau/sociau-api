import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import * as dotenv from "dotenv";
import { UpdateUserDto } from './dto/update-user.dto';

dotenv.config();

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) { }


  async create(createUserDto: CreateUserDto) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);

    let existUser = await this.userRepository.findOneBy({ cpf: createUserDto.cpf });

    if (existUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    existUser = await this.userRepository.findOneBy({ email: createUserDto.email });

    if (existUser) {
      throw new HttpException('User email already exists', HttpStatus.BAD_REQUEST);
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, saltRounds);

    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);
    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['address', 'contact'],
    });


    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findUserByCpf(cpf: string): Promise<User | null> {
    return this.userRepository.findOneBy({ cpf });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['address', 'contact'],
    });

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

}
