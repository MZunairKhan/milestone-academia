import { Levels } from "@milestone-academia/api-interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMcqsDTO  {
    @ApiProperty()
    question: string;

    @ApiProperty({
    enum: Levels,
    })
    level: Levels;
  
    @ApiProperty()
    subjectId: string;

    @ApiProperty()
    correctOption: number;

    @ApiProperty()
    choices: string[];

}