import { UserType } from "../../user/enums/userType.enum";
import { CourseRoles, SubjectRoles, UserRoles } from "./roles.enum";

export class UserTypeRoles  {
    
    static roles = new Map<UserType, any[]>();

    constructor() {
        UserTypeRoles.setUserTypeRoles();
    }

    static setUserTypeRoles = () => {
        UserTypeRoles.roles.set(UserType.Student, [
            UserRoles.RetrieveUser,
            CourseRoles.RetrieveCourse,
            SubjectRoles.RetrieveSubject
        ]);

        UserTypeRoles.roles.set(UserType.Instructor, [
            UserRoles.RetrieveUser,
            SubjectRoles.RetrieveSubject,
            ...Object.values(CourseRoles)
        ]);

        UserTypeRoles.roles.set(UserType.Staff, [
            ...Object.values(UserRoles),
        ]);
        
        UserTypeRoles.roles.set(UserType.Master, [
            ...Object.values(UserRoles),
            ...Object.values(SubjectRoles),
            ...Object.values(CourseRoles)
        ]);
    }
}