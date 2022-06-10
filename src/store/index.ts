import { createStore } from 'vuex';
import * as api from "@/api";
import * as typing from "@/types";
import { AxiosResponse } from 'axios';
import { ElNotification } from 'element-plus';


export default createStore<typing.State>({
  state: {
    ok : false,
    LoginStatus : false,
    ShowCreateReward : false,
    ShowCreateResume : false,
    CurRewardID : -1,
    CurResumeID : -1,
    CurMode : -1,
    loginInfo : <typing.Login['res']>{},
    query_reward : <typing.QueryReward['res']>{},
    query_reward_list : <typing.QueryRewardList['res']>{},
    query_resume : <typing.QueryResume['res']>{},
    query_myresume : <typing.QueryMyResume['res']>{},
  },
  getters: {

  },
  mutations: {
    LOGIN(state, payload : typing.Login['res']) {
      state.loginInfo = payload;
      state.ok = true;
    },
    SIGNUP(state, payload : typing.SignUp['res']) {
      state.ok = true;
    },
    QUERY_MYINFO(state, payload : typing.QueryMyInfo['res']) {
      state.loginInfo = payload;
      state.ok = true;
    },
    UPDATE_MYINFO(state, payload : typing.UpdateMyInfo['res']) {
      state.ok = true;
    },
    RESET_PASSWORD(state, payload : typing.ResetPassword['res']) {
      state.ok = true;
    },
    LOGOUT(state, payload : typing.Logout['res']) {
      state.ok = true;
    },
    CREATE_REWARD(state, payload : typing.CreateReward['res']) {
      state.ok = true;
    },
    DELETE_REWARD(state, payload : typing.DeleteReward['res']) {
      state.ok = true;
    },
    QUERY_REWARD(state, payload : typing.QueryReward['res']) {
      state.query_reward = payload;
      state.ok = true;
    },
    UPDATE_REWARD(state, payload : typing.UpdateReward['res']) {
      state.ok = true;
    },
    UPLOAD_REWARD(state, payload : typing.UploadReward['res']) {
      state.ok = true;
    },
    DOWNLOAD_REWARD(state, payload : typing.DownloadReward['res']) {
      state.ok = true;
    },
    QUERY_REWARDLIST(state, payload : typing.QueryRewardList['res']) {
      state.query_reward_list = payload;      
      state.ok = true;
    },
    CREATE_RESUME(state, payload : typing.CreateResume['res']) {
      state.ok = true;
    },
    DELETE_RESUME(state, payload : typing.DeleteResume['res']) {
      state.ok = true;
    },
    QUERY_RESUME(state, payload : typing.QueryResume['res']) {
      state.query_resume = payload;
      state.ok = true;
    },
    UPDATE_RESUME(state, payload : typing.UpdateResume['res']) {
      state.ok = true;
    },
    QUERY_MYRESUME(state, payload : typing.QueryMyResume['res']) {
      state.query_myresume = payload;
      state.ok = true;
    },
    UPLOAD_RESUME(state, payload : typing.UploadResume['res']) {
      state.ok = true;
    },
  },
  actions: {
    async login({commit}, params : typing.Login['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.login(params);
      if (res.status == 200 && res.data.code == 0) commit("LOGIN", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async signup({commit}, params : typing.SignUp['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.signup(params);
      console.log(res);
      if (res.status == 200 && res.data.code == 0) commit("SIGNUP", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async query_myinfo({commit}) {
      this.state.ok = false;
      let res : AxiosResponse = await api.query_myinfo();
      if (res.status == 200 && res.data.code == 0) commit("QUERY_MYINFO", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async update_myinfo({commit}, params : typing.UpdateMyInfo['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.update_myinfo(params);
      if (res.status == 200 && res.data.code == 0) commit("UPDATE_MYINFO", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async reset_password({commit}, params : typing.ResetPassword['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.reset_password(params);
      if (res.status == 200 && res.data.code == 0) commit("RESET_PASSWORD", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async logout({commit}) {
      this.state.ok = false;
      let res : AxiosResponse = await api.logout();
      if (res.status == 200 && res.data.code == 0) commit("LOGOUT", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async create_reward({commit}, params : typing.CreateReward['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.create_reward(params);
      if (res.status == 200 && res.data.code == 0) commit("CREATE_REWARD", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async delete_reward({commit}, params : typing.DeleteReward['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.delete_reward(params);
      if (res.status == 200 && res.data.code == 0) commit("DELETE_REWARD", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async query_reward({commit}, params : typing.QueryReward['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.query_reward(params);
      if (res.status == 200 && res.data.code == 0) commit("QUERY_REWARD", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async update_reward({commit}, params : typing.UpdateReward['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.update_reward(params);
      if (res.status == 200 && res.data.code == 0) commit("UPDATE_REWARD", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async upload_reward({commit}, params : typing.UploadReward['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.upload_reward(params);
      if (res.status == 200 && res.data.code == 0) commit("UPLOAD_REWARD", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async download_reward({commit}, params : typing.DownloadReward['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.download_reward(params);
      if (res.status == 200 && res.data.code == 0) commit("DOWNLOAD_REWARD", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async query_rewardlist({commit}, params : typing.QueryRewardList['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.query_rewardlist(params);
      if (res.status == 200 && res.data.code == 0) commit("QUERY_REWARDLIST", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async create_resume({commit}, params : typing.CreateResume['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.create_resume(params);
      if (res.status == 200 && res.data.code == 0) commit("CREATE_RESUME", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async delete_resume({commit}, params : typing.DeleteResume['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.delete_resume(params);
      if (res.status == 200 && res.data.code == 0) commit("DELETE_RESUME", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async query_resume({commit}, params : typing.QueryResume['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.query_resume(params);
      if (res.status == 200 && res.data.code == 0) commit("QUERY_RESUME", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async update_resume({commit}, params : typing.UpdateResume['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.update_resume(params);
      if (res.status == 200 && res.data.code == 0) commit("UPDATE_RESUME", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async query_myresume({commit}, params : typing.QueryMyResume['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.query_myresume(params);
      if (res.status == 200 && res.data.code == 0) commit("QUERY_MYRESUME", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
    async upload_resume({commit}, params : typing.UploadResume['req']) {
      this.state.ok = false;
      let res : AxiosResponse = await api.upload_resume(params);
      if (res.status == 200 && res.data.code == 0) commit("UPLOAD_RESUME", res.data.data);
      else ElNotification({title: "Wrong", message: "Error: " + res.data.msg, position: 'bottom-left'});
    },
  },
  modules: {

  }
});