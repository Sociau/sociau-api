import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TypeOrmExModule } from 'src/custom-repository/typeorm-ex.module';
import { UserRepository } from './user.repository';
import { AddressService } from 'src/address/address.service';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmExModule.forCustomRepository([UserRepository]), AddressModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule { }
