export interface UserData {
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    userType: string;
    presenceType: string;
    studentData?: any;
    instructorData?: any;
}

export interface Person {
    personalIdentification: string;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    country: string;
    guardianName: string;
    guardianIdentification: string;
    phoneNumber: string;
}

export interface StudentData extends Person {
    id: string;
}

export interface InstructorData extends Person {
    id: string;
}