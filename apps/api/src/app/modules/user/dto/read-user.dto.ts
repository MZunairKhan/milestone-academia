import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { UserType } from "../enums/userType.enum";
import { PresenceType } from "../enums/presenceType.enum";

import { ReadStudentDto } from "../extended-users/student/dto/read-student.dto";
import { ReadInstructorDto } from "../extended-users/instructor/dto/read-instructor.dto";

export class ReadUserDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    firstName: string;
    
    @ApiProperty()
    lastName: string;

    @ApiProperty()
    userName: string;
    
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

    @ApiPropertyOptional()
    studentData?: ReadStudentDto;
    
    @ApiPropertyOptional()
    instructorData?: ReadInstructorDto;
}