const hostUrl = "http://localhost:3333";
const extension = "api"

const baseUrl = `${hostUrl}/${extension}`;

export const APIS = {
    appConfig: {
        create: `${extension}/common/appConfig`,
        getAll: `${extension}/common/appConfig`,
        getById: (id: string) => `${extension}/common/appConfig/${id}`,
        getByKey: (key: string) => `${extension}/common/appConfigByKey/${key}`,
        deleteById: (id: string) => `${extension}/common/appConfig/${id}`
    },
    users: {
        create: `${extension}/users`,
        getAll: `${extension}/users/paginated-user`,
        getUserData: `${extension}/users/userData`,
        createUser: `${extension}/users/create-user`,
        createStudent: `${extension}/users/create-student`,
        getById: (id: string) => `${extension}/users/${id}`,
        deleteById: (id: string) => `${extension}/users/${id}`,
        forgotPassword: `${extension}/users/forgot-password`,

    },
    auth: {
        login: `${extension}/auth/login`,
        test: `${extension}/auth/test`,
        roleSet: `${extension}/auth/role-set`,

    },
    subject: {
        create: `${extension}/subject`,
        getAll: `${extension}/subject`,
        getById: (id: string) => `${extension}/subject/${id}`,
        deleteById: (id: string) => `${extension}/subject/${id}`
    },
    course: {
        create: `${extension}/course`,
        getAll: `${extension}/course`,
        getById: (id: string) => `${extension}/course/${id}`,
        deleteById: (id: string) => `${extension}/course/${id}`
    },
    booking: {
        create: `${extension}/bookings`,
        getAll: `${extension}/bookings`,
        getById: (id: string) => `${extension}/bookings/${id}`,
        updateById: (id: string) => `${extension}/bookings/${id}`,
        deleteById: (id: string) => `${extension}/bookings/${id}`
    },
    durations: {
        create: `${extension}/durations`,
        getAll: `${extension}/durations`,
        getById: (id: string) => `${extension}/durations/${id}`,
        updateById: (id: string) => `${extension}/durations/${id}`,
        deleteById: (id: string) => `${extension}/durations/${id}`
    }
}