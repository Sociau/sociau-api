import { Module } from '@nestjs/common';
import { PetsImagesService } from './pets_images.service';
import { PetsImagesController } from './pets_images.controller';

@Module({
  controllers: [PetsImagesController],
  providers: [PetsImagesService],
})
export class PetsImagesModule {}
