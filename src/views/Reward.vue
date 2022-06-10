<template>
  <div>
    <transition name="MainFade" mode="in-out">
      <div v-if="show">
        
        <transition name="MainFade" mode="in-out">
          <div v-if="store.state.query_reward_list.totalNum">
            <div class="main reward-item" v-for="c in store.state.query_reward_list.items" :key="c.id">
              <div style="display: flex;">
                <div style="font-size: 17px;">
                  <span class="SpanItem">奖项名称 </span>&emsp; {{ c.name }}   <span class="VerticalSplit">|</span>
                  <span class="SpanItem">创建时间 </span>&emsp; {{ handleRTCtime(c.created_at) }} 
                </div>
                <div style="margin: 6px 10px 6px auto;">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="查看详细信息"
                    placement="top"
                  >
                    <span class="clickedIcon"><el-icon :size="24" @click="QueryReward(c.id)"><List /></el-icon> </span>
                  </el-tooltip>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="编辑奖项"
                    placement="top"
                  >
                    <span class="clickedIcon"><el-icon :size="24" @click="ShowUpdate(c.id)"><Edit /></el-icon> </span> 
                  </el-tooltip>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="上传奖状"
                    placement="top"
                  >
                    <span class="clickedIcon InputFile" style="cursor: not-allowed;">
                      <el-icon :size="24" style="position: absolute;"><Upload /></el-icon>
                      <input style="cursor: pointer;!important" type="file" @change="UploadReward" @click="store.state.CurRewardID = c.id"/>
                    </span> 
                  </el-tooltip>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="下载奖状"
                    placement="top"
                  >
                    <span class="clickedIcon"><el-icon :size="24" @click="DownloadReward(c.id)"><Download /></el-icon> </span> 
                  </el-tooltip>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="删除奖项"
                    placement="top"
                  >
                    <span class="clickedIcon">
                      <el-popconfirm
                        confirm-button-text="是的"
                        cancel-button-text="不"
                        icon-color="var(--base-color)"
                        title="你确定要删除这个奖项吗？"
                        @confirm="DeleteReward(c.id)"
                      >
                        <template #reference>
                          <el-icon :size="24"><Delete /></el-icon>
                        </template>
                      </el-popconfirm>
                    </span>
                  </el-tooltip>
                </div>
              </div>
              <div v-if="store.state.CurRewardID == c.id && store.state.CurMode == typing.Operator.QUERY">
                <hr>
                <span class="SpanItem">等级 </span>&emsp; {{ store.state.query_reward.rank }} <span class="VerticalSplit">|</span>
                <span class="SpanItem">主办方 </span>&emsp; {{ store.state.query_reward.host }} <span class="VerticalSplit">|</span>
                <span class="SpanItem">获奖时间 </span>&emsp; {{ store.state.query_reward.date }}
              </div>
              <div v-if="store.state.CurRewardID == c.id && store.state.CurMode == typing.Operator.UPDATE">
                  <div style="margin: 20px auto 20px;width: fit-content;padding-top: 15px;">
                    <div class="oneLineInput">
                    <div class="inputLabel">奖项名称</div>
                      <input class="loginInput" type="text" placeholder="输入奖项名称" v-model="update_reward.name" @keyup.enter="UpdateReward(c.id)">
                    </div>
                    <div class="oneLineInput">
                        <div class="inputLabel">获奖等第</div>
                        <input class="loginInput" type="text" placeholder="输入获奖等第" v-model="update_reward.rank" @keyup.enter="UpdateReward(c.id)">
                    </div>
                    <div class="oneLineInput">
                        <div class="inputLabel">主办方</div>
                        <input class="loginInput" type="text" placeholder="输入主办方" v-model="update_reward.host" @keyup.enter="UpdateReward(c.id)">
                    </div>
                    <div class="oneLineInput">
                        <div class="inputLabel">获奖时间</div>
                        <input class="loginInput" type="text" placeholder="输入获奖时间" v-model="update_reward.date" @keyup.enter="UpdateReward(c.id)">
                    </div>
                  </div>
                  <div>
                    <button class="loginBtn" @click="UpdateReward(c.id)">更新</button>
                  </div>
              </div>
            </div>
          </div>
          
        </transition>

        <transition name="MainFade" mode="in-out">
          <div class="Add" @click="store.state.ShowCreateReward = true" v-if="!store.state.ShowCreateReward">
            <el-icon><CirclePlus /></el-icon>
          </div>
        </transition>
        <transition name="MainFade" mode="in-out">
          <div v-if="store.state.ShowCreateReward" class="main" style="margin-top: 40px;">
              <div style="margin: 20px auto 20px;width: fit-content;padding-top: 15px;">
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
                      <input class="loginInput" type="text" placeholder="输入获奖时间" v-model="create_reward.date" @keyup.enter="CreateReward">
                  </div>
              </div>
              <div>
                <button class="loginBtn" @click="CreateReward">创建</button>
              </div>
          </div>
        </transition>

        <!-- <transition name="MainFade" mode="in-out"> -->
          <div v-if="!store.state.query_reward_list.totalNum && !store.state.ShowCreateReward">
            <el-empty description="你还没创建奖项，点击上方的 + 开始添加吧！" :image-size="200"></el-empty>
          </div>
        <!-- </transition> -->

        <transition name="MainFade" mode="in-out">
          <Pager 
            v-if="store.state.query_reward_list.totalNum"
            v-model:cur_page="pager.cur_page"
            :total="pager.total_page"
            @click="pager.move"
          ></Pager>
        </transition>
      </div>

    </transition>    
  </div>
  
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, ref, onMounted, computed } from 'vue';
import { ElLoading, ElNotification } from 'element-plus';
import { handleRTCtime } from "@/hook/format";
import * as typing from "@/types";
import Pager from "../components/Pager.vue";

