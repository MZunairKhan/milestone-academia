import { environment } from "./environment";

const hostUrl = "http://localhost:3333";
const extension = "api"

// const baseUrl = `${hostUrl}/${baseUrl}`;
const baseUrl = environment.production ? `${hostUrl}/${extension}` : `${extension}`

export const APIS = {
    appConfig: {
        create: `${baseUrl}/common/appConfig`,
        getAll: `${baseUrl}/common/appConfig`,
        getById: (id: string) => `${baseUrl}/common/appConfig/${id}`,
        getByKey: (key: string) => `${baseUrl}/common/appConfigByKey/${key}`,
        deleteById: (id: string) => `${baseUrl}/common/appConfig/${id}`
    },
    users: {
        create: `${baseUrl}/users`,
        getAll: `${baseUrl}/users/paginated-user`,
        getUserData: `${baseUrl}/users/userData`,
        createUser: `${baseUrl}/users/create-user`,
        createStudent: `${baseUrl}/users/create-student`,
        assignCourseToInstructor: (instructorId: string, courseId: string) => `${baseUrl}/users/instructor/${instructorId}/course/${courseId}`,
        getInstructorById: (instructorId: string) => `${baseUrl}/users/getInstructorById/${instructorId}`, 
        getById: (id: string) => `${baseUrl}/users/${id}`,
        deleteById: (id: string) => `${baseUrl}/users/${id}`,
        forgotPassword: `${baseUrl}/users/forgot-password`,

    },
    auth: {
        login: `${baseUrl}/auth/login`,
        refreshToken: `${baseUrl}/auth/refresh-token`,
        test: `${baseUrl}/auth/test`,
        roleSet: `${baseUrl}/auth/role-set`,

    },
    subject: {
        create: `${baseUrl}/subject`,
        getAll: `${baseUrl}/subject`,
        getById: (id: string) => `${baseUrl}/subject/${id}`,
        deleteById: (id: string) => `${baseUrl}/subject/${id}`
    },
    course: {
        create: `${baseUrl}/course`,
        getAll: `${baseUrl}/course`,
        getById: (id: string) => `${baseUrl}/course/${id}`,
        deleteById: (id: string) => `${baseUrl}/course/${id}`
    },
    booking: {
        create: `${baseUrl}/bookings`,
        getAll: `${baseUrl}/bookings`,
        getById: (id: string) => `${baseUrl}/bookings/${id}`,
        updateById: (id: string) => `${baseUrl}/bookings/${id}`,
        deleteById: (id: string) => `${baseUrl}/bookings/${id}`
    },
    onsiteCourseBooking: {
        create: `${baseUrl}/onsite-course-booking`,
        getAll: `${baseUrl}/onsite-course-booking`,
        getById: (id: string) => `${baseUrl}/onsite-course-booking/${id}`,
        getByStudentId: (id: string) => `${baseUrl}/onsite-course-booking/student/${id}`,
        getByCourseId: (id: string) => `${baseUrl}/onsite-course-booking/course/${id}`,
        getByUserId: (id: string) => `${baseUrl}/onsite-course-booking/user/${id}`,
    },
    evaluation: {
        
        getAllMcqs:  `${baseUrl}/evaluation/getAll-mcqs`,
        createMcqs: `${baseUrl}/evaluation/create-mcqs`,
        deleteById: (id: string) => `${baseUrl}/evaluation/deleteMcq/${id}`,
        updateMcq:  (id: string) => `${baseUrl}/evaluation/update-mcqs/${id}`


    },
    durations: {
        create: `${baseUrl}/durations`,
        getAll: `${baseUrl}/durations`,
        getById: (id: string) => `${baseUrl}/durations/${id}`,
        updateById: (id: string) => `${baseUrl}/durations/${id}`,
        deleteById: (id: string) => `${baseUrl}/durations/${id}`
    },
    timeslots: {
        create: `${baseUrl}/timeslots`,
        getAll: `${baseUrl}/timeslots`,
        getById: (id: string) => `${baseUrl}/timeslots/${id}`,
        updateById: (id: string) => `${baseUrl}/timeslots/${id}`,
        deleteById: (id: string) => `${baseUrl}/timeslots/${id}`
    },
    attendance: {
        create: `${baseUrl}/attendance`,
        getByInstructorCourseStudent: (
            instructorId: string,
            courseId: string,
            studentId: string
        ) => `${baseUrl}/attendance/instructor/${instructorId}/course/${courseId}/student/${studentId}`,
        getByInstructorCourse: (
            instructorId: string,
            courseId: string
        ) => `${baseUrl}/attendance/instructor/${instructorId}/course/${courseId}`,
        getByStudentCourse: (
            courseId: string,
            studentId: string
        ) => `${baseUrl}/attendance/course/${courseId}/student/${studentId}`,
        getById: (id: string) => `${baseUrl}/attendance/${id}`,
    }
}