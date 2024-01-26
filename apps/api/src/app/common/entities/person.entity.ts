import { Column } from "typeorm";
import { TimeBaseEntity } from "./timeBase.entity";

export class PersonEntity extends TimeBaseEntity  {

    @Column({nullable: true})
    personalIdentification: string;

    @Column({nullable: true})
    addressLine1: string;
    
    @Column({nullable: true})
    addressLine2: string;
    
    @Column({nullable: true})
    postalCode: string;
    
    @Column({nullable: true})
    city: string;
    
    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    guardianName: string;

    @Column({nullable: true})
    guardianIdentification: string;

    @Column({nullable: true})
    phoneNumber: string;
}