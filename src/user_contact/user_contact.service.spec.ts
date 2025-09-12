import { Test, TestingModule } from '@nestjs/testing';
import { UserContactService } from './user_contact.service';

describe('UserContactService', () => {
  let service: UserContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserContactService],
    }).compile();

    service = module.get<UserContactService>(UserContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
