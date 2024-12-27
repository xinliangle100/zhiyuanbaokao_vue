<template>
  <AppCardList>
  </AppCardList>
</template>
<script lang="ts" setup name="name">
import { useUserDataStore } from '@/stores/userData'
import { onMounted } from 'vue';
// 可以在组件中的任意位置访问 `store` 变量 ✨
const { userId, isLogin } = useUserDataStore()
const isLogined = () => {
  if (!isLogin) {
    window.open(`/LoginView`, '_self'); // -> /user/eduardo
  }
}
onMounted(
  () => {
    isLogined()
  }
)
console.log(userId);
import AppCardList from './UserApp/AppCardList.vue';

</script>
<style scoped>
</style>
