import { ApiProperty } from "@nestjs/swagger";
import { ReadPersonDTO } from "../../../../../common/dto/person.dto";

export class ReadInstructorDTO extends ReadPersonDTO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    courses: any[]
}