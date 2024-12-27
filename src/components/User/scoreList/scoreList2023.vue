<template>
  <div class="demo-pagination-block">
    <div class="demonstration">
      <el-table :data="outPutData" stripe style="width: 100%;">
        <el-table-column prop="school_code" label="学校id报考" />
        <el-table-column prop="school_name" label="学校名称" width="200" />
        <el-table-column prop="major_code" label="专业id" />
        <el-table-column prop="major_name" label="专业名称" />
        <el-table-column prop="min_score" label="投档最低分" />
        <el-table-column prop="chinese_score" label="语数成绩" />
        <el-table-column prop="chinese_max_score" label="语数最高成绩" />
        <el-table-column prop="foreign_language_score" label="外语成绩" />
        <el-table-column prop="preferred_subject_score" label="首选科目成绩" />
        <el-table-column prop="elective_subject_max_score" label="再选科目最高成绩" />
        <el-table-column prop="elective_subject_second_score" label="再选科目最低成绩" />
        <el-table-column prop="volunteer_code" label="志愿号" />
        <el-table-column prop="remarks" label="备注" />
      </el-table>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const outPutData = ref([])

const successCode: string = "success"
const props = defineProps({
  code: {
    type: String,
    required: true,
  },

});
//模糊查询相关功能
const fetchDataByQuery = () => {
  axios.post('/index.php/User/getScoreByCode2023', {
    "code": props.code,
  })
    .then(response => { // 获取请求返回数据
      if (response.data.status == successCode) {
        outPutData.value = response.data.data;
        // 处理返回的数据（例如：更新列表）
        console.log(response.data.data); // 这里可以更新你的数据列表
        console.log('propsdata');
        console.log(props.code);
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








</script>
<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
