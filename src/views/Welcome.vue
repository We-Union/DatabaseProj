<template>
  <div class="route-wrapper">
    <transition name="MainFade" mode="in-out">
      <div class="main" v-if="show">
        <div>
          <h1>欢迎来到&ensp;SimpleCV</h1>
        </div>
        <div style="margin: 20px auto;width: fit-content;padding-top: 15px;"> 
          <div class="oneLineInput">
            <div class="inputLabel">账号</div>
            <input class="loginInput" type="text" placeholder="输入账号" v-model="loggin.account" @keyup.enter="signIn">
          </div>
          <div>
            <div class="oneLineInput">
              <div class="inputLabel">密码</div>
              <input class="loginInput" type="password" placeholder="输入密码" v-model="loggin.password" @keyup.enter="signIn">
            </div>
          </div>
        </div>
        <div>
          <button class="loginBtn" @click="signIn">登录</button>
          <button class="loginBtn" @click="singUp">注册</button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";

let store = useStore();
let router = useRouter();
let show = ref(false);

onMounted(() => {
  show.value = true;
})

interface Account {
  account : string,
  password : string
};

let loggin = reactive<Account>({
  account : "",
  password : "",
});

function checkVal():boolean {
  if (loggin.account.trim().length == 0 || loggin.password.trim().length == 0) {
    console.log("enter");
    ElNotification({title : "Wrong!", message : "你还没有填完信息"});
    return false;
  }
  return true;
}

// 登录
function signIn():void {
  if (checkVal()) {

  }
}

// 注册
function singUp():void {
  router.push("/signup");
}


</script>
<!-- https://cn.bing.com/th?id=OHR.LechfallFuessen_ZH-CN3887501600_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp -->

<style scoped>
.main {
  border-radius: 1.2em;
  padding: 30px 40px;
  width: fit-content;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  margin: 0 auto;
  transition: all .3 ease;
}

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