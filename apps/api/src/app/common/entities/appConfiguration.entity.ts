import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimeBasesEntity } from "./timeBase.entity";

@Entity()
export class AppConfiguration extends TimeBasesEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;  

    @Column()
    key: string;

    @Column()
    value: string;
}