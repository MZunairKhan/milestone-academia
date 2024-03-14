import { ApiProperty } from "@nestjs/swagger";
import { ReadPersonDTO } from "../../../../../common/dto/person.dto";

export class ReadStudentDTO extends ReadPersonDTO {
    @ApiProperty()
    id: string;
}