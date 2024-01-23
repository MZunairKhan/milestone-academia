import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PresenceType } from "../enums/presenceType.enum";

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