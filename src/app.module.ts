import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
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
  }), UserModule, AuthModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
