<template>
  <el-container>
    <el-button class="Fixed" type="primary" size="large" :icon="Top" @click="scrollToTop" circle />
    <el-row :gutter="24">
      <el-col :span="3"></el-col>
      <el-col :span="12">
        <el-row>
          <el-row class="sticky-header">
            <a v-for="(item1) in treeData" :key="item1.code" :href="'#' + item1.code" style="margin: 10px;">{{
              item1.name
            }}</a>
          </el-row>

        </el-row>
        <el-row v-for="(item1, index) in treeData" :id="item1.code" :key="index" style="padding: 0;margin: 20px;">
          <div class="link" style="font-size: x-large;">{{ item1.name }}({{ item1.code }})</div>
          <el-row :gutter="24" v-for="item2 in item1.children" :key="item2"
            style="border:2px, gray,solid;border-width: 0.5px 0 0 0;">
            <el-col :span="6">
              <div href="#" style="font-size: large;"> {{ item2.name }}({{ item2.code }})</div>
            </el-col>
            <el-col :span="18">
              <el-row :gutter="24">
                <el-col :span="6" v-for="item3 in item2.children" :key="item3.code" style="margin: 10px;">
                  <a href="#" @click="goMajorInfo(item3.code)">{{ item3.name }}</a>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-row>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="7">
        <el-row class="text">搜索</el-row>
        <el-row>
          <el-input v-model="inputMajor" style="width: 100%" placeholder="Please input" class="input-with-select">
            <template #append>
              <el-button :icon="Search" @click="getAllMajorByQuery()" />
            </template>
          </el-input>
        </el-row>
        <el-row v-for="item in queryData" :key="item.code"
          style="margin: 5px;padding: 5px;border: 0.5px,gray,solid;border-radius: 3px;">
          <a href="#" @click="goMajorInfo(item.code)">{{ item.name }}</a>
        </el-row>
        <el-col :span="1"></el-col>
      </el-col>
    </el-row>
  </el-container>

</template>
<script lang="ts" setup name="name">
//导入下层
// import SelectMajorLevel2 from "./SelectMajorLevel/SelectMajorLevel2.vue";
//搜索框
const inputMajor = ref('')
interface Node {
  code: string;
  name: string;
}
const queryData = ref<Node[]>([])
function getAllMajorByQuery() {
  axios.post('/index.php/User/getAllMajorByQuery', {
    'majorName': inputMajor.value,
  })
    .then(response => { // 获取请求返回数据
      if (response.data.status == successCode) {
        queryData.value = response.data.data
      } else (
        alert(response.data.message)
      )
    })
    .catch(error => { // 捕获异常
      console.log(error)
    })
};

import { Top, Search } from '@element-plus/icons-vue'
import axios from 'axios';
import { onMounted, ref } from 'vue';
const successCode = 'success'

// type majorNode = {
//   "code": string,
//   "name": string
// }
// //第一级列表
// const level1List = ref<majorNode[]>([])


// 定义树形结构的接口
interface TreeNode3 {
  code: string;
  name: string;
  parent_id: string; // 可选的子节点数组
}
interface TreeNode2 {
  code: string;
  name: string;
  parent_id: string;
  children: TreeNode3[];// 可选的子节点数组
}
interface typeTreeNode {
  code: string;
  name: string;
  children: TreeNode2[];
}

// 初始化数据（这里使用简化的数据作为示例）
const treeData = ref<typeTreeNode[]>([])
const fetchDataByQuery = () => {
  axios.get('/index.php/User/getAllMajor',)
    .then(response => { // 获取请求返回数据
      if (response.data.status == successCode) {
        treeData.value = response.data.data
      } else (
        alert(response.data.message)
      )

    })
    .catch(error => { // 捕获异常
      console.log(error)
    })
};

// 组件挂载时获取初始数据
onMounted(() => {
  fetchDataByQuery();

});

const goMajorInfo = (code: string) => {
  window.open(`/MajorInfo/${code}`, '_blank'); // -> /user/eduardo
}
// 回到顶部的操作
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


</script>
<style scoped>
.el-row{
  width: 100%;
}
.el-row {
  width: 100%;
}
a{
text-decoration: none;
color: black;
}

@media (hover: hover) {
  a:hover {
    color: red;
  }
}
html {
  scroll-behavior: smooth;
}
.Fixed {
    position: fixed;
    bottom: 100px;
    right: 40%;
    z-index: 1;
}
</style>
