import { CourseLevel, CourseType } from "@milestone-academia/api-interfaces";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SearchCourseDTO{
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional({
        enum: CourseType,
        isArray: false,
        example: [CourseType.Group, CourseType.OneOnOne, CourseType.SelfPaced],
    })
    courseType: CourseType;
  
    @ApiPropertyOptional({
        enum: CourseLevel,
        isArray: false,
        example: [CourseLevel.Alevel, CourseLevel.Olevel, CourseLevel.Edexcel, CourseLevel.IGCSE],
    })
    courseLevel: CourseLevel;
    
    @ApiPropertyOptional()
    subject: string;

    @ApiPropertyOptional()
    page: number;

    @ApiPropertyOptional()
    limit: number;


}