import axios from 'axios'
import { getToken } from "~/utils/manageLocalStorage";

const API_URI = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;

const axiosClient = axios.create({
    baseURL: API_URI,
    crossDomain: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Accept': "application/json"
    }

});

axiosClient.interceptors.request.use(function (config) {
    const {url} = config;
    const includeAuthPath = url.split("/").includes('auth')
    const token = getToken();

    if (token && !includeAuthPath) {
        config.headers['authorization'] = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosClient.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
})

export default axiosClient;
