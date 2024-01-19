import axiosClient from "~/server/axiosClient/axios";

const AuthService = {
    login: (payload) => {
        return axiosClient.post('/auth/local', {
            ...payload
        })
    },
    register: (payload) => {
        return axiosClient.post('/auth/local/register', {
            ...payload
        })
    }
}

export default AuthService