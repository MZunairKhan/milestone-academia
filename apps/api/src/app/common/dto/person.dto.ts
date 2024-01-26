import { ApiProperty } from "@nestjs/swagger";

export class PersonDto {
    
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
    phoneNumber: string;
}

export class CreatePersonDto extends PersonDto {

}

export class ReadPersonDto extends PersonDto {

}