import { Module } from '@nestjs/common';
import { UserContactService } from './user_contact.service';
import { UserContactController } from './user_contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContact } from './entities/user_contact.entity';
import { TypeOrmExModule } from 'src/custom-repository/typeorm-ex.module';
import { UserContactRepository } from './user_contact.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserContact]), TypeOrmExModule.forCustomRepository([UserContactRepository])],
  controllers: [UserContactController],
  providers: [UserContactService],
  exports: [UserContactService]
})
export class UserContactModule { }
