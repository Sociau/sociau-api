import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length, IsNumber, IsObject } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateAddressDto {
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

    @IsObject()
    @ApiProperty({ description: 'User data', example: { first_name: 'José' } })
    user?: User;
}
