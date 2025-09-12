import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsOptional, IsString, Length } from "class-validator";
import { CreateAddressDto } from "src/address/dto/create-address-dto";
import { CreateUserContactDto } from "src/user_contact/dto/create-user_contact.dto";

export class CreateUserDto {

    @IsString()
    @ApiProperty({ description: 'User profile picture' })
    profile_pic: string;

    @IsString()
    @ApiProperty({ description: 'User password', example: 'abc' })
    password: string;

    @IsString()
    @ApiProperty({ description: 'User first name', example: 'José' })
    readonly first_name: string;

    @IsString()
    @ApiProperty({ description: 'User last name', example: 'Freitas' })
    readonly last_name: string;

    @IsString()
    @ApiProperty({ description: 'User cpf', example: '11111111111' })
    readonly cpf: string;

    @IsString()
    @ApiProperty({ description: 'User email', example: 'jose@sociau.com' })
    readonly email: string;

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

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "House/building number", example: "123" })
    number: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Street name", example: "Main Street" })
    street: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Neighborhood", example: "Downtown" })
    neighborhood: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "City name", example: "New York" })
    city: string;

    @IsString()
    @Length(2, 2, { message: "State must have exactly 2 characters (US/BR UF code)" })
    @ApiProperty({ description: "State code (2 letters)", example: "NY" })
    state: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ description: "Additional address info (e.g., Apartment, Suite)", example: "Apt 45", required: false })
    line_2?: string;
}
