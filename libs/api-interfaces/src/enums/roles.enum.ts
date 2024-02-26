export type BaseRole = UserRoles | SubjectRoles | CourseRoles;

export enum UserRoles {
    CreateUser = 'CreateUser',
    RetrieveUser = 'RetrieveUser',
    UpdateUser = 'UpdateUser',
    DeleteUser = 'DeleteUser',
}

export enum SubjectRoles {
    CreateSubject = 'CreateSubject',
    RetrieveSubject = 'RetrieveSubject',
    UpdateSubject = 'UpdateSubject',
    DeleteSubject = 'DeleteSubject',
}

export enum CourseRoles {
    CreateCourse = 'CreateCourse',
    RetrieveCourse = 'RetrieveCourse',
    UpdateCourse = 'UpdateCourse',
    DeleteCourse = 'DeleteCourse',
}