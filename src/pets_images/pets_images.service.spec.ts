import { Test, TestingModule } from '@nestjs/testing';
import { PetsImagesService } from './pets_images.service';

describe('PetsImagesService', () => {
  let service: PetsImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsImagesService],
    }).compile();

    service = module.get<PetsImagesService>(PetsImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
