import { Test, TestingModule } from '@nestjs/testing';
import { PetsImagesController } from './pets_images.controller';
import { PetsImagesService } from './pets_images.service';

describe('PetsImagesController', () => {
  let controller: PetsImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsImagesController],
      providers: [PetsImagesService],
    }).compile();

    controller = module.get<PetsImagesController>(PetsImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
