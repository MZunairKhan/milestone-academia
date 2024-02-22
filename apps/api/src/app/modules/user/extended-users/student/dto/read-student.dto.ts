import { ApiProperty } from "@nestjs/swagger";
import { ReadPersonDto } from "../../../../../common/dto/person.dto";

export class ReadStudentDto extends ReadPersonDto {
    @ApiProperty()
    id: string;
}