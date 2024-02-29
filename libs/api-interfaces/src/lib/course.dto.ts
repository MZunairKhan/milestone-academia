import { CourseType } from "../enums/courseTypes.enum";

export interface CreateCourseDTOBase {
    name: string;
    subjectId: string;
    courseType: CourseType;
    description: string;
}