import { IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    readonly id: number;

    @IsString()
    password: string;

    @IsString()
    readonly first_name: string;

    @IsString()
    readonly last_name: string;

    @IsString()
    readonly cpf: string;

    @IsString()
    readonly email: string;
}
