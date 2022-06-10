<template>
  <div>
    <transition name="MainFade" mode="in-out">
      <div v-if="show">

        <div class="Add" @click="store.state.ShowCreateReward = true" v-if="!store.state.ShowCreateReward">
          <el-icon><CirclePlus /></el-icon>
        </div>

        <transition name="MainFade" mode="in-out">
          <div v-if="store.state.query_reward_list.totalNum">
            <div class="main" v-for="c in store.state.query_reward_list.items" :key="c.id">
              {{ c.name }}

            </div>
          </div>
        </transition>
        
        <transition name="MainFade" mode="in-out">
          <div v-if="store.state.ShowCreateReward" class="main">
              <div style="margin: 20px auto;width: fit-content;padding-top: 15px;">
                  <div class="oneLineInput">
                      <div class="inputLabel">奖项名称</div>
                      <input class="loginInput" type="text" placeholder="输入奖项名称" v-model="create_reward.name" @keyup.enter="CreateReward">
                  </div>
                  <div class="oneLineInput">
                      <div class="inputLabel">获奖等第</div>
                      <input class="loginInput" type="text" placeholder="输入获奖等第" v-model="create_reward.rank" @keyup.enter="CreateReward">
                  </div>
                  <div class="oneLineInput">
                      <div class="inputLabel">主办方</div>
                      <input class="loginInput" type="text" placeholder="输入主办方" v-model="create_reward.host" @keyup.enter="CreateReward">
                  </div>
                  <div class="oneLineInput">
                      <div class="inputLabel">获奖时间</div>
                      <input class="loginInput" type="password" placeholder="输入获奖时间" v-model="create_reward.date" @keyup.enter="CreateReward">
                  </div>
              </div>
              <div>
                <button class="loginBtn" @click="CreateReward">创建</button>
              </div>
          </div>
        </transition>

        <transition name="MainFade" mode="in-out">
          <div v-if="!store.state.query_reward_list.totalNum && !store.state.ShowCreateReward">
            <el-empty description="你还没创建奖项，点击上方的 + 开始添加吧！" :image-size="200"></el-empty>
          </div>
        </transition>
      </div>

    </transition>    
  </div>
  
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import * as typing from "@/types";
import { ElNotification, ElOptionGroup } from 'element-plus';

const item_num_one_page = 10;

let router = useRouter();
let store = useStore();
let show = ref(false);

let reward_list_req = reactive<typing.QueryRewardList['req']>({
  start : 0,
  end : item_num_one_page
});


let create_reward = reactive<typing.CreateReward['req']>({
  name : "",
  rank : "",
  host : "",
  date : "",
});

onMounted(() => {
  show.value = true;
  store.dispatch("query_rewardlist", reward_list_req).then(() => {
    if (store.state.ok) {
      ElNotification({
        title: "成功查询奖项", 
        message: "奖项数量 " + store.state.query_reward_list.totalNum,
        duration: 5000,
        position: "bottom-left",
      });
    }
  });
});

function checkCreateVal() : boolean {
  if (
      create_reward.date.trim().length == 0 ||
      create_reward.name.trim().length == 0 ||
      create_reward.host.trim().length == 0 ||
      create_reward.rank.trim().length == 0
    ) {
      ElNotification({title: "Wrong!", message: "你还有消息没填完", duration: 5000, position: "bottom-left"});
      return false;
    }
    return true;
}

function CreateReward() : void {
  if (checkCreateVal()) {
    store.dispatch("create_reward", create_reward).then(() => {
      if (store.state.ok) {
        ElNotification({title: "创建成功", position: "bottom-left", duration: 5000});
        store.dispatch("query_rewardlist", reward_list_req);
      }
    })
  }
}

</script>

<style>

.el-empty__description {
  padding: 10px;
  border-radius: .8em;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
}

.el-empty__description p {
  color: rgb(48,49,51);
}


.Add {
  border-radius: .6em;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  width: fit-content;
  margin: 20px auto 20px auto;
  padding: 2px 17px;
  cursor: pointer;
  transition: .1s all ease;
  font-size: 24px;
}

.Add:hover {
  background-color: rgba(255, 255, 255, 0.8);
}

.Add:active {
  background-color: rgba(255, 255, 255, 0.1);
  transition: .1s all ease;
}

</style>