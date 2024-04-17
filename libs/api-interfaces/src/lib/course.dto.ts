import { CourseLevel } from "../enums";
import { CourseType } from "../enums/courseTypes.enum";

export interface CreateCourseDTOBase {
  name: string;
  subjectId: string;
  courseDurationId: string;
  courseType: CourseType;
  courseLevel: CourseLevel;
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

export interface returnPaginatedCourseDTOBase {
  total: number;
  page: number;
  limit: number;
  courses: CreateCourseDTOBase[];
  totalPages:number
}