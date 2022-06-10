<template>
  <div>
    <transition name="MainFade" mode="in-out">
      <div v-if="show">
        
        <transition name="MainFade" mode="in-out">
          <div v-if="store.state.query_myresume.totalNum">
            <div class="main resume-item" v-for="c in store.state.query_myresume.items" :key="c.id">
              <div style="display: flex;">
                <div style="font-size: 17px;">
                  <span class="SpanItem">简历名称 </span>&emsp; {{ c.name }}   <span class="VerticalSplit">|</span>
                  <span class="SpanItem">创建时间 </span>&emsp; {{ handleRTCtime(c.created_at) }} 
                </div>
                <div style="margin: 6px 10px 6px auto;">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="查看详细信息"
                    placement="top"
                  >
                    <span class="clickedIcon"><el-icon :size="24" @click="QueryResume(c.id)"><List /></el-icon> </span>
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
                    content="上传简历文件"
                    placement="top"
                  >
                    <span class="clickedIcon InputFile" style="cursor: not-allowed;">
                      <el-icon :size="24" style="position: absolute;"><Upload /></el-icon>
                      <input style="cursor: pointer;!important" type="file" @change="UploadResume" @click="store.state.CurResumeID = c.id"/>
                    </span> 
                  </el-tooltip>
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="下载简历文件"
                    placement="top"
                  >
                    <span class="clickedIcon"><el-icon :size="24" @click="DownloadResume(c.id)"><Download /></el-icon> </span> 
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
                        @confirm="DeleteResume(c.id)"
                      >
                        <template #reference>
                          <el-icon :size="24"><Delete /></el-icon>
                        </template>
                      </el-popconfirm>
                    </span>
                  </el-tooltip>
                </div>
              </div>
              <div v-if="store.state.CurResumeID == c.id && store.state.CurMode == typing.Operator.QUERY">
                <hr>
                <span class="SpanItem">投递意向 </span>&emsp; {{ store.state.query_resume.target }}
              </div>
              <div v-if="store.state.CurResumeID == c.id && store.state.CurMode == typing.Operator.UPDATE">
                  <div style="margin: 20px auto 20px;width: fit-content;padding-top: 15px;">
                    <div class="oneLineInput">
                    <div class="inputLabel">简历名称</div>
                      <input class="loginInput" type="text" placeholder="输入简历名称" v-model="update_resume.name" @keyup.enter="UpdateResume(c.id)">
                    </div>
                    <div class="oneLineInput">
                        <div class="inputLabel">投递意向</div>
                        <input class="loginInput" type="text" placeholder="输入投递意向" v-model="update_resume.target" @keyup.enter="UpdateResume(c.id)">
                    </div>
                  </div>
                  <div>
                    <button class="loginBtn" @click="UpdateResume(c.id)">更新</button>
                  </div>
              </div>

            </div>
          </div>
        </transition>

        <transition name="MainFade" mode="in-out">
            <div class="Add" @click="store.state.ShowCreateResume = true" v-if="!store.state.ShowCreateResume">
            <el-icon><CirclePlus /></el-icon>
            </div>
        </transition>
        <transition name="MainFade" mode="in-out">
            <div v-if="store.state.ShowCreateResume" class="main" style="margin-top: 40px;">
                <div style="margin: 20px auto 20px;width: fit-content;padding-top: 15px;">
                    <div class="oneLineInput">
                        <div class="inputLabel">简历名称</div>
                        <input class="loginInput" type="text" placeholder="输入奖项名称" v-model="create_resume.name" @keyup.enter="CreateResume">
                    </div>
                    <div class="oneLineInput">
                        <div class="inputLabel">投递意向</div>
                        <input class="loginInput" type="text" placeholder="输入获奖等第" v-model="create_resume.target" @keyup.enter="CreateResume">
                    </div>
                </div>
                <div>
                <button class="loginBtn" @click="CreateResume">创建</button>
                </div>
            </div>
        </transition>


        <!-- <transition name="MainFade" mode="in-out"> -->
          <div v-if="!store.state.query_myresume.totalNum && !store.state.ShowCreateResume">
            <el-empty description="你还没创建简历，点击上方的 + 开始添加吧！" :image-size="200"></el-empty>
          </div>
        <!-- </transition> -->

        <transition name="MainFade" mode="in-out">
          <Pager 
            v-if="store.state.query_myresume.totalNum"
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

let resume_list_req = reactive<typing.QueryMyResume['req']>({
  start : 0,
  end : item_num_one_page
});

let create_resume = reactive<typing.CreateResume['req']>({
  name : "",
  target : "",
});

let update_resume = reactive<typing.UpdateResume['req']>({
  id : 0,
  name : "",
  target : "",
});

