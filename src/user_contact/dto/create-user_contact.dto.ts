import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateUserContactDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "User email", example: "José@sociau.com" })
    email?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "User phone", example: "83999999999" })
    phone?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: "User's facebook account", required: false })
    facebook?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: "User's instagram account", required: false })
    instagram?: string;

    @IsObject()
    @ApiProperty({ description: 'User data', example: { first_name: 'José' } })
    user?: User;
}
