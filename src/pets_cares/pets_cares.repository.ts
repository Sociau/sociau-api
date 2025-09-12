import { CustomRepository } from "src/custom-repository/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { PetsCare } from "./entities/pets_care.entity";

@CustomRepository(PetsCare)
export class PetsCaresRepository extends Repository<PetsCare> { }