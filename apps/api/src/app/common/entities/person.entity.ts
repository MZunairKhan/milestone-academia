import { Column } from "typeorm";
import { TimeBaseEntity } from "./timeBase.entity";

export class PersonEntity extends TimeBaseEntity  {

    @Column({nullable: true})
    address: string;

    @Column({nullable: true})
    guardian: string;

    @Column({nullable: true})
    phone: string;
}