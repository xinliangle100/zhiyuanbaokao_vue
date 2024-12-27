<script setup lang="ts" name="UserMainView">
import ChatGpt from '@/components/User/ChatGpt.vue';
import { useUserDataStore } from '@/stores/userData';
import { storeToRefs } from 'pinia';
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useUserDataStore()
const { userId, isLogin } = storeToRefs(store)
const userName = ref('')
function getUserInfoById() {
  axios
    .post('index.php/User/getUserInfoById', { userId: userId.value })
    .then(response => {
      userName.value = <string>response.data.data[0]?.username
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}
onMounted(() => {
  if (isLogin) {
    getUserInfoById()
  }

})

const touserPage = () => {
  window.open(`/userPage`, '_self'); // -> /user/eduardo
}
const toLoginPage = () => {
  window.open(`/LoginView`, '_self'); // -> /user/eduardo
}
import { onMounted, ref } from 'vue'

//下面是菜单组件的默认配置
const activeIndex = ref("0")

//自动补全搜索框
import AutocompleteItem from "@/components/AutocompleteItem.vue";
const searchUrl: string = "www.baidu.com"

//主页面
import UserMain from '@/components/User/UserMain.vue';
//查找学校页面
import SearchSchool from "@/components/User/SearchSchool.vue";
//查找专业页面
import SearchMajor from '@/components/User/SearchMajor.vue';
//填写志愿页面
import WriteApp from "@/components/User/WriteApp.vue";
//用户志愿单
import UserAppList from "@/components/User/UserApp/UserAppList.vue";
import axios from 'axios';

//默认页面
const currentComponent = ref(UserMain)
//表头
const headData = ref({
  "0": "首页",
  "1": "找大学",
  "2": "找专业",
  "3": "填志愿",
  "4": '志愿单',
})
//页尾
const yeWei = ref(true)
//切换页面
const handleSelect1 = (key: string) => {
  switch (key) {
    case '0':
      currentComponent.value = UserMain
      yeWei.value = true
      break
    case '1':
      currentComponent.value = SearchSchool
      yeWei.value = false
      break
    case '2':
      currentComponent.value = SearchMajor
      yeWei.value = false
      break
    case '3':
      currentComponent.value = WriteApp
      yeWei.value = false
      break
    case '4':
      currentComponent.value = UserAppList
      yeWei.value = false
      break
    default:
      yeWei.value = true
      currentComponent.value = UserMain
  }

}

</script>
<template>
  <div class="common-layout">
    <div style="margin-top: 2rem;align-items: center;text-align: center;">
      <el-row>
        <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8" style="">
          <el-text class="mx-1" type="warning" style="font-size: xx-large;">志愿报考</el-text>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" style="padding: 0 50px 0 50px;">
          <AutocompleteItem :searchUrl="searchUrl" style="width: 100%;display: none;" />
        </el-col>
        <el-col :xs="12" :sm="0" :md="5" :lg="5" :xl="5">
          <el-row :gutter="24" class="home-centre">
            <el-col :span="8" v-if="isLogin" style="margin: 0px 10px 0px 10px;">
              <div>
                <el-avatar src="/images/user.png" />
              </div>
              <div style="text-align: center;">
                {{ userName ? userName : '' }}
              </div>
            </el-col>
            <el-col :span="8" v-if="!isLogin" style="margin: 0px 10px 0px 10px;">
              <div>
                <el-avatar src="/images/user.png" />
              </div>
              <el-button type="simple" style="text-align: center;" @click="toLoginPage()">
                点击登录
              </el-button>
            </el-col>
            <el-col :span="8" style="background-color: rgb(221.7, 222.6, 224.4);margin: 0px 10px 0px 10px;"
              @click="touserPage">
              <el-icon style="width: 40px;height: 40px;">
                <House />
              </el-icon>
              <div style="text-align: center;">
                个人空间
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="0" :sm="0" :md="3" :lg="3" :xl="3"></el-col>
      </el-row>
    </div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
          @select="handleSelect1">
          <el-menu-item v-for="(item, index) in headData" :key="index" :index="index">{{
            item
          }}
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main> <keep-alive :exclude="['UserAppList']">
          <component :is="currentComponent" />
        </keep-alive>
      </el-main>
      <br><br><br><br>
      <br>
      <el-footer v-if="yeWei" style="background-color: rgb(177.3, 179.4, 183.6);margin: 0;height: 150px;">
        <el-row :gutter="24" style="margin: 0;box-sizing: border-box;">
          <el-col :span="2"></el-col>
          <el-col :span="20">
            <el-row :gutter="24">
              <el-col :span="4">
                <ul>
                  <li style="font-size: larger;">页面参考</li>
                  <li><a href="https://www.youzy.cn/">优志愿</a></li>
                </ul>
              </el-col>
              <el-col :span="4">
                <ul>
                  <li style="font-size: larger;">前端技术栈</li>
                  <li><a href="https://cn.vuejs.org/">vue3</a></li>
                  <li><a href="https://router.vuejs.org/zh/guide/">vue router</a></li>
                  <li><a href="https://pinia.vuejs.org/zh/introduction.html">pinia</a></li>
                </ul>
              </el-col>
              <el-col :span="4">
                <ul>
                  <li style="font-size: larger;">前端UI框架</li>
                  <li><a href="https://element-plus.org/zh-CN/">element plus</a></li>
                </ul>
              </el-col>
              <el-col :span="4">
                <ul>
                  <li style="font-size: larger;">后端框架</li>
                  <li><a href="https://doc.thinkphp.cn/v8_0/preface.html">thinkphp8</a></li>
                </ul>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row class="botton-define">
          <span>保定秦渤帅科技有限公司</span>
          <span>冀ICP备8888888号-4</span>
          <span>冀公网安备 xxxxxxxxxxxxxxx号</span>
          <span>© 2024 - 2024</span>
          <span>联系我们</span>
          <span>法律声明</span>
        </el-row>
      </el-footer>
    </el-container>
    <ChatGpt v-if="yeWei" class="gpt" />
  </div>
</template>
<style lang="css" scoped>
.gpt{
position: fixed;

right: 50px;
bottom: 100px;
z-index: 2;
}
    li {

      list-style-type: none;
    }

    .el-footer {
      padding: 0;
    }

    .botton-define {
      box-sizing: border-box;
      padding: 0;
      text-align: center;
      justify-content: center;
      background-color: rgb(115.2, 117.6, 122.4);
    }

    .botton-define span {
      margin: 5px 10px 5px 10px;
    }

    .el-col {
      border-radius: 4px;
    }

    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }

    /* 下面为elementcss */
    .el-menu--horizontal>.el-menu-item:nth-child(1) {
      margin-left: 10%;
    }

    .my-autocomplete li {
      line-height: normal;
      padding: 7px;
    }

    .my-autocomplete li .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .my-autocomplete li .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .my-autocomplete li .highlighted .addr {
      color: #ddd;
    }

    .el-row {
      margin-bottom: 20px;
    }

    .el-row:last-child {
      margin-bottom: 0;
    }

    .el-col {
      border-radius: 4px;
    }

    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }

    .el-row {
      width: 100%;
    }

    .home-centre {
      flex-wrap: wrap;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }

    /* .home-centre .el-col{
display: flex;
} */
  </style>
