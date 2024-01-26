import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PresenceType } from "../enums/presenceType.enum";
import { CreateStudentDto } from "../extended-users/student/dto/create-student.dto";

export class CreateUserDto {
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
        enum: PresenceType
    })
    presenceType: PresenceType;
}

export class CreateStudentUserDto extends CreateUserDto{
    @ApiProperty()
    studentData: CreateStudentDto
}