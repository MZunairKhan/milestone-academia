import { AttendanceStatus } from "../enums";

export interface CreateAttedanceDTOBase {
    OnSiteCourseBooking: string;
    attendanceStatus: AttendanceStatus;
    date: Date;
}