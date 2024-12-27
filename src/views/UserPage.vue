<template>
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

    <el-main>
      <component :is="currentComponent" />
    </el-main>

  </el-container>
</template>
<script lang="ts" setup name="name">
import { useUserDataStore } from "@/stores/userData";
import { onMounted, ref } from "vue";
const { isLogin } = useUserDataStore()
const isLogined = () => {
  if (!isLogin) {
    window.open(`/LoginView`, '_self'); // -> /user/eduardo
  }
}
onMounted(
  () => {
    isLogined();
  }
)
//菜单头
const activeIndex = ref('1')
const toUserMainView = () => {
  window.open(`/`, '_self'); // -> /user/eduardo
}
//导入用户信息组件
import UserInfo from "@/components/User/UserInfo.vue";
//导入用户志愿列表组件
import UserAppList from '@/components/User/UserApp/AppCardList.vue';

//切换
//默认页面
const currentComponent = ref(UserInfo)
//表头
const headData = ref({
  "0": "返回主页面",
  "1": "用户信息",
  "2": "志愿列表",
})
//切换页面
const handleSelect1 = (key: string) => {
  switch (key) {
    case '0':
      toUserMainView()
      break
    case '1':
      currentComponent.value = UserInfo
      break
    case '2':
      currentComponent.value = UserAppList
      break

    default:
      currentComponent.value = UserInfo
  }

}
</script>
<style scoped>
.buttons button{
  margin: 5px 10px 5px 10px;

}
.buttons a{
  margin: 5px 10px 5px 10px;

}
</style>
