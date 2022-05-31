<template>
  <div class="route-wrapper">
    <div class="main">
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';

interface Account {
  account : string,
  password : string
};

let loggin = reactive<Account>({
  account : "",
  password : "",
});



</script>


<style scoped>
.main {
  margin: 50px auto 20px auto;

}

</style>