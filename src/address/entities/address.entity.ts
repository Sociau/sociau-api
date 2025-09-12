import { User } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";

@Entity("address")
export class Address {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @OneToOne(() => User, (user) => user.address, { onDelete: "CASCADE" })
    user: User;

    @Column({ type: "varchar", nullable: false })
    number: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    street: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    neighborhood: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    city: string;

    @Column({ type: "varchar", length: 2, nullable: false })
    state: string;

    @Column({ type: "varchar", length: 150, nullable: true })
    line_2: string;
}
