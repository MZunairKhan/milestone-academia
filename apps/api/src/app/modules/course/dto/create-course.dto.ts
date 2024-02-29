import { CourseType, CreateCourseDTOBase } from "@milestone-academia/api-interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto implements CreateCourseDTOBase {
    @ApiProperty()
    name: string;

    @ApiProperty({
        enum: CourseType,
        isArray: false,
        example: [CourseType.Group, CourseType.OneOnOne, CourseType.SelfPaced],
    })
    courseType: CourseType;
    
    @ApiProperty()
    subjectId: string;

    @ApiProperty()
    description: string;
}