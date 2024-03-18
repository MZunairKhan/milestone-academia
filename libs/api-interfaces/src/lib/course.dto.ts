import { CourseType } from "../enums/courseTypes.enum";

export interface CreateCourseDTOBase {
    name: string;
    subjectId: string;
    courseType: CourseType;
    description: string;
    subText: string;
    details: string;
    price: number;
    content?: nestedCourseContentDTOBase[];
    features?: nestedCourseFeatureDTOBase[];
}

export interface nestedCourseFeatureDTOBase {
  name: string;
  value: number;
  icon: string;
}

export interface nestedCourseContentDTOBase{
  heading: string;
  points: string[];
}