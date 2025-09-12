import { Address } from "src/address/entities/address.entity";
import { Pet } from "src/pets/entities/pet.entity";
import { UserContact } from "src/user_contact/entities/user_contact.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from "typeorm";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({ name: "cpf", type: "varchar", length: 14, nullable: false, unique: true })
    cpf: string;

    @Column({ name: "password", type: "varchar", nullable: false })
    password: string;

    @Column({ name: "first_name", type: "varchar", nullable: false })
    first_name: string;

    @Column({ name: "email", type: "varchar", nullable: false })
    email: string;

    @Column({ name: "last_name", type: "varchar", nullable: false })
    last_name: string;

    @Column({ name: "born_date", type: "date", nullable: false })
    born_date: Date;

    @Column({ name: "profile_pic", type: "varchar", nullable: true })
    profile_pic: string;

    @OneToOne(() => Address, (address) => address.user, { cascade: true })
    address: Address;

    @OneToOne(() => UserContact, (contact) => contact.user, { cascade: true })
    contact: UserContact;

    @OneToMany(() => Pet, (pet) => pet.user, { cascade: true })
    pets: Pet[];
}
