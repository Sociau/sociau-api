import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PetsRepository } from './pets.repository';
import { TypeOrmExModule } from 'src/custom-repository/typeorm-ex.module';
import { Pet } from './entities/pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsCaresModule } from 'src/pets_cares/pets_cares.module';
import { PetsImagesModule } from 'src/pets_images/pets_images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), TypeOrmExModule.forCustomRepository([PetsRepository]), PetsCaresModule, PetsImagesModule],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule { }
