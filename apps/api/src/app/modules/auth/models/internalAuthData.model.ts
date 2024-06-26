import { PresenceType, UserType } from "@milestone-academia/api-interfaces";

export interface InternalAuthData {
    upn: string;
    userId: string;
    username: string;
    userType: UserType,
    presenceType: PresenceType
}