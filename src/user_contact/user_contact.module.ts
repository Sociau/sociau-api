import { Module } from '@nestjs/common';
import { UserContactService } from './user_contact.service';
import { UserContactController } from './user_contact.controller';

@Module({
  controllers: [UserContactController],
  providers: [UserContactService],
})
export class UserContactModule {}
