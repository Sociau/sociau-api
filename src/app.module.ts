import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { UserContactModule } from './user_contact/user_contact.module';
import { PetsModule } from './pets/pets.module';
import { PetsImagesModule } from './pets_images/pets_images.module';
import { PetsCaresModule } from './pets_cares/pets_cares.module';
import * as dotenv from "dotenv";

dotenv.config();

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
  }), UserModule, AuthModule, AddressModule, UserContactModule, PetsModule, PetsImagesModule, PetsCaresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
