<template>

  <el-row :gutter="24">
    <el-col :span="2">
    </el-col>
    <el-col :span="18">
      <MultipleSelect :propItems="allProvince" title="选择省份" v-model:selectData="selectedProvince"
        style="margin-bottom: 10px;" />
      <MultipleSelect :propItems="lableNames" title="院校特色" v-model:selectData="selectLableNames" />
      <hr>
      <el-row :gutter="24" style="display: flex;margin: 30px;height: 40px;">
        <el-col :span="4" style="display: flex;justify-content: center;align-items: center;">
          <span>总共{{ totalSchool }}条</span>
        </el-col>
        <el-col :span="20">
          <el-input v-model.lazy="searchKey" style="width: 100%" size="large" placeholder="Please Input"
            :suffix-icon="Search" />
        </el-col>
      </el-row>
      <SchoolList :propSelectedProvince=selectedProvince :propSelectLableNames=selectLableNames :propSearchKey=searchKey
        v-model:totalSchool="totalSchool" />
    </el-col>
    <el-col :span="4">
    </el-col>
  </el-row>



</template>
<script lang="ts" setup name="name">
import { onMounted, ref } from 'vue';
import MultipleSelect from './Selectelement/MultipleSelect.vue';
import axios from 'axios';
const successCode = 'success'
//省份查询模块
const allProvince = ref([''])
const selectedProvince = ref(['不限'])
// 组件挂载时获取初始数据
onMounted(() => {
  getAllProvince();
});
const getAllProvince = () => {
  axios.get('/index.php/User/getAllProvince')
    .then(response => { // 获取请求返回数据
      if (response.data.status == successCode) {
        console.log(response.data.data); // 这里可以更新你的数据列表
        const provinceNames = response.data.data.map((item: { province_name: string; }) => item.province_name);
        allProvince.value = provinceNames
      } else (
        alert(response.data.message)
      )

    })
    .catch(error => { // 捕获异常
      console.log(error)
    })
};
//院校特色模块
const lableNames = [
  "985",
  "211",
  "双一流",
  "101计划",
  "研究生院",
  "保研",
  "国重点",
  "省重点",
  "部委院校",
  "省属",
  "省部共建",
  "C9",
  "E9",
  "国防七子",
  "五院四系",
  "两电一邮",
  "八大美院",
  "双高计划",
  "高水平学校建设单位",
  "高水平专业群建设单位",
  "国家级示范",
  "国家级骨干",
  "现代学徒制试点学院"
]

const selectLableNames = ref(['不限'])

//学校列表模块
import SchoolList from './SchoolList.vue';

//搜索框
import { Search } from '@element-plus/icons-vue'
const searchKey = ref("")
//
const totalSchool = ref()



</script>
<style scoped>
</style>
