import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimeBaseEntity } from "./timeBase.entity";

@Entity()
export class AppConfiguration extends TimeBaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;  

    @Column()
    key: string;

    @Column()
    value: string;
}