import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";
import { CreateAddressDto } from "src/address/dto/create-address-dto";
import { CreateUserContactDto } from "src/user_contact/dto/create-user_contact.dto";

export class CreateUserDto {

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

    @IsObject()
    @ApiProperty({ description: 'User address', example: { street: 'street', neighborhood: 'neighborhood' } })
    address?: CreateAddressDto;

    @IsObject()
    @ApiProperty({ description: 'User contact', example: { facebook: 'Lucas', instagram: 'jlucasgf' } })
    contact?: CreateUserContactDto;
}
