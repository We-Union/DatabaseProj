<template>
<div style="height : 1300px;">
 <el-menu
    :default-active="'0'"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0" @click="router.push('/')"><el-icon><House /></el-icon>首页</el-menu-item>
    <el-menu-item index="1" @click="router.push('/about')"><el-icon><InfoFilled /></el-icon>关于</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="2" @click="GoToReward"><el-icon><Management /></el-icon>获奖记录</el-menu-item>
    <el-menu-item index="3" @click="router.push('/resume')"><el-icon><Tickets /></el-icon>我的简历</el-menu-item>
    <el-menu-item index="4" @click="logout"><el-icon><Ship /></el-icon>登出</el-menu-item>

  </el-menu>
  <div style="margin-top: 50px;">
    <router-view/>
  </div>
  
</div>
 
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from "vue";
import { useStore } from "vuex";
import { ElNotification } from 'element-plus';
import { handleRTCtime } from "@/hook/format";

let store = useStore();
let router = useRouter();
document.documentElement.style.setProperty("--el-color-primary", "#42b983");

onMounted(() => {
  store.dispatch("query_myinfo").then(() => {
    if (store.state.ok) {
      store.state.LoginStatus = true;
      ElNotification({
        title: "欢迎回来 " + store.state.loginInfo.name,
        message: "上次登录时间 " + handleRTCtime(store.state.loginInfo.last_login),
        position: 'bottom-left',
        duration: 10000,
      });
    }
  });
})

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

function logout() {
  store.dispatch("logout").then(() => {
    if (store.state.ok) {
      ElNotification({
        title: "登出成功！",
        duration : 10000,
        position: "bottom-left"
      });
      store.state.LoginStatus = false;
    }
  })
}

function GoToReward() {
  store.state.ShowCreateReward = false;
  router.push('/reward');
}

</script>

<style>
:root {
  --base-font : "Glow Sans";
  --base-font-size : 16px;
  --base-color : #42b983;
  --base-font-color : #30835e;
  --background-image :  url("https://pic2.zhimg.com/v2-579a1137afd4fba5bdb6bdb7591e8400_r.jpg?source=1940ef5c");
  /* --background-image :  url("https://cn.bing.com/th?id=OHR.LechfallFuessen_ZH-CN3887501600_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp"); */
}

.flex-grow {
  flex-grow: 1;
}

@font-face {
  font-family: "Glow Sans";
  src: url("@/assets/font/GlowSansSC-Normal-Book.woff2");
}

#app {
  font-family: var(--base-font), Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-image: var(--background-image);
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

body *::selection {
  background-color: var(--base-color);
  color: white;
}

body::-webkit-scrollbar {
  display: none;
}

img {
    transition: .3s all ease;
    cursor: pointer;
}

img:hover {
    transition: .3s all ease;
    transform: scale(1.3);
}

.el-menu {
  background-color: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(20px);
}

.el-menu--horizontal {
  border : 0 solid !important;
}

.el-menu-demo {
  border-radius: 1.2em;
  overflow: hidden;
}

.el-notification {
  background-color: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(20px) !important;
  border: 0 solid !important;
}

.el-notification__title {
  color: #42b983 !important;
}

.el-notification__content {
  color: rgb(193, 211, 199) !important;
}

hr {
    width: 75%;
    text-align:center;
    border: solid .8px var(--base-color);
    margin: 4.5em auto;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: var(--base-color);
}

.main {
  border-radius: 1.2em;
  padding: 30px 40px;
  width: fit-content;
  max-width: 70%;
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  margin: 0 auto;
  transition: all .3 ease;
}

.route-wrapper {
  width: 100%;
  min-height: 700px;
  overflow : hidden;
}

.MainFade-enter-from, .MainFade-leave-to {
  opacity: 0;
  transform: translateY(300px);
  transition: all 1s ease;
}
.MainFade-enter-to, .MainFade-leave-from {
  opacity: 1;
  transition: all 1s ease;
}
.MainFade-enter-active,
.MainFade-leave-active {
  transition: all 1s ease;
}

button {
  border-radius: .8em;
  color: var(--base-font-color);
  border: solid 2px var(--base-font-color);
  padding: 5px;
  background-color: rgba(255, 255, 255, 0);
  text-align: center;
  cursor: pointer;
  transition: .3s all ease;
  font-weight: 550;
}

button:hover {
  transition: .3s all ease;
  color: white;
  background-color: var(--base-font-color);
}

.primary {
  color:  white !important;
  background-color: var(--base-font-color) !important;
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
