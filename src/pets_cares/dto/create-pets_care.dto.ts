import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePetsCareDto {
    @ApiProperty({ description: 'ID of the pet', example: 1 })
    @IsNumber()
    petId: number;

    @IsString()
    @ApiProperty({ description: "Pet diseases", example: "" })
    diseases: string;

    @IsString()
    @ApiProperty({ description: "Pet medications", example: "" })
    medications: string;

    @IsString()
    @ApiProperty({ description: "Pet allergies", example: "" })
    allergies: string;

    @IsString()
    @ApiProperty({ description: "Pet vaccines", example: "" })
    vaccines: string;

    @IsString()
    @ApiProperty({ description: "Pet specialties", example: "" })
    specialties: string;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ description: "Is neutered", example: false })
    neutered: boolean;
}
