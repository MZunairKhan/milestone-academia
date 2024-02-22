import { ApiProperty } from "@nestjs/swagger";
import { ReadPersonDto } from "../../../../../common/dto/person.dto";

export class ReadInstructorDto extends ReadPersonDto {
    @ApiProperty()
    id: string;
}