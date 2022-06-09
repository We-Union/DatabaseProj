import axios, { AxiosInstance } from "axios";
import nprogress from "nprogress";

nprogress.configure({
    easing: "ease",
})

const request : AxiosInstance = axios.create({
    baseURL : "/api",
    timeout : 10000
})

request.interceptors.request.use(config => {
    nprogress.start();
    return config;
})

request.interceptors.response.use(
    res => {
        nprogress.done();
        return res.data;
    },
    error => {
        return Promise.reject(new Error("fail"));
    }
)

export default request;