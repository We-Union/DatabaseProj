import request from "@/api/request";
import { AxiosPromise } from "axios";
import * as typing from "@/types";

export const login = (req_params : typing.Login['req']) : AxiosPromise => request({
    url: "/login", method: "POST",
    data : { 
        username : req_params.username, 
        password : req_params.password 
    }
});

export const signup = (req_params : typing.SignUp['req']) : AxiosPromise => request({
    url: "/user", method: "POST",
    data : {
        username : req_params.username,
        password : req_params.password,
        email : req_params.email,
        name : req_params.name,
    }
});

export const querymyinfo = (req_params : typing.QueryMyInfo['req']) : AxiosPromise => request({
    url: "/user", method: "GET",
})

export const updatemyinfo = (req_params : typing.UpdateMyInfo['req']) : AxiosPromise => request({
    url: "/user", method: "PUT",
    params : {
        name : req_params.name,
        email : req_params.email
    }
})

export const resetpassword = (req_params : typing.ResetPassword['req']) : AxiosPromise => request({
    url: "reset-password", method: "POST",
    params : {
        username : req_params.username,
        password : req_params.password,
        validation : req_params.validation,
    }
})

export const logout = (req_params : typing.Logout['req']) : AxiosPromise => request({
    url: "logout", method: "GET",
    params : {
        
    }
})