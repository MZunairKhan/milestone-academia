import { UserType } from "./userType.enum";
import { CourseRoles, SubjectRoles, UserRoles } from "./roles.enum";

export const USER_ROLE_SET = {
    [UserType.Student]: [
        UserRoles.RetrieveUser,
        CourseRoles.RetrieveCourse,
        SubjectRoles.RetrieveSubject
    ],
    [UserType.Instructor]: [
        UserRoles.RetrieveUser,
        SubjectRoles.RetrieveSubject,
        ...Object.values(CourseRoles)
    ],
    [UserType.Staff]: [
        ...Object.values(UserRoles),
    ],
    [UserType.Master]: [
        ...Object.values(UserRoles),
        ...Object.values(SubjectRoles),
        ...Object.values(CourseRoles)
    ],
}