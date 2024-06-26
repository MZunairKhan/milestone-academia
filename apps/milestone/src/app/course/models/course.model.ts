
export interface Course {
    id: string;
    instrcutorId?: string;
    subject: string;
    color: string;
    cols: number;
    rows: number;
    name: string;
    subText: string;
    details: string;
    price: number;
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
    startDate: Date;
    endDate: Date;
}

export interface CourseContent {
    heading: string;
    points: string[];
}