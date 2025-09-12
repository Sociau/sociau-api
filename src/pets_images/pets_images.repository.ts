import { CustomRepository } from "src/custom-repository/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { PetsImage } from "./entities/pets_image.entity";

@CustomRepository(PetsImage)
export class PetsImagesRepository extends Repository<PetsImage> { }