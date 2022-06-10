import axios, { AxiosInstance } from "axios";

const request : AxiosInstance = axios.create({
    baseURL : "/api",
    timeout : 10000
});

export default request;