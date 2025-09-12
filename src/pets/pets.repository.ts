import { CustomRepository } from "src/custom-repository/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Pet } from "./entities/pet.entity";

@CustomRepository(Pet)
export class PetsRepository extends Repository<Pet> { }