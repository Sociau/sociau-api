import { PartialType } from '@nestjs/mapped-types';
import { CreatePetsImageDto } from './create-pets_image.dto';

export class UpdatePetsImageDto extends PartialType(CreatePetsImageDto) {}
