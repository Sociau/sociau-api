import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('contact')
export class UserContact {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @OneToOne(() => User, (user) => user.contact, { onDelete: "CASCADE" })
    user: User;

    @Column({ type: "varchar", nullable: true })
    phone: string;

    @Column({ type: "varchar", nullable: true })
    email: string;

    @Column({ type: "varchar", nullable: true })
    facebook: string;

    @Column({ type: "varchar", nullable: true })
    instagram: string;
}
