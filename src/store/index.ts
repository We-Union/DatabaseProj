import { createStore } from 'vuex';
import * as api from "@/api";
import * as typing from "@/types";
import { AxiosResponse } from 'axios';
import { ElNotification } from 'element-plus';

export default createStore({
  state: {
    successOp : <boolean>false,
    loginInfo : <typing.Login['res']>{},
    
  },
  getters: {

  },
  mutations: {
    LOGIN(state, payload : typing.Login['res']) {
      state.loginInfo = payload;
      state.successOp = true;
    }
  },
  actions: {
    async login({commit}, params : typing.Login['req']) {
      let res : AxiosResponse = await api.login(params);
      if (res.code == 200) commit("LOGIN", res.data);
      else ElNotification({title: "Wrong", message: "Error" + res.msg});
    },
    async signup({commit}, params : typing.SignUp['req']) {
      let res : AxiosResponse = await 
    }
  },
  modules: {

  }
});