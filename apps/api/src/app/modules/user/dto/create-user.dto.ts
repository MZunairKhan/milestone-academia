import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PresenceType } from "../enums/presenceType.enum";
import { CreateStudentDTO } from "../extended-users/student/dto/create-student.dto";
import { PersonDTO } from "../../../common/dto/person.dto";
import { UserType } from "../enums/userType.enum";
import { CreateUserDTOBase } from "@milestone-academia/api-interfaces";

export class CreateUserDTO implements CreateUserDTOBase{
    @ApiProperty()
    firstName: string;
    
    @ApiProperty()
    lastName: string;

    @ApiProperty()
    userName: string;
  
    @ApiProperty()
    password: string;
    
    @ApiProperty()
    email: string;

    @ApiPropertyOptional({
        enum: UserType
    })
    userType: UserType;
    
    @ApiPropertyOptional({
        enum: PresenceType
    })
    presenceType: PresenceType;
}

export class CreatePersonUserDTO extends CreateUserDTO{
    @ApiProperty()
    personalData: PersonDTO
}

export class CreateStudentUserDTO extends CreateUserDTO{
    @ApiProperty()
    studentData: CreateStudentDTO
}