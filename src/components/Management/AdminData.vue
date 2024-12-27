<template>
  <el-header style="display: inline-flex;    align-items: center;float: right;">

    <div class="flex-grow" style="float: right;">
      <el-button type="primary" plain @click="dialogFormVisible = true">添加账号</el-button>
    </div>
    <!-- 对话框组件 -->
  </el-header>
  <div class="row">
    <el-col :span="24">
      <h1>管理员信息</h1>
    </el-col>
  </div>
  <el-dialog v-model="dialogFormVisible" title="新建管理员信息" width="500">
    <el-form :model="form">
      <el-form-item label="用户id" :label-width="formLabelWidth">
        <el-input v-model="form.userid" autocomplete="off" />
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.userpassword" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false; buildAdminAccount()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="id" label="用户id（电话）" width="180" />
    <el-table-column prop="name" label="用户名" width="180" />
    <el-table-column prop="password" label="密码" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button @click="handleDelete(scope.row.id)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup name="AdminData">
import axios from 'axios' //导入 Axios
import { reactive, ref } from 'vue'

const dialogFormVisible = ref<boolean>(false)
const formLabelWidth: string = '140px'
const form = reactive({
  userid: '',
  username: '',
  userpassword: '',

})
/**成功状态码 */
const successCode: string = 'success'
// /**失败状态码 */
// const falseCode: string = 'false'

const tableData = ref([]);
// const componentKey = ref<number>(0);

import { onMounted } from "vue";
onMounted(() => {
  getAllAdminData();
})


// 获取管理员数据
const getAllAdminData = async () => {
  axios.get('/index.php/Management/getAllAdminData')
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
}

// 创建管理员账
const buildAdminAccount = () => {
  axios.post('/index.php/Management/addAdmin', form)
    .then(async response => {
      alert(response.data.message);
      await getAllAdminData(); // 创建成功后重新获取数据}
    })
    .catch(error => {
      console.log(error)
    })
}


import { useAdminDataStore } from "@/stores/adminData";
const { adminId } = useAdminDataStore()
// 删除用户的函数
const handleDelete = (userid: string) => {
  if (userid == adminId) {
    alert('您无法删除自己')
    return
  }
  axios.post('/index.php/Management/deleteAdminById', {
    "userid": userid
  })
    .then(async response => {
      alert(response.data.message)
      await getAllAdminData(); // 刷新数据
    })
    .catch(error => {
      console.log(error)
    })
}
</script>


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
