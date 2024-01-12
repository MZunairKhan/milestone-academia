import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    courseType: string;
    
    @ApiProperty()
    subjectId: string;
}