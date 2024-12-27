<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { User, Lock } from '@element-plus/icons-vue';
import axios from 'axios';

const router = useRouter();
const isRegister = ref(false);
const fit = ref('contain');

const userLoginInput = ref({
  username: '',
  userpassword: '',
});

const logInButton = ref(!isFormComplete(userLoginInput.value));

watch(userLoginInput, (newVal) => {
  logInButton.value = !isFormComplete(newVal);
}, { deep: true });

function isFormComplete(formData: typeof userLoginInput.value) {
  return Object.values(formData).every(field => !!field);
}


//管理员store
import { useAdminDataStore } from '@/stores/adminData'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const { setAdminId } = useAdminDataStore()
// 登录处理
function handleLogin(success: boolean, message: string) {
  alert(message)
  if (success) {
    setAdminId(userLoginInput.value.username);
    router.push({ name: 'ManagementView' });
  }
}
function checkUser() {
  axios.post('index.php/Management/adminLogin', userLoginInput.value)
    .then(response => {
      console.log(response.data)
      handleLogin(response.data.status, response.data.message);
    })
    .catch(error => {
      console.error('There was an error!', error);
      alert('Error: ' + error.message);
    });
}


</script>
<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg" style="pointer-events: none;">
      <div class="image-container">
        <el-image src="/images/login.svg" :fit="fit" class="centered-image" />
      </div>
    </el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form ref="form" size="large" autocomplete="off">
        <el-form-item>
          <h1>管理员登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="userLoginInput.username" />
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="userLoginInput.userpassword" />
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" :disabled="logInButton" auto-insert-space
            @click="checkUser()">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <router-link :to="{ name: 'LoginView' }">
              <el-link type="info" :underline="false" @click="isRegister = true">返回 →</el-link>
            </router-link>
            <router-link :to="{ name: 'ManagementView' }">
              <el-link type="primary" :underline="false">直接去管理员主页</el-link>
            </router-link>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}

.bg {
  background-color: #f0f0f0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  position: relative;
}

.centered-image {
  pointer-events: none;
}
</style>
