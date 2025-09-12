import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PetStatus } from "../enums/status-pet.enum";
import { PetsImage } from "src/pets_images/entities/pets_image.entity";
import { PetsCare } from "src/pets_cares/entities/pets_care.entity";
import { PetSize } from "../enums/size-pet.enum";
import { PetGender } from "../enums/gender-pet.enum";

@Entity("pet")
export class Pet {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @ManyToOne(() => User, (user) => user.pets, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ type: "varchar", nullable: false })
    name: string;

    @Column({
        type: "enum",
        enum: PetGender,
    })
    gender: PetGender;

    @Column({ type: "varchar", nullable: false })
    age: string;

    @Column({ type: "varchar", nullable: false })
    about: string;

    @Column({
        type: "enum",
        enum: PetSize,
    })
    size: PetSize;

    @Column({
        type: "enum",
        enum: PetStatus,
        default: PetStatus.AVAILABLE,
    })
    status: PetStatus;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @OneToOne(() => PetsImage, (pet_images) => pet_images.pet, { cascade: true })
    pet_images: PetsImage;

    @OneToOne(() => PetsCare, (pet_cares) => pet_cares.pet, { cascade: true })
    pet_cares: PetsCare;

}
