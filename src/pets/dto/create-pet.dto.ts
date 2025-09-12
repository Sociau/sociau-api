import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PetGender } from "../enums/gender-pet.enum";
import { PetSize } from "../enums/size-pet.enum";
import { PetStatus } from "../enums/status-pet.enum";
import { CreatePetsCareDto } from "src/pets_cares/dto/create-pets_care.dto";

export class CreatePetDto {
    @ApiProperty({
        description: 'Name of the pet',
        example: 'Rex',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Gender of the pet',
        enum: PetGender,
        example: PetGender.M,
    })
    @IsEnum(PetGender)
    gender: PetGender;

    @ApiProperty({
        description: 'Age of the pet',
        example: '2 years',
    })
    @IsString()
    @IsNotEmpty()
    age: string;

    @ApiProperty({
        description: 'Description about the pet',
        example: 'Very playful and friendly dog',
    })
    @IsString()
    @IsNotEmpty()
    about: string;

    @ApiProperty({
        description: 'Size of the pet',
        enum: PetSize,
        example: PetSize.M,
    })
    @IsEnum(PetSize)
    size: PetSize;

    @ApiProperty({
        description: 'Status of the pet',
        enum: PetStatus,
        example: PetStatus.AVAILABLE,
        required: false,
    })
    @IsEnum(PetStatus)
    @IsOptional()
    status?: PetStatus;

    @ApiProperty({
        description: 'Pet care ',
        type: CreatePetsCareDto,
        required: false,
    })
    @IsOptional()
    cares?: CreatePetsCareDto;
}
