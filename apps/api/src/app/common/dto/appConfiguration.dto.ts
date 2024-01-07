import { ApiProperty } from "@nestjs/swagger";

export class CreateAppConfigurationDto {
    @ApiProperty()
    key: string;
    
    @ApiProperty()
    value: string;
}