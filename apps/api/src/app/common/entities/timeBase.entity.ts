import { Column, DeleteDateColumn } from "typeorm";

export class TimeBaseEntity {

    @Column({nullable: true})
    createdDate: Date;

    @Column({nullable: true})
    createdBy: string;

    @Column({nullable: true})
    updatedDate: Date;
    
    @DeleteDateColumn({ nullable: true })
    deletedDate: Date;
}