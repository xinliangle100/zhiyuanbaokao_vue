<template>
  <div class="flex gap-4 mb-4 items-center" style="margin: 5px;">
    <span>用户信息：</span>
    <span style="margin: 0 20px 0 20px;">用户分数：{{ userScore }}</span>
    <span style="margin: 0 20px 0 20px;">用户排名：{{ getUserRanking.ranking }}</span>
  </div>
  <div class="flex gap-4 mb-4 items-center" style="margin: 5px;">
    <span style="margin: 0 20px 0 0 ">设置查询条件:</span>
    <span>学校id：</span><el-input v-model="school_code" style="width: 150px;margin-left: 5px;margin-right: 5px;"
      placeholder="学校代码" />
    <span>学校名称：</span><el-input v-model="school_name" style="width: 150px;margin-left: 5px;margin-right: 5px;"
      placeholder="学校名称" />
    <span>专业名称：</span><el-input v-model="major_name" style="width: 150px;margin-left: 5px;margin-right: 5px;"
      placeholder="专业名称" />
    <span>最高名次：</span><el-input v-model="ranking" type="number" style="width: 150px;margin-left: 5px;margin-right: 5px;"
      placeholder="最高名次" />
    <span>最低名次：</span><el-input v-model="top_ranking" type="number"
      style="width: 150px;margin-left: 5px;margin-right: 5px;" placeholder="最低名次" />
    <el-button type="primary" @click="fetchDataByQuery()">查询</el-button>
  </div>
  <div class="demo-pagination-block">
    <div class="demonstration">
      <el-table :data="outPutData" stripe style="width: 100%;" :key="tableKey">
        <el-table-column prop="id" label="报考id" />
        <el-table-column prop="school_code" label="学校id" />
        <el-table-column prop="school_name" label="学校名称" />
        <el-table-column prop="major_code" label="专业id" />
        <el-table-column prop="major_name" width="200" label="专业名称" />
        <el-table-column prop="ranking" label="最低名次" />
        <el-table-column prop="min_score" label="投档最低分" />
        <el-table-column prop="chinese_score" label="语数成绩" />
        <el-table-column prop="chinese_max_score" label="语数最高成绩" />
        <el-table-column prop="foreign_language_score" label="外语成绩" />
        <el-table-column prop="preferred_subject_score" label="首选科目成绩" />
        <el-table-column prop="elective_subject_max_score" label="再选科目最高成绩" />
        <el-table-column prop="elective_subject_second_score" label="再选科目最低成绩" />
        <el-table-column prop="volunteer_code" label="志愿号" />
        <el-table-column label="状态">
          <template #default="scope">
            <span :style="{ color: getColor(scope.row.ranking) }"> {{ chongWenBao(scope.row.ranking) }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button plain type="primary" size="small" @click="addUserApp(scope.row.id)">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
      :page-sizes="[20, 100, 200, 300, 400]" :size="size" :disabled="disabled" :background="background"
      layout="total, sizes, prev, pager, next, jumper" :total="totalCount" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { ComponentSize } from 'element-plus';
import axios from 'axios';
//最高级
import { useUserDataStore } from '@/stores/userData';
import { storeToRefs } from 'pinia';
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useUserDataStore()
const { userId } = storeToRefs(store)
//获取用户分数
const userScore = ref(0)
function getUserInfoById() {
  axios
    .post('index.php/User/getUserInfoById', { 'userId': userId.value })
    .then(response => {
      userScore.value = response.data.data[0].score;
      getRankingByScore();
      fetchDataByQuery();
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}

const getUserRanking = ref({
  topRanking: 0,
  ranking: 0,
})
function getRankingByScore() {
  axios
    .post('index.php/User/getRankingByScore', { 'score': userScore.value })
    .then(response => {
      console.log(response.data.data[0])
      getUserRanking.value = {
        topRanking: response.data.data[0].top_ranking,
        ranking: response.data.data[0].ranking,
      }
      top_ranking.value = getUserRanking.value.topRanking + 5000
      ranking.value = getUserRanking.value.ranking - 1000
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}



const currentPage = ref(1); // 当前页
const pageSize = ref(20); // 每页条数
const totalCount = ref(0); // 数据总数
const outPutData = ref([])
const size = ref<ComponentSize>('default');
const background = ref(false);
const disabled = ref(false);
const successCode: string = "success"


const handleSizeChange = (size: number) => {
  console.log(`${size} items per page`);
  pageSize.value = size;
  fetchDataByQuery(); // 当每页条数变化时请求新数据
};

const handleCurrentChange = (page: number) => {
  console.log(`current page: ${page}`);
  currentPage.value = page;
  fetchDataByQuery();  // 当页码变化时请求新数据
};




// //节点数据格式
// type nodeData = {
//   school_code: string,
//   school_name: string,
//   major_code: string,
//   major_name: string,
//   min_score: number,
//   chinese_score: number,
//   chinese_max_score: number,
//   foreign_language_score: number,
//   preferred_subject_score: number,
//   elective_subject_max_score: number,
//   elective_subject_second_score: number,
//   volunteer_code: string,
//   remarks: string,
// }



//模糊查询相关功能
const school_code = ref('')
const school_name = ref('')
const major_name = ref('')
const top_ranking = ref(0)
const tableKey = ref(0)
const ranking = ref(0)
const fetchDataByQuery = () => {
  axios.post('/index.php/User/getScoreByQuery', {
    "year": '2024',
    "page": currentPage.value,
    "pageSize": pageSize.value,
    "school_code": school_code.value,
    "school_name": school_name.value,
    "major_name": major_name.value,
    "ranking": ranking.value,
    "top_ranking": top_ranking.value
  })
    .then(response => { // 获取请求返回数据
      if (response.data.status == successCode) {
        // 更新分页数据
        tableKey.value++
        totalCount.value = response.data.total_count;
        outPutData.value = response.data.data;

        // 处理返回的数据（例如：更新列表）
        console.log(response.data.data); // 这里可以更新你的数据列表
      } else (
        alert(response.data.message)
      )

    })
    .catch(error => { // 捕获异常
      console.log(error)
    })
};


// 在页面加载时执行获取数据的函数
onMounted(async () => {
  getUserInfoById()  // 确保先获取用户信息
})


//填报相关功能
const chongWenBao = (Ranking: number) => {
  const difference = getUserRanking.value.ranking - Ranking;
  if (difference >= 1000) {
    return '--'; // ranking 高于 Ranking 5000 以上
  } else if (difference >= 0 && difference < 1000) {
    return '冲'; // ranking 在 Ranking 前 5000 内
  } else if (difference < 0 && difference > -1000) {
    return '稳'; // ranking 在 Ranking 后 5000 内
  } else {
    return '保'; // ranking 在 Ranking 后 5000 以上
  }
}
const getColor = (Ranking: number): string => {
  const difference = getUserRanking.value.ranking - Ranking;
  if (difference >= 1000) {
    return 'black'; // ranking 高于 Ranking 5000 以上
  } else if (difference >= 0 && difference < 1000) {
    return 'red'; // ranking 在 Ranking 前 5000 内
  } else if (difference < 0 && difference > -1000) {
    return 'rgb(184, 129.6, 48)'; // ranking 在 Ranking 后 5000 内
  } else {
    return 'rgb(148.6, 212.3, 117.1)'; // ranking 在 Ranking 后 5000 以上
  }
};
function addUserApp(app_id: string) {
  axios
    .post('index.php/User/addUserApp', { 'user_id': userId.value, 'app_id': app_id })
    .then(response => {
      alert(response.data.message)
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}

</script>
<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

</style>
