import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: "sociau22",
                };
            },
            inject: [ConfigService],
            global: true
        }),
        JwtModule.register({
            signOptions: { expiresIn: "24h" },
        }),
        ConfigModule,
    ],
    providers: [
        { provide: APP_GUARD, useClass: AuthGuard }, AuthService
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
