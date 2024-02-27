import { ApiProperty } from "@nestjs/swagger";

export class TimeSlotDto {
    @ApiProperty()
    startTime: string;

    @ApiProperty()
    endTime: string;
    
 
}