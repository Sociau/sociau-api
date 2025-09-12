import { CustomRepository } from "src/custom-repository/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Address } from "./entities/address.entity";

@CustomRepository(Address)
export class AddressRepository extends Repository<Address> { }