<template>
  <div>
      <transition name="MainFade" mode="in-out">
        <div class="main" v-if="show">
            <h1>关于软件</h1>
            <div align="left">
                这个软件的灵感来自于最近准备的各种实习和夏令营申请，对于材料申报工作，材料时而显得杂乱没有头绪，所以我在想，能不能制作一个简历管理系统来更好地进行管理。
            </div>
            <hr>
            <h1>关于我们</h1>
            <div align="left" style="width: 100%;">
                以下是项目成员，享有同等的贡献程度：
                <div style="display: flex; justify-content: space-around;width: 100%;">
                    <div v-for="(c, index) in we" :key="index" class="Card">
                    <div style="overflow: hidden;"><img :src="c.imgUrl"></div>
                        <div align="center">
                            {{ c.name }}
                        </div>
                            
                    </div>
                </div>

            </div>
        </div>   
      </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

let show = ref(false);

onMounted(() => {
  show.value = true;
})

const we = [
    {
        name : "李亚宁",
        imgUrl : "https://s1.ax1x.com/2022/03/07/b6lo2F.jpg",
        blogUrl : "https://blog.peacesheep.xyz/"
    },
    {
        name : "岑嘉诚",
        imgUrl : "https://avatars.githubusercontent.com/u/72603374?v=4",
        blogUrl : "https://github.com/Temperance-XIV"
    },
    {
        name : "钱品亦",
        imgUrl : "https://avatars.githubusercontent.com/u/24718890?v=4",
        blogUrl : "https://github.com/qianpinyi"
    },
    {
        name : "黄哲龙",
        imgUrl : "https://avatars.githubusercontent.com/u/59416203?v=4",
        blogUrl : "https://锦恢.studio"
    }
]

</script>

<style scoped>
.Card {
    border-radius: 1.2em;
    overflow: hidden;
    display: block;
    margin: 30px 5px;
    width: 16%;
    background-color: rgba(255, 255, 255, 0.6);
}

img {
    width: 100%;
}

</style>