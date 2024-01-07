import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimeBasesEntity } from "./timeBase.entity";

@Entity()
export class AppConfiguration extends TimeBasesEntity {
    @PrimaryGeneratedColumn()
    id: number;  

    @Column()
    key: string;

    @Column()
    value: string;
}