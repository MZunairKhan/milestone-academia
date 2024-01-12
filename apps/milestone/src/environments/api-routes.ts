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
        create: `${extension}/common/user`,
        getAll: `${extension}/common/user`,
        getById: (id: string) => `${extension}/common/user/${id}`,
        deleteById: (id: string) => `${extension}/common/user/${id}`
    },
    auth: {
        login: `${extension}/auth/login`,
        test: `${extension}/auth/test`,
    },
    subject: {
        create: `${extension}/subject/user`,
        getAll: `${extension}/subject/user`,
        getById: (id: string) => `${extension}/subject/user/${id}`,
        deleteById: (id: string) => `${extension}/subject/user/${id}`
    },
    course: {
        create: `${extension}/course/user`,
        getAll: `${extension}/course/user`,
        getById: (id: string) => `${extension}/course/user/${id}`,
        deleteById: (id: string) => `${extension}/course/user/${id}`
    }
}