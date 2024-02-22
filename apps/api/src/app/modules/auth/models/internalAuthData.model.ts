import { UserType } from "../../user/enums/userType.enum";

export interface InternalAuthData {
    upn: string;
    userId: string;
    username: string;
    userType: UserType,
}