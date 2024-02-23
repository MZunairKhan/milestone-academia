export type BaseRole = UserRoles | SubjectRoles | CourseRoles;

export enum UserRoles {
    'CreateUser',
    'RetrieveUser',
    'UpdateUser',
    'DeleteUser',
}

export enum SubjectRoles {
    'CreateSubject',
    'RetrieveSubject',
    'UpdateSubject',
    'DeleteSubject',
}

export enum CourseRoles {
    'CreateCourse',
    'RetrieveCourse',
    'UpdateCourse',
    'DeleteCourse',
}