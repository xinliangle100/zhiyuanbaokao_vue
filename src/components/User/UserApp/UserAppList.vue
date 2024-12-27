<template>
  <el-button class="Fixed" @click="exportToExcel()" style="  width: 50px;
  height: 50px;" type="info" :icon="Document" circle />
  <el-dialog v-model="dialogFormVisible" title="修改顺序" width="500" :key="tableKey">
    <el-form :model="updata">
      <el-form-item label="用户id" :label-width="formLabelWidth">
        <el-input v-model="updata.user_id" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="报考id" :label-width="formLabelWidth">
        <el-input v-model="updata.app_id" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="改为第几志愿" :label-width="formLabelWidth">
        <el-input v-model="updata.user_ranking" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false, submitChange()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <div class="flex gap-4 mb-4 items-center" style="margin: 5px;">
    <span>用户信息：</span>
    <span style="margin: 0 20px 0 20px;">用户分数：{{ userScore }}</span>
    <span style="margin: 0 20px 0 20px;">用户排名：{{ getUserRanking.ranking }}</span>
  </div>
  <hr>
  <div class="demo-pagination-block">
    <div class="demonstration">
      <el-table :data="outPutData" stripe style="width: 100%;" :key="tableKey">
        <el-table-column prop="user_ranking" label="用户志愿顺序" />
        <el-table-column prop="app_id" label="报考id" />
        <el-table-column prop="school_code" label="学校id" />
        <el-table-column prop="school_name" label="学校名称" />
        <el-table-column prop="major_code" label="专业id" />
        <el-table-column prop="major_name" width="180" label="专业名称" />
        <el-table-column prop="ranking" label="最低名次" />
        <el-table-column prop="min_score" label="投档最低分" />
        <el-table-column prop="chinese_score" label="语数成绩" />
        <el-table-column prop="chinese_max_score" label="语数最高成绩" />
        <el-table-column prop="foreign_language_score" label="外语成绩" />
        <el-table-column prop="preferred_subject_score" label="首选科目成绩" />
        <el-table-column prop="elective_subject_max_score" label="再选科目最高成绩" />
        <el-table-column prop="elective_subject_second_score" label="再选科目最低成绩" />

        <el-table-column label="状态">
          <template #default="scope">
            <span :style="{ color: getColor(scope.row.ranking) }"> {{ chongWenBao(scope.row.ranking) }} </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button plain type="danger" size="small" @click="deleteAppByid(scope.row.app_id)">删除</el-button>
            <el-button plain type="primary" size="small"
              @click="dialogFormVisible = true; changeOrder(scope.row.app_id)">更改顺序</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script lang="ts" setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Document } from '@element-plus/icons-vue';
