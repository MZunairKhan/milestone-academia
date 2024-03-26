import {  Levels } from "@milestone-academia/api-interfaces";
import {  ApiPropertyOptional } from "@nestjs/swagger";

export class SearchMcqsDTO{
    @ApiPropertyOptional()
    question: string;

    @ApiPropertyOptional({
        enum: Levels,
        isArray: false,
        example: [Levels.Five, Levels.Four, Levels.One, Levels.Three , Levels.Two],
    })
    level: Levels;
  
    @ApiPropertyOptional()
    subject: string;

    @ApiPropertyOptional()
    page: number;

    @ApiPropertyOptional()
    limit: number;


}