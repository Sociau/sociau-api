import { Test, TestingModule } from '@nestjs/testing';
import { UserContactController } from './user_contact.controller';
import { UserContactService } from './user_contact.service';

describe('UserContactController', () => {
  let controller: UserContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserContactController],
      providers: [UserContactService],
    }).compile();

    controller = module.get<UserContactController>(UserContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
