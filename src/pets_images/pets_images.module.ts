import { Module } from '@nestjs/common';
import { PetsImagesService } from './pets_images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetsImage } from './entities/pets_image.entity';
import { TypeOrmExModule } from 'src/custom-repository/typeorm-ex.module';
import { PetsImagesRepository } from './pets_images.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PetsImage]), TypeOrmExModule.forCustomRepository([PetsImagesRepository])],
  providers: [PetsImagesService],
  exports: [PetsImagesService]
})
export class PetsImagesModule { }
