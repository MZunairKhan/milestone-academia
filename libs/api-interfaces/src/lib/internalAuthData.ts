import { UserType, PresenceType } from "../enums";


export interface InternalAuthData {
    upn: string;
    userId: string;
    username: string;
    userType: UserType,
    presenceType: PresenceType
}