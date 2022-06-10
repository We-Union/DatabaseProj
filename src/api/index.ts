import request from "@/api/request";
import * as typing from "@/types";

export const login = (req_params : typing.Login['req']) => request({
    url: "/login", method: "POST",
    data : { 
        username : req_params.username, 
        password : req_params.password 
    }
});

export const signup = (req_params : typing.SignUp['req']) => request({
    url: "/user", method: "POST",
    data : {
        username : req_params.username,
        password : req_params.password,
        email : req_params.email,
        name : req_params.name,
    }
});

export const query_myinfo = () => request({
    url: "/user", method: "GET",
});

export const update_myinfo = (req_params : typing.UpdateMyInfo['req']) => request({
    url: "/user", method: "PUT",
    data : {
        name : req_params.name,
        email : req_params.email
    }
});

export const reset_password = (req_params : typing.ResetPassword['req']) => request({
    url: "/reset-password", method: "POST",
    data : {
        username : req_params.username,
        password : req_params.password,
        validation : req_params.validation,
    }
});

export const logout = () => request({
    url: "/logout", method: "GET",
});

export const create_reward = (req_params : typing.CreateReward['req']) => request({
    url: "/reward", method: "POST",
    data : {
        name : req_params.name,
        rank : req_params.rank,
        host : req_params.host,
        date : req_params.date,
    }
});

export const delete_reward = (req_params : typing.DeleteReward['req']) => request({
    url: "/reward", method: "DELETE",
    params: { id : req_params.id }
});

export const query_reward = (req_params : typing.QueryReward['req']) => request({
    url: "/reward", method: "GET",
    params : { id : req_params.id }
});

export const update_reward = (req_params : typing.UpdateReward['req']) => request({
    url: "/reward", method: "PUT",
    params : { id : req_params.id },
    data : {
        name : req_params.name,
        rank : req_params.rank,
        host : req_params.host,
        date : req_params.date,
    }
});

export const upload_reward = (req_params : typing.UploadReward['req']) => request({
    url: "/upload-reward", method: "POST",
    params : { id : req_params.id },
    data : req_params.file
});

export const download_reward = (req_params : typing.DownloadReward['req']) => request({
    url: "/download-reward", method: "GET",
    params : { id : req_params.id }    
});

export const query_rewardlist = (req_params : typing.QueryRewardList['req']) => request({
    url: "/my-reward", method: "GET",
    params : { start : req_params.start, end : req_params.end }    
});

export const create_resume = (req_params : typing.CreateResume['req']) => request({
    url: "/resume", method: "POST",
    data : {
        name : req_params.name,
        target : req_params.target,
    }
});

export const delete_resume = (req_params : typing.DeleteResume['req']) => request({
    url: "/resume", method: "DELETE",
    params : { id : req_params.id }
});

export const query_resume = (req_params : typing.QueryResume['req']) => request({
    url: "/resume", method: "GET",
    params : { id : req_params.id }
});

export const update_resume = (req_params : typing.UpdateResume['req']) => request({
    url: "/resume", method: "PUT",
    params : { id : req_params.id }
});

export const query_myresume = (req_params : typing.QueryMyResume['req']) => request({
    url: "/my-resume", method: "GET",
    params : {
        start : req_params.start,
        end : req_params.end
    }    
});

export const upload_resume = (req_params : typing.UploadResume['req']) => request({
    url: "/upload-resume", method: "POST",
    params : { id : req_params.id },
    data : { file : req_params.file }    
});

// 下载resume
// GET
// 下载方式：  /download-resume?id=