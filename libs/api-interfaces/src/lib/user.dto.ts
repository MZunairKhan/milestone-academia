import { PresenceType, UserType } from "../enums";

export interface CreateUserDTOBase {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    presenceType: PresenceType;
    userType: UserType;
}

export interface CreatePersonUserDTOBase extends CreateUserDTOBase {
    personalData: PersonDTOBase
}

export interface PersonDTOBase {
    personalIdentification: string;
    addressLine1: string;
    addressLine2: string;
    postalCode: string;
    city: string;
    country: string;
    guardianName: string;
    guardianIdentification: string;
    guardianEmail: string;
    phoneNumber: string;
}