import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PresenceType } from "../enums/presenceType.enum";
import { UserType } from "../enums/userType.enum";

export class RetrieveUserDto {
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
}