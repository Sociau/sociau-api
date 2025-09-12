import { Module } from '@nestjs/common';
import { PetsCaresService } from './pets_cares.service';
import { PetsCaresController } from './pets_cares.controller';

@Module({
  controllers: [PetsCaresController],
  providers: [PetsCaresService],
})
export class PetsCaresModule {}
