import { Pet } from "src/pets/entities/pet.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pet_images')
export class PetsImage {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @OneToOne(() => Pet, (pet) => pet.pet_images, { onDelete: "CASCADE" })
    @JoinColumn({ name: "pet_id" })
    pet: Pet;

    @Column("text", { array: true, nullable: true })
    images: string[];

}
