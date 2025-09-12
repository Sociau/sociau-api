import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AddressRepository } from './address.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { TypeOrmExModule } from 'src/custom-repository/typeorm-ex.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), TypeOrmExModule.forCustomRepository([AddressRepository])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule { }
