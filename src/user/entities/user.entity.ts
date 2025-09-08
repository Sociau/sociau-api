import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    first_name: string;

    @Column({ nullable: false })
    last_name: string;

    @Column()
    born_date: Date;

    @Column()
    profile_pic: string;

    @Column({ nullable: false })
    cpf: string;

    @Column({ nullable: false })
    email: string;
}
