import { ApiProperty } from "@nestjs/swagger";

export class CourseDurationDto {
    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty()
    days: string;
    
 
}