import { CustomRepository } from "src/custom-repository/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { UserContact } from "./entities/user_contact.entity";

@CustomRepository(UserContact)
export class UserContactRepository extends Repository<UserContact> { }