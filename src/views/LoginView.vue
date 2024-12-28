<script setup lang="ts">
import { useRouter } from 'vue-router';
import { User, Lock, GoldMedal } from '@element-plus/icons-vue';
import { ref, watch } from 'vue';
import axios from 'axios';

const router = useRouter();

// 控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false);
const fit = ref('contain');

// 登录和注册表单数据
const userLoginInput = ref({
  userid: '',
  userpassword: '',
});

const userSignUpInput = ref({
  username: '',
  userpassword: '',
  sex: '',
  birthday: '',
  intro: '',
  phone: '',
});
const score = ref<number>(0)

// 按钮禁用状态
const signUpButton = ref(!isFormComplete(userSignUpInput.value));
const logInButton = ref(!isFormComplete(userLoginInput.value));

// 表单完整性检查
function isFormComplete(formData: Record<string, string>): boolean {
  return Object.values(formData).every(value => value !== '');
}
import { useUserDataStore } from '@/stores/userData'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const { setUserId } = useUserDataStore()
// 登录处理
function handleLogin(success: boolean, message: string) {
  alert(message)
  if (success) {
    setUserId(userLoginInput.value.userid);
    router.push({ name: 'UserMainView' });
  }
}

// 登录提交
function userLogin() {
  axios.post('index.php/User/check', userLoginInput.value)
    .then(response => {
      handleLogin(response.data.status, response.data.message);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
}

// 注册提交
function userSignup() {
  axios.post('index.php/User/signup', {
    'username': userSignUpInput.value.username,
    'userpassword': userSignUpInput.value.userpassword,
    'sex': userSignUpInput.value.sex,
    'birthday': userSignUpInput.value.birthday,
    'intro': userSignUpInput.value.intro,
    'phone': userSignUpInput.value.phone,
    'score': parseInt(score.value as unknown as string)
  })
    .then(response => {
      alert(response.data.message);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
}

// 深度监听表单数据的变化
watch(userSignUpInput, newVal => {
  signUpButton.value = !isFormComplete(newVal);
}, { deep: true });

watch(userLoginInput, newVal => {
  logInButton.value = !isFormComplete(newVal);
}, { deep: true });


</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg" style="pointer-events: none;">
      <div class=" image-container">
        <el-image src="/images/login.svg" :fit="fit" class="centered-image" />
      </div>
    </el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <p>用户注册需后台同意，因此提供已有账号，账号密码均为user</p>
      <el-form ref="form" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>用户注册</h1>
        </el-form-item>
        <el-form-item><el-form-item label="用户名">
            <el-input :prefix-icon="User" v-model="userSignUpInput.username"
              placeholder="请输入用户名"></el-input></el-form-item>
        </el-form-item>
        <el-form-item> <el-form-item label="密码"> <el-input :prefix-icon="Lock" type="password"
              v-model="userSignUpInput.userpassword" placeholder="请输入密码"></el-input></el-form-item>
        </el-form-item>
        <el-form-item><el-form-item label="分数(可不填系统内可随时更改)：">
            <el-input :prefix-icon="GoldMedal" v-model="score" type="number" placeholder="请输入分数">
            </el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="userSignUpInput.sex" placeholder="请选择你的性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker v-model="userSignUpInput.birthday" type="date" placeholder="Pick a date"
              style="width: 100%" />
          </el-col>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input v-model="userSignUpInput.intro" type="textarea" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userSignUpInput.phone" />
        </el-form-item>

        <!-- 注册按钮 -->
        <el-form-item>
          <el-button :disabled="signUpButton" class="button" type="primary" @click="userSignup()" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>用户登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户手机号" v-model="userLoginInput.userid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
            v-model="userLoginInput.userpassword"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button :disabled="logInButton" class="button" type="primary" auto-insert-space
            @click="userLogin()">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-link type="info" :underline="false" @click="isRegister = true">
              注册 →
            </el-link>
            <router-link :to="{ name: 'AdminLoginView' }">
              <el-link type="primary" :underline="false">管理员登陆？</el-link>
            </router-link>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  // .bg {
  //     background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
  //         url('@/assets/login_bg.jpg') no-repeat center / cover;
  //     border-radius: 0 20px 20px 0;
  // }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

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
</style>
<style scoped>
.bg {
  background-color: #f0f0f0; /* 设置背景颜色 */
  height: 100vh; /* 高度占满整个视口 */
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.image-container {
  position: relative; /* 设置相对定位 */
}

.centered-image {
  pointer-events: none; /* 禁止鼠标事件 */
}
</style>
