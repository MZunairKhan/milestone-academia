import { PersonDTOBase } from "@milestone-academia/api-interfaces";
import { ApiProperty } from "@nestjs/swagger";

export class PersonDTO implements PersonDTOBase {
    
    @ApiProperty()
    personalIdentification: string;

    @ApiProperty()
    addressLine1: string;
    
    @ApiProperty()
    addressLine2: string;
    
    @ApiProperty()
    postalCode: string;
    
    @ApiProperty()
    city: string;
    
    @ApiProperty()
    country: string;

    @ApiProperty()
    guardianName: string;

    @ApiProperty()
    guardianIdentification: string;
    
    @ApiProperty()
    guardianEmail: string;

    @ApiProperty()
    phoneNumber: string;
}

export class CreatePersonDTO extends PersonDTO {

}

export class ReadPersonDTO extends PersonDTO {

}