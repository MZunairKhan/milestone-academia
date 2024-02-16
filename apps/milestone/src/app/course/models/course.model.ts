
export interface Course {
    id: string;
    instrcutorId?: string;
    color: string;
    cols: number;
    rows: number;
    title: string;
    subText: string;
    details: string;
    features?: CourseFeatures[];
    availableBookings?: CourseBooking;
    content?: CourseContent[];
}


export interface CourseFeatures {
    name: string;
    value?: number;
    icon: string;
}

export interface CourseBooking {
    days: string[];
    slots: string[];
    startData: Date;
    endData: Date;
}

export interface CourseContent {
    heading: string;
    points: string[];
}