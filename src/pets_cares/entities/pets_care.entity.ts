import { Pet } from "src/pets/entities/pet.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pet-cares')
export class PetsCare {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @OneToOne(() => Pet, (pet) => pet.pet_cares, { onDelete: "CASCADE" })
    @JoinColumn({ name: "pet_id" })
    pet: Pet;

    @Column({ type: "varchar", nullable: true })
    diseases: string;

    @Column({ type: "varchar", nullable: true })
    medications: string;

    @Column({ type: "varchar", nullable: true })
    allergies: string;

    @Column({ type: "varchar", nullable: true })
    vaccines: string;

    @Column({ type: "varchar", nullable: true })
    specialties: string;

    @Column({ type: "boolean", nullable: false, default: false })
    neutered: boolean;
}
