import { PartialType } from '@nestjs/mapped-types';
import { CreatePetsCareDto } from './create-pets_care.dto';

export class UpdatePetsCareDto extends PartialType(CreatePetsCareDto) {}
