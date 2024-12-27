<script lang="ts" setup name="MainPage">
// 导入组件

import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  User,
  // Setting,
} from "@element-plus/icons-vue";

// 定义处理菜单打开的函数
const handleOpen = (key: number, keyPath: string) => {
  console.log(key, keyPath);
};

// 定义处理菜单关闭的函数
const handleClose = (key: number, keyPath: string) => {
  console.log(key, keyPath);
};
import { useAdminDataStore } from "@/stores/adminData";
import { storeToRefs } from 'pinia';
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useAdminDataStore()
const { adminId } = storeToRefs(store)



import AdminData from "@/components/Management/AdminData.vue";
import UserdataItems from "@/components/Management/UserdataItems.vue"
import WaittinguserItems from "@/components/Management/WaittinguserItems.vue"
import RecordData from '@/components/Management/RecordData.vue';
import ViewManagement from "@/components/Management/ViewManagement.vue";
import SearchSchool from '@/components/Management/school/SearchSchool.vue';
import SearchMajor from '@/components/Management/major/SearchMajor.vue';
const onActive = ref("2022")
// 当前组件状态
const currentComponent = ref(UserdataItems)
// 定义菜单选择处理函数
const handleSelect = (key: string) => {
  switch (key) {
    case '0-1':
      currentComponent.value = UserdataItems
      break
    case '0-2':
      currentComponent.value = WaittinguserItems
      break
    case '1':
      currentComponent.value = AdminData
      break
    case '2':
      currentComponent.value = RecordData
      break
    case '2-1':
      onActive.value = "2022"
      currentComponent.value = RecordData
      break
    case '2-2':
      onActive.value = "2023"
      currentComponent.value = RecordData
      break
    case '2-3':
      onActive.value = "2024"
      currentComponent.value = RecordData
      break
    case '3-1':
      currentComponent.value = ViewManagement
      break
    case '3-2':
      currentComponent.value = SearchMajor
      break
    case '3-3':
      currentComponent.value = SearchSchool
      break
    default:
      currentComponent.value = UserdataItems
  }
}

function goToElement_plus(): void {
  window.location.href = 'https://element-plus.org/zh-CN/';
}

</script>
<template>
  <el-container>
    <el-header>
      <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
        <el-menu-item @click="goToElement_plus()">
          <img style="width: 100px" src="/images/element-plus-logo.svg" alt="Element logo" />
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item>
          <el-icon>
            <el-avatar src="/images/user.png" />
          </el-icon>
          <div style="text-align: center;">
            {{ adminId }}
          </div>
        </el-menu-item>

      </el-menu>
    </el-header>

    <el-row class="tac">
      <el-col :span="3">
        <el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          @select="handleSelect">
          <el-sub-menu index="0">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>用户账号管理</span>
            </template>
            <el-menu-item index="0-1">
              <span>用户账号管理</span>
            </el-menu-item>
            <el-menu-item index="0-2">
              <span>用户审核</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="1">
            <el-icon>
              <Avatar />
            </el-icon>
            <span>管理员账号管理</span>
          </el-menu-item>

          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Document />
              </el-icon>
              <span>院校数据管理</span>
            </template>
            <el-menu-item index="2-1">2022</el-menu-item>
            <el-menu-item index="2-2">2023</el-menu-item>
            <el-menu-item index="2-3">2024</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <IconMenu />
              </el-icon>
              <span>页面管理</span>
            </template>
            <el-menu-item index="3-1">首页页面管理</el-menu-item>
            <el-menu-item index="3-2">专业页面管理</el-menu-item>
            <el-menu-item index="3-3">院校页面管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <component :is="currentComponent" :year="onActive" :key="onActive" />
        <!-- <UserdataItems></UserdataItems> -->
      </el-col>
    </el-row>
  </el-container>
</template>



<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
<style scoped>
.flex-grow {
  flex-grow: 1;
}
.element-center {
  display: flex;
  justify-content: center;
}
</style>
