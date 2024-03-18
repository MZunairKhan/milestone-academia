import { ApiProperty } from "@nestjs/swagger";
import { nestedCourseFeatureDTOBase, nestedCourseContentDTOBase } from "@milestone-academia/api-interfaces";


export class nestedCourseFeatureDTO implements nestedCourseFeatureDTOBase {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    value: number;
    
    @ApiProperty()
    icon: string;
  }
  
export class nestedCourseContentDTO implements nestedCourseContentDTOBase{
    
    @ApiProperty()
    heading: string;
    
    @ApiProperty()
    points: string[];
}