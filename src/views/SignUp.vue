<template>
  <div class="route-wrapper">
    <transition name="MainFade" mode="in-out">
        <div class="main" v-if="show">
            <div>
                <h1>注册</h1>
            </div>
            <div style="margin: 20px auto;width: fit-content;padding-top: 15px;">
                <div class="oneLineInput">
                    <div class="inputLabel">账号</div>
                    <input class="loginInput" type="text" placeholder="输入账号" v-model="signup.account" @keyup.enter="signUp">
                </div>
                <div class="oneLineInput">
                    <div class="inputLabel">密码</div>
                    <input class="loginInput" type="password" placeholder="输入密码" v-model="signup.password" @keyup.enter="signUp">
                </div>
                <div class="oneLineInput">
                    <div class="inputLabel">重复密码</div>
                    <input class="loginInput" type="password" placeholder="重复密码" v-model="signup.repeat_password" @keyup.enter="signUp">
                </div>

            </div>
        </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

interface SignUp {
    account : string,
    password : string,
    repeat_password : string,
};

let show = ref(false);
onMounted(() => {
    show.value = true;
})

function checkVal():boolean {


    return true;
}

let signup = reactive<SignUp>({
    account : "",
    password : "",
    repeat_password : "",
});


function signUp() {

}

</script>

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