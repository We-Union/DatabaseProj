<template>
  <nav>
    <router-link style="font-size: 16px; color: var(--base-color);" to="/">Home</router-link> 
    <span style="margin: 10px; font-size: 18px;color: gray;">|</span>
    <router-link style="font-size: 16px; color: gray;" to="/about">About</router-link>
  </nav>  
  <router-view/>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

// let bodyDOM = document.getElementsByTagName("body");


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

.route-wrapper {
  width: 100%;
  min-height: 700px;
  overflow : hidden;
}

.MainFade-enter-from, .MainFade-leave-to {
  opacity: 0;
  transform: translateY(300px);
}
.MainFade-enter-to, .MainFade-leave-from {
  opacity: 1;
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

</style>
