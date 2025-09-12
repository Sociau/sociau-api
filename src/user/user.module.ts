import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TypeOrmExModule } from 'src/custom-repository/typeorm-ex.module';
import { UserRepository } from './user.repository';
import { AddressModule } from 'src/address/address.module';
import { UserContactModule } from 'src/user_contact/user_contact.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmExModule.forCustomRepository([UserRepository]), AddressModule, UserContactModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
