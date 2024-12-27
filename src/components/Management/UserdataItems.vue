<template>
  <div class="row">
    <el-col :span="24">
      <h1>用户信息</h1>
    </el-col>
  </div>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="用户id（电话）" width="180" />
    <el-table-column prop="username" label="用户名" width="180" />
    <el-table-column prop="score" label="分数" />
    <el-table-column prop="userpassword" label="密码" />
    <el-table-column prop="sex" label="性别" />
    <el-table-column prop="birthday" label="生日" />
    <el-table-column prop="intro" label="简介" />
    <el-table-column prop="state" label="封禁状态" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="changeState(scope.row.id)" type="danger" size="small">更改封禁状态</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
/**成功状态码 */
const successCode: string = 'success'
// 定义响应式数据
const tableData = ref([]);

// 获取所有用户数据的函数
const getAllUserData = async () => {
  axios.get('/index.php/Management/getAllUserData')
    .then(response => { // 获取请求返回数据
      if (response.data.status == successCode) {
        console.log("userwaitdata请求到的数据：", response.data);
        tableData.value = response.data.data;
      } else (
        alert(response.data.message)
      )
    })
    .catch(error => { // 捕获异常
      console.log(error)
    })
};

// 删除用户数据函数
// const handleDelete = async (userid: string) => {
//   try {
//     const response = await axios.post('/index.php/Management/deleteUserById', { "userid": userid });
//     // 处理成功的响应
//     if (response.data.status == successCode) {
//       alert(response.data.message);
//     } else (
//       alert(response.data.message)
//     )
//     getAllUserData(); // 获取最新数据
//   } catch (error) {
//     console.error('There was an error!', error);
//   }
// };
//改变封禁状态
const changeState = async (userid: string) => {
  try {
    const response = await axios.post('/index.php/Management/changeState', { "userid": userid });
    // 处理成功的响应
    alert(response.data.message)
    getAllUserData(); // 获取最新数据
  } catch (error) {
    console.error('There was an error!', error);
  }
};

// 在组件挂载时获取所有用户数据
onMounted(() => {
  getAllUserData();
});


</script>
