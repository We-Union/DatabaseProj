<template>
  <div class="route-wrapper">
    <transition name="MainFade" mode="in-out">
      <div class="main" v-if="show">
        <div>
          <h1>欢迎来到&ensp;SimpleCV</h1>
        </div>
        <section v-if="store.state.LoginStatus">
          <div align="left">
          </div>


        </section>
        <section v-else>
          <div style="margin: 20px auto;width: fit-content;padding-top: 15px;"> 
            <div class="oneLineInput">
              <div class="inputLabel">学号</div>
              <input class="loginInput" type="text" placeholder="输入学号" v-model="loggin.username" @keyup.enter="login">
            </div>
            <div>
              <div class="oneLineInput">
                <div class="inputLabel">密码</div>
                <input class="loginInput" type="password" placeholder="输入密码" v-model="loggin.password" @keyup.enter="login">
              </div>
            </div>
          </div>
          <div>
            <button class="loginBtn" @click="login">登录</button>
            <button class="loginBtn" @click="signUp">注册</button>
          </div>
        </section>

      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { handleRTCtime } from "@/hook/format";
import * as typing from "@/types";


let store = useStore();
let router = useRouter();
let show = ref(false);

onMounted(() => {
  show.value = true;
})

let loggin = reactive<typing.Login['req']>({
  username : "",
  password : "",
});

function checkVal(): boolean {
  if (loggin.username.trim().length == 0 || loggin.password.trim().length == 0) {
    ElNotification({title : "Wrong!", message : "你还没有填完信息", position: 'bottom-left'});
    return false;
  }
  return true;
}

// 登录
function login():void {
  if (checkVal()) {
    store.dispatch("login", loggin).then(() => {
      if (store.state.ok) {
        ElNotification({
          title: "登陆成功！",
          message: "上次登录时间 " + handleRTCtime(store.state.loginInfo.last_login),  
          position: 'bottom-left',
          duration: 5000
        });
        store.state.LoginStatus = true;
      }
    });
  }
}

// 注册
function signUp():void {
  router.push("/signup");
}


</script>
<!-- https://cn.bing.com/th?id=OHR.LechfallFuessen_ZH-CN3887501600_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp -->

<style scoped>

.oneLineInput {
  padding: 10px;
  margin: 10px;
  font-family: var(--base-font);
  display: flex;
}

.loginInput {
  font-family: var(--base-font);
  font-size: 18px;
  transition: .3 all ease;
  border-radius: .5em;
  border: 0 solid;
  outline: none;
  letter-spacing: 1px;
  background-color: rgba(255, 255, 255, 0.75);
}

.loginInput:focus {
  transition: .3s all ease;
  color: white;
  background-color: var(--base-color);
  border: 0 solid;
  box-shadow: 0 0 5px 3px var(--base-color);
}

.loginInput {
  text-align: center;
}

.inputLabel {
  margin-right: 20px;
  width: 150px;
  font-family: var(--base-font);
  font-size: 18px;
}

.loginBtn {
  font-size: 18px;
  margin: 20px;
  padding: 10px 20px;
}

</style>