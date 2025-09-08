import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        let isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) {
            throw new UnauthorizedException();
        }

        const payload = { email: user.email, first_name: user.first_name, last_name: user.last_name, id: user.id };

        return {
            acess_token: await this.jwtService.signAsync(payload),
        }
    }

    async profile(userId: number): Promise<User> {
        return this.userService.getUserById(userId);
    }
}