const item_num_one_page = 5;

let router = useRouter();
let store = useStore<typing.State>();
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

let update_reward = reactive<typing.UpdateReward['req']>({
  id : 0,
  name : "",
  rank : "",
  host : "",
  date : "",
});

let upload_reward = reactive<typing.UploadReward['req']>({
  id : 0,
  file : new FormData(),
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

function QueryReward(id : number) : void {
  store.state.CurRewardID = id;
  store.state.CurMode = typing.Operator.QUERY;
  let params = <typing.QueryReward['req']>{ id };
  store.dispatch("query_reward", params).then(() => {
    if (store.state.ok) {
      // ElNotification({title: ""})
    }
  })
}

function CreateReward() : void {
  if (checkCreateVal()) {
    store.dispatch("create_reward", create_reward).then(() => {
      if (store.state.ok) {
        ElNotification({title: "创建成功", position: "bottom-left", duration: 5000});
        store.state.ShowCreateReward = false;
        store.dispatch("query_rewardlist", reward_list_req);
      }
    })
  }
}

function UpdateReward(id : number) : void {
  update_reward.id = id;
  store.dispatch("update_reward", update_reward).then(() => {
    if (store.state.ok) {
      ElNotification({title: "修改成功！", message: "ID : " + id, duration: 5000, position: "bottom-left"});
      store.dispatch("query_rewardlist", reward_list_req);
      show.value = false;
      store.state.CurMode = 0;
      store.state.CurRewardID = -1;
      setTimeout(() => {
        show.value = true;
      }, 100);
    }
  });
}

function ShowUpdate(id : number) : void {
  store.state.CurRewardID = id;
  store.state.CurMode = typing.Operator.UPDATE;
  let params = <typing.QueryReward['req']>{ id };
  store.dispatch("query_reward", params).then(() => {
    if (store.state.ok) {
      update_reward.name = store.state.query_reward.name;
      update_reward.host = store.state.query_reward.host;
      update_reward.rank = store.state.query_reward.rank;
      update_reward.date = store.state.query_reward.date;
      ElNotification({title: "数据已经恢复", message : "", duration: 5000, position : "bottom-left"});
    }
  });
}


function DeleteReward(id : number) : void {
  let params = <typing.DeleteReward['req']>{ id };
  store.dispatch("delete_reward", params).then(() => {
    if (store.state.ok) {
      ElNotification({title: "删除成功！", message: "ID : " + id, duration: 5000, position: "bottom-left"});
      store.dispatch("query_rewardlist", reward_list_req);
    }
  });
}

function UploadReward(e : any) : void {
  console.log(arguments);
  let files : Array<any> = e.target.files;
  if (files.length > 0) {
    let file = files[0];
    if (/[\s\S]*?(png|jpg|jpeg|pdf)/g.test(file.name)) {
      if (file.size > 10485760) {    // 上传文件不能大于10MB
        ElNotification({title: "Oops", message: "上传文件大小不能大于10MB！"});
        return;
      }
      upload_reward.file.set("file", file);
      upload_reward.id = store.state.CurRewardID;
      store.dispatch("upload_reward", upload_reward).then(() => {
        if (store.state.ok) {
          ElNotification({title: "上传成功！", position: "bottom-left"});
        }
      })
    } else {
      ElNotification({title: "Wrong!", message: "上传文件必须是png, jpg, jpeg 或者 pdf", duration: 10000, position: "bottom-left"});
    }
  }

}

function DownloadReward(id : number) : void {
      let url = "http://" + window.location.host + "/api/download-reward?id=" + id;
    window.open(url);
  
}


let pager = reactive({
  cur_page : 1,
  last_page : -1,
  total_page : computed(() => Math.ceil(store.state.query_reward_list.totalNum / item_num_one_page)),
  move() {
    reward_list_req.start = 0;
    if (pager.last_page != pager.cur_page) {
      store.state.ShowCreateReward = false;
      reward_list_req.start = (pager.cur_page - 1) * item_num_one_page;
      reward_list_req.end = pager.cur_page * item_num_one_page;
      store.dispatch("query_rewardlist", reward_list_req);
    }
    pager.last_page = pager.cur_page;
  }
});

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

.InputFile {
  width: 23px !important;
  margin: 20px;
  cursor: pointer;
}

.InputFile input {
  width: 23px !important;
  opacity: 0;
  cursor: pointer;
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

.SpanItem {
  border-radius: .5em;
  background-color: var(--base-color);
  color: white;
  padding: 5px 5px 5px 10px;
  margin: 5px 5px 5px 10px;
}

.VerticalSplit {
  margin: 20px;
}

.clickedIcon {
  cursor: pointer;
  margin: 10px;
}

.clickedIcon:hover {
  color: rgba(255, 255, 255, 0.8);
}

.clickedIcon:active {
  color: rgba(255, 255, 255, 0.4);
}

.reward-item {
  margin: 30px auto;
  width: 70%;
}

</style>