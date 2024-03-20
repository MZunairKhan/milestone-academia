import { Days } from "@milestone-academia/api-interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class CourseDurationDto {
    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty({
        enum: Days,
        isArray: true,
        example: [...Object.values(Days)],
    })
    days: Days[];
}