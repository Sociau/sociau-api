import { Test, TestingModule } from '@nestjs/testing';
import { PetsCaresService } from './pets_cares.service';

describe('PetsCaresService', () => {
  let service: PetsCaresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetsCaresService],
    }).compile();

    service = module.get<PetsCaresService>(PetsCaresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
