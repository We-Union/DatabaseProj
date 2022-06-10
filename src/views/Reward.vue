<template>
  <div>
    <transition name="MainFade" mode="in-out">
      <div v-if="show">
        <div class="main">
          hello
        </div>  
        <div class="Add" @click="create_reward">
          <el-icon><CirclePlus /></el-icon>
        </div>
      </div>
    </transition>
    
  </div>
  
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';

import * as typing from "@/types";

let router = useRouter();
let store = useStore();

let show = ref(false);

onMounted(() => {
  show.value = true;
})

function create_reward() {

}



</script>

<style scoped>
.Add {
  border-radius: .6em;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  width: fit-content;
  margin: 20px auto 20px auto;
  padding: 5px 20px;
  cursor: pointer;
  transition: .1s all ease;
  font-size: 20px;
}

.Add:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.Add:active {
  background-color: rgba(255, 255, 255, 0.1);
  transition: .1s all ease;
}

</style>