//最高级
import { useUserDataStore } from '@/stores/userData';
import { storeToRefs } from 'pinia';
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useUserDataStore()
const { userId, isLogin } = storeToRefs(store)
//获取用户分数
const userScore = ref(0)
function getUserInfoById() {
  axios
    .post('index.php/User/getUserInfoById', { 'userId': userId.value })
    .then(response => {
      userScore.value = response.data.data[0].score;
      getRankingByScore();
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}
const isLogined = () => {
  if (!isLogin.value) {
    window.open(`/LoginView`, '_self'); // -> /user/eduardo
  }
}
onMounted(
  () => {
    isLogined()
  }
)
const getUserRanking = ref({
  topRanking: 0,
  ranking: 0,
})
function getRankingByScore() {
  axios
    .post('index.php/User/getRankingByScore', { 'score': userScore.value })
    .then(response => {

      getUserRanking.value = {
        topRanking: response.data.data[0].top_ranking,
        ranking: response.data.data[0].ranking,
      }
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}
const outPutData = ref([])
//table销毁重新加载
const tableKey = ref(0)
//获取用户的志愿
const getUserApps = () => {
  axios
    .post('index.php/User/getUserAppsById', { 'user_id': userId.value })
    .then(response => {
      outPutData.value = response.data.data
      tableKey.value++
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}

// 在页面加载时执行获取数据的函数
onMounted(async () => {
  getUserApps()
  getUserInfoById()  // 确保先获取用户信息
})
//填报相关功能
const chongWenBao = (Ranking: number) => {
  const difference = getUserRanking.value.ranking - Ranking;
  if (difference >= 5000) {
    return '--'; // ranking 高于 Ranking 5000 以上
  } else if (difference >= 0 && difference < 5000) {
    return '冲'; // ranking 在 Ranking 前 5000 内
  } else if (difference < 0 && difference > -5000) {
    return '稳'; // ranking 在 Ranking 后 5000 内
  } else {
    return '保'; // ranking 在 Ranking 后 5000 以上
  }
}
const getColor = (Ranking: number): string => {
  const difference = getUserRanking.value.ranking - Ranking;
  if (difference >= 5000) {
    return 'black'; // ranking 高于 Ranking 5000 以上
  } else if (difference >= 0 && difference < 5000) {
    return 'red'; // ranking 在 Ranking 前 5000 内
  } else if (difference < 0 && difference > -5000) {
    return 'rgb(184, 129.6, 48)'; // ranking 在 Ranking 后 5000 内
  } else {
    return 'rgb(148.6, 212.3, 117.1)'; // ranking 在 Ranking 后 5000 以上
  }
};
//删除操作
const deleteAppByid = (app_id: string) => {
  axios
    .post('index.php/User/deleteAppByid', { 'user_id': userId.value, 'app_id': app_id })
    .then(response => {
      alert(response.data.message)
      getUserApps()
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}
//更改顺序操作
//弹出修改框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const updata = ref(
  {
    user_id: '',
    app_id: '',
    user_ranking: 1,
  }
)
const changeOrder = (app_id: string) => {
  updata.value.user_id = userId.value
  updata.value.app_id = app_id
  updata.value.user_ranking = 1
}
const submitChange = () => {
  axios
    .post('index.php/User/changeOrder', updata.value)
    .then(response => {
      alert(response.data.message)
      getUserApps()
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}
//导出表
import * as XLSX from 'xlsx';

// 定义数据的类型
interface OutputData {
  user_ranking: string;
  app_id: string;
  school_code: string;
  school_name: string;
  major_code: string;
  major_name: string;
  min_score: string;
  chinese_score: string;
  chinese_max_score: string;
  foreign_language_score: string;
  preferred_subject_score: string;
  elective_subject_max_score: string;
  elective_subject_second_score: string;
}

function exportToExcel() {
  // 假设这是你要导出的数据
  const data: OutputData[] = outPutData.value;

  // 定义表头映射
  const headerMap: { [key in keyof OutputData]: string } = {
    "user_ranking": "志愿顺序",
    "app_id": "报考id",
    "school_code": "学校代码",
    "school_name": "学校名称",
    "major_code": "专业代码",
    "major_name": "专业名称",
    "min_score": "投档最低分",
    "chinese_score": "语数成绩",
    "chinese_max_score": "语数最高成绩",
    "foreign_language_score": "外语成绩",
    "preferred_subject_score": "首选科目最高",
    "elective_subject_max_score": "再选科目最高",
    "elective_subject_second_score": "再选科目次高"
  };

  // 使用映射生成表格数据
  const formattedData = data.map((item, index) => {
    const formattedItem: { [key: string]: string } = {};
    // 将 "志愿顺序" 放到最前面
    formattedItem[headerMap["user_ranking"]] = (index + 1).toString(); // 从 1 开始计数

    // 将其他字段填充到 formattedItem 中
    for (const key in item) {
      // 确保 key 是 OutputData 类型中的有效键
      if (headerMap.hasOwnProperty(key)) {
        const mappedHeader = headerMap[key as keyof OutputData];
        // 忽略此行的类型错误
        // @ts-ignore
        formattedItem[mappedHeader] = item[key];
      }
    }
    return formattedItem;
  });

  // 将数据转换为工作表
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // 创建一个新的工作簿并附加工作表
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // 生成 Excel 文件的二进制字符串
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

  // 将二进制字符串转换为 ArrayBuffer
  const buf = new ArrayBuffer(wbout.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < wbout.length; ++i) {
    view[i] = wbout.charCodeAt(i) & 0xFF;
  }

  // 创建 Blob 对象
  const blob = new Blob([buf], { type: 'application/octet-stream' });

  // 创建一个链接元素并触发下载
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', userId.value + '.xlsx');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

</script>
<style scoped>
.Fixed {
    position: fixed;
    bottom: 100px;
    right: 10%;
    z-index: 2;
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

</style>
