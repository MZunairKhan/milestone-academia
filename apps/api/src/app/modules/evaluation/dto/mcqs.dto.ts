import { CourseLevel, CreateMcqsDTOBase, Levels } from "@milestone-academia/api-interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMcqsDTO implements CreateMcqsDTOBase {
    @ApiProperty()
    question: string;

    @ApiProperty({
    enum: Levels,
    })
    level: Levels;

    @ApiProperty({
    enum: CourseLevel,
    })
    grade: CourseLevel;
  
    @ApiProperty()
    subjectId: string;

    @ApiProperty()
    correctOption: number;

    @ApiProperty()
    choices: string[];

}