<template>
  <div class="route-wrapper">
    <transition name="MainFade" mode="in-out">
        <div class="main" v-if="show">
            <div>
                <h1>注册</h1>
            </div>
            <div style="margin: 20px auto;width: fit-content;padding-top: 15px;">
                <div class="oneLineInput">
                    <div class="inputLabel">学号</div>
                    <input class="loginInput" type="text" placeholder="输入学号" v-model="signup.username" @keyup.enter="signUp">
                </div>
                <div class="oneLineInput">
                    <div class="inputLabel">电子邮箱</div>
                    <input class="loginInput" type="text" placeholder="输入电子邮箱@" v-model="signup.email" @keyup.enter="signUp">
                </div>
                <div class="oneLineInput">
                    <div class="inputLabel">姓名</div>
                    <input class="loginInput" type="text" placeholder="输入真实姓名" v-model="signup.name" @keyup.enter="signUp">
                </div>
                <div class="oneLineInput">
                    <div class="inputLabel">密码</div>
                    <input class="loginInput" type="password" placeholder="输入密码" v-model="signup.password" @keyup.enter="signUp">
                </div>
                <div class="oneLineInput">
                    <div class="inputLabel">重复密码</div>
                    <input class="loginInput" type="password" placeholder="重复密码" v-model="repeat_password" @keyup.enter="signUp">
                </div>
            </div>
            <div>
              <button class="loginBtn" @click="signUp">注册</button>
            </div>
        </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import * as typing from "@/types";
import { ElNotification } from 'element-plus';

let store = useStore<typing.State>();
let show = ref(false);

onMounted(() => {
    show.value = true;
})

function checkVal():boolean {
    if (
      signup.username.trim().length == 0 ||
      signup.password.trim().length == 0 ||
      signup.email.trim().length == 0 ||
      signup.name.trim().length == 0
    ) {
      ElNotification({title: "Wrong", message: "还有信息没有填完", position: 'bottom-left'});
      return false;
    }
    if (signup.password != repeat_password.value) {
      ElNotification({title: "Oops", message: "两次填写的密码不相同", position: 'bottom-left'});
      return false;
    }
    return true;
}

let repeat_password = ref("");

let signup = reactive<typing.SignUp['req']>({
    username : "",
    password : "",
    email : "",
    name : "",
});


function signUp() {
  if (checkVal()) {
    store.dispatch("signup", signup).then(() => {
      if (store.state.ok) {
        ElNotification({title: "注册成功！", message:"3秒后将会自动登录...", position: 'bottom-left'});
        setTimeout(() => {
          store.dispatch("login", <typing.Login['req']>{
            username : signup.username,
            password : signup.password,
          }).then(() => {
            if (store.state.ok) ElNotification({title: "登陆成功！"});
          })
        }, 3000);
        store.state.LoginStatus = true;
      }
    })
  }
}

</script>

<style>

</style>