let upload_resume = reactive<typing.UploadResume['req']>({
  id : 0,
  file : new FormData(),
});

onMounted(() => {
  show.value = true;
  store.dispatch("query_myresume", resume_list_req).then(() => {
    if (store.state.ok) {
      ElNotification({
        title: "成功查询奖项", 
        message: "奖项数量 " + store.state.query_myresume.totalNum,
        duration: 5000,
        position: "bottom-left",
      });
    }
  });
});

function checkCreateVal() : boolean {
  if (
      create_resume.name.trim().length == 0 ||
      create_resume.target.trim().length == 0
    ) {
      ElNotification({title: "Wrong!", message: "你还有消息没填完", duration: 5000, position: "bottom-left"});
      return false;
    }
    return true;
}

function QueryResume(id : number) : void {
  store.state.CurResumeID = id;
  store.state.CurMode = typing.Operator.QUERY;
  let params = <typing.QueryResume['req']>{ id };
  store.dispatch("query_resume", params).then(() => {
    if (store.state.ok) {
      // ElNotification({title: ""})
    }
  })
}

function CreateResume() : void {
  if (checkCreateVal()) {
    store.dispatch("create_resume", create_resume).then(() => {
      if (store.state.ok) {
        ElNotification({title: "创建成功", position: "bottom-left", duration: 5000});
        store.state.ShowCreateResume = false;
        store.dispatch("query_myresume", resume_list_req);
      }
    })
  }
}

function UpdateResume(id : number) : void {
  update_resume.id = id;
  store.dispatch("update_resume", update_resume).then(() => {
    if (store.state.ok) {
      ElNotification({title: "修改成功！", message: "ID : " + id, duration: 5000, position: "bottom-left"});
      store.dispatch("query_myresume", resume_list_req);
      show.value = false;
      store.state.CurMode = 0;
      store.state.CurResumeID = -1;
      setTimeout(() => {
        show.value = true;
      }, 100);
    }
  });
}

function ShowUpdate(id : number) : void {

  store.state.CurResumeID = id;
  store.state.CurMode = typing.Operator.UPDATE;
  let params = <typing.QueryResume['req']>{ id };
  store.dispatch("query_resume", params).then(() => {
    if (store.state.ok) {
      update_resume.name = store.state.query_resume.name;
      update_resume.target = store.state.query_resume.target;
      ElNotification({title: "数据已经恢复", message : "", duration: 5000, position : "bottom-left"});
    }
  });
}


function DeleteResume(id : number) : void {
  let params = <typing.DeleteResume['req']>{ id };
  store.dispatch("delete_resume", params).then(() => {
    if (store.state.ok) {
      ElNotification({title: "删除成功！", message: "ID : " + id, duration: 5000, position: "bottom-left"});
      store.dispatch("query_myresume", resume_list_req);
    }
  });
}

function UploadResume(e : any) : void {
  console.log(arguments);
  let files : Array<any> = e.target.files;
  if (files.length > 0) {
    let file = files[0];
    if (/[\s\S]*?(png|jpg|jpeg|pdf)/g.test(file.name)) {
      if (file.size > 10485760) {    // 上传文件不能大于10MB
        ElNotification({title: "Oops", message: "上传文件大小不能大于10MB！"});
        return;
      }
      upload_resume.file.set("file", file);
      upload_resume.id = store.state.CurResumeID;
      store.dispatch("upload_resume", upload_resume).then(() => {
        if (store.state.ok) {
          ElNotification({title: "上传成功！", position: "bottom-left"});
        }
      })
    } else {
      ElNotification({title: "Wrong!", message: "上传文件必须是png, jpg, jpeg 或者 pdf", duration: 10000, position: "bottom-left"});
    }
  }

}

function DownloadResume(id : number) : void {
  // const loading = ElLoading.service({
  //   lock : true,
  //   text: '正在下载',
  //   background: 'rgba(0, 0, 0, 0.8)',
  // });
  let params = <typing.DownloadResume['req']>{ id };
  // store.dispatch("download_resume", params).then(() => {
    // if (store.state.ok) {
    //   let url = "http://" + window.location.host + "/api/download-Resume?id=" + id;
    //   window.open(url);
    // }
    // loading.close();
  // });
  
}


let pager = reactive({
  cur_page : 1,
  last_page : -1,
  total_page : computed(() => Math.ceil(store.state.query_myresume.totalNum / item_num_one_page)),
  move() {
    if (pager.last_page != pager.cur_page) {
      store.state.ShowCreateResume = false;
      resume_list_req.start = (pager.cur_page - 1) * item_num_one_page;
      resume_list_req.end = pager.cur_page * item_num_one_page;
      store.dispatch("query_myresume", resume_list_req);
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

.resume-item {
  margin: 30px auto;
  width: 70%;
}

</style>