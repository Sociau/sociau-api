import { Test, TestingModule } from '@nestjs/testing';
import { PetsCaresController } from './pets_cares.controller';
import { PetsCaresService } from './pets_cares.service';

describe('PetsCaresController', () => {
  let controller: PetsCaresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsCaresController],
      providers: [PetsCaresService],
    }).compile();

    controller = module.get<PetsCaresController>(PetsCaresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
