import { CourseType, CreateCourseDTOBase } from "@milestone-academia/api-interfaces";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { nestedCourseContentDTO, nestedCourseFeatureDTO } from "./nested-entities.dto";

export class CreateCourseDTO implements CreateCourseDTOBase {
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

    @ApiProperty()
    subText: string;
    
    @ApiProperty()
    details: string;
    
    @ApiProperty()
    price: number;

    @ApiPropertyOptional({
        isArray: true,
        type: nestedCourseContentDTO
    })
    content?: nestedCourseContentDTO[];

    @ApiPropertyOptional({
        isArray: true,
        type: nestedCourseFeatureDTO
    })
    features?: nestedCourseFeatureDTO[];
}