import { Module } from '@nestjs/common';
import { PetsCaresService } from './pets_cares.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsCare } from './entities/pets_care.entity';
import { TypeOrmExModule } from 'src/custom-repository/typeorm-ex.module';
import { PetsCaresRepository } from './pets_cares.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PetsCare]), TypeOrmExModule.forCustomRepository([PetsCaresRepository])],
  providers: [PetsCaresService],
  exports: [PetsCaresService]
})
export class PetsCaresModule { }
