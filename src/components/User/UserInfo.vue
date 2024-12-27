<template>

  <el-row :gutter="24">
    <el-col :span="7"></el-col>
    <el-col :span="10" style="border: 0.5px,grey,solid;border-radius: 5px;">
      <el-form ref="form" size="large" autocomplete="off">
        <el-form-item style="margin: 10px 0px 0px 0px;">
          <el-avatar style="margin-right: 10px;" src="/images/user.png" />
          <span style="font-size: xx-large;"> {{ userInfo.username }}</span>
        </el-form-item>
        <el-form-item>
          <h1>用户信息</h1>
        </el-form-item>

        <el-form-item><el-form-item label="用户名">
            <el-input :disabled="signUpButton" :prefix-icon="User" v-model="userInfo.username"
              placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item> <el-form-item label="密码">
            <el-input :disabled="signUpButton" :prefix-icon="Lock" v-model="userInfo.userpassword"
              placeholder="请输入密码"></el-input></el-form-item>
        </el-form-item>
        <el-form-item label="分数(可不填系统内可随时更改)：">
          <el-input :disabled="signUpButton" :prefix-icon="GoldMedal" v-model="userInfo.score" type="number"
            placeholder="请输入分数">
          </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select :disabled="signUpButton" v-model="userInfo.sex" placeholder="请选择你的性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="11">
            <el-date-picker :disabled="signUpButton" v-model="userInfo.birthday" type="date" placeholder="Pick a date"
              style="width: 100%" />
          </el-col>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input :disabled="signUpButton" v-model="userInfo.intro" type="textarea" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input :disabled="true" v-model="userInfo.phone" />
        </el-form-item>

        <!-- 注册按钮 -->
        <el-form-item class="buttons">
          <el-button class="button" type="primary" auto-insert-space @click="changeState">
            {{ changeText }}
          </el-button>
          <el-button @click="userChange()" class="button" type="primary" auto-insert-space>
            提交
          </el-button>
          <el-link type="info" :underline="false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="7"></el-col>
  </el-row>
</template>
<script lang="ts" setup name="name">
import { User, Lock, GoldMedal } from '@element-plus/icons-vue';
import { useUserDataStore } from "@/stores/userData";
import axios from "axios";
import { onMounted, ref } from "vue";
import { computed } from 'vue';
const { userId, isLogin } = useUserDataStore()
const isLogined = () => {
  if (!isLogin) {
    window.open(`/LoginView`, '_self'); // -> /user/eduardo
  }
}
interface typeUserInfo {
  username: string
  userpassword: string
  sex: string
  birthday: string
  intro: string
  phone: string
  userid: string,
  score: number,
}
const userInfo = ref<typeUserInfo>({
  username: '',
  userpassword: '',
  sex: '',
  birthday: '',
  intro: '',
  phone: '',
  userid: '',
  score: 0,
})
const getUserInfoById = () => {
  axios
    .post('index.php/User/getUserInfoById', { userId: userId })
    .then(response => {
      console.log(response.data.data[0])
      userInfo.value = {
        username: response.data.data[0].username,
        userpassword: response.data.data[0].userpassword,
        sex: response.data.data[0].sex,
        birthday: response.data.data[0].birthday,
        intro: response.data.data[0].intro,
        phone: response.data.data[0].id,
        userid: response.data.data[0].id,
        score: response.data.data[0].score,
      }
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}

onMounted(
  () => {
    isLogined();

  }

)
//按钮禁用

const signUpButton = ref(true);
const changeState = () => {
  signUpButton.
    value = !signUpButton.value
}
const changeText = computed(() => {
  if (signUpButton.value) {
    getUserInfoById();
    return '更改'
  } else {
    return '取消更改'
  }
})
function userChange() {
  axios.post('index.php/User/userChange', userInfo.value)
    .then(response => {
      alert(response.data.message);
      signUpButton.value = true
      getUserInfoById()
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
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
