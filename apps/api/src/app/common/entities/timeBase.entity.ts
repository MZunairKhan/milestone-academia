import { Column } from "typeorm";

export class TimeBasesEntity {

    @Column({nullable: true})
    createdDate: Date;

    @Column({nullable: true})
    createdBy: string;

    @Column({nullable: true})
    updatedDate: Date;
    
    @Column({nullable: true})
    deletedDate: Date;
}