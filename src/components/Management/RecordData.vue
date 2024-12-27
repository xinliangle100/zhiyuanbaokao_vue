<template>
  <el-dialog v-model="dialogFormVisible" title="修改值" width="500">
    <el-form :model="updata">
      <el-form-item label="id" :label-width="formLabelWidth">
        <el-input v-model="updata.id" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="学校id" :label-width="formLabelWidth">
        <el-input v-model="updata.school_code" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="学校名称" :label-width="formLabelWidth">
        <el-input v-model="updata.school_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="专业id" :label-width="formLabelWidth">
        <el-input v-model="updata.major_code" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="专业名称" :label-width="formLabelWidth">
        <el-input v-model="updata.major_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="投档最低分" :label-width="formLabelWidth">
        <el-input v-model="updata.min_score" autocomplete="off" />
      </el-form-item>
      <el-form-item label="语数成绩" :label-width="formLabelWidth">
        <el-input v-model="updata.chinese_score" autocomplete="off" />
      </el-form-item>
      <el-form-item label="语数最高成绩" :label-width="formLabelWidth">
        <el-input v-model="updata.chinese_max_score" autocomplete="off" />
      </el-form-item>
      <el-form-item label="外语成绩" :label-width="formLabelWidth">
        <el-input v-model="updata.foreign_language_score" autocomplete="off" />
      </el-form-item>
      <el-form-item label="首选科目成绩" :label-width="formLabelWidth">
        <el-input v-model="updata.preferred_subject_score" autocomplete="off" />
      </el-form-item>
      <el-form-item label="再选科目最高成绩" :label-width="formLabelWidth">
        <el-input v-model="updata.elective_subject_max_score" autocomplete="off" />
      </el-form-item>
      <el-form-item label="再选科目最低成绩" :label-width="formLabelWidth">
        <el-input v-model="updata.elective_subject_second_score" autocomplete="off" />
      </el-form-item>
      <el-form-item label="志愿号" :label-width="formLabelWidth">
        <el-input v-model="updata.volunteer_code" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="updata.remarks" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <p>PS:报考id,学校id与专业id为不允许更改</p>
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false, changeData()">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <div class="flex gap-4 mb-4 items-center" style="margin: 5px;">
    <span>设置查询条件:</span>
    <el-input v-model="school_code" style="width: 240px;margin-left: 5px;margin-right: 5px;" placeholder="学校代码" />
    <el-input v-model="school_name" style="width: 240px;margin-left: 5px;margin-right: 5px;" placeholder="学校名称" />
    <el-input v-model="major_name" style="width: 240px;margin-left: 5px;margin-right: 5px;" placeholder="专业名称" />
    <el-button type="primary" @click="fetchDataByQuery()">查询</el-button>
  </div>

  <div class="demo-pagination-block">
    <div class="demonstration">
      <el-table :data="outPutData" stripe style="width: 100% ;">
        <el-table-column prop="id" label="报考id" />
        <el-table-column prop="school_code" label="学校id" />
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
        <el-table-column label="操作">
          <template #default="scope">
            <el-button plain @click="dialogFormVisible = true, changeNode(scope.row)" type="primary"
              size="small">修改</el-button>
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
import { ref, onMounted, toRaw } from 'vue';
import type { ComponentSize } from 'element-plus';
import axios from 'axios';

const currentPage = ref(1); // 当前页
const pageSize = ref(20); // 每页条数
const totalCount = ref(0); // 数据总数
const outPutData = ref([])
const size = ref<ComponentSize>('default');
const background = ref(false);
const disabled = ref(false);
const successCode: string = "success"

const props = defineProps(['year'])
const year = ref(props.year)
//废弃，有更好的选择fetchDataByQuery
// const fetchData = (page: number = 1, pageSize: number = 20) => {

//   axios.post('/index.php/Management/getDataByYear', { "year": year.value, "page": page, "pageSize": pageSize })
//     .then(response => { // 获取请求返回数据
//       if (response.data.status == successCode) {
//         // 更新分页数据
//         totalCount.value = response.data.total_count;
//         outPutData.value = response.data.data;
//         // 处理返回的数据（例如：更新列表）
//         console.log(response.data.data); // 这里可以更新你的数据列表
//       } else (
//         alert(response.data.message)
//       )

//     })
//     .catch(error => { // 捕获异常
//       console.log(error)
//     })
// };

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

// 组件挂载时获取初始数据
onMounted(() => {
  fetchDataByQuery();
});

// 修改测试按钮
const changeData = () => {
  console.log(year.value);
  axios.post('/index.php/Management/changeRecordData', { "year": year.value, "updata": updata.value })
    .then(response => { // 获取请求返回数据
      if (response.data.status == successCode) {
        alert(response.data.message)
      } else (
        alert(response.data.message)
      )
      fetchDataByQuery();

    })
    .catch(error => { // 捕获异常
      console.log(error)
    })

}

//弹出修改框
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const updata = ref(
  {
    id: '',
    school_code: '',
    school_name: '',
    major_code: '',
    major_name: '',
    min_score: 0,
    chinese_score: 0,
    chinese_max_score: 0,
    foreign_language_score: 0,
    preferred_subject_score: 0,
    elective_subject_max_score: 0,
    elective_subject_second_score: 0,
    volunteer_code: '',
    remarks: '',
  }
)

//节点数据格式
type nodeData = {
  school_code: string,
  school_name: string,
  major_code: string,
  major_name: string,
  min_score: number,
  chinese_score: number,
  chinese_max_score: number,
  foreign_language_score: number,
  preferred_subject_score: number,
  elective_subject_max_score: number,
  elective_subject_second_score: number,
  volunteer_code: string,
  remarks: string,
}
const changeNode = (value: nodeData) => {
  updata.value = JSON.parse(JSON.stringify(toRaw(value)))
}


//模糊查询相关功能
const school_code = ref('')
const school_name = ref('')
const major_name = ref('')
const fetchDataByQuery = () => {
  axios.post('/index.php/Management/getDataByQuery', {
    "year": year.value,
    "page": currentPage.value,
    "pageSize": pageSize.value,
    "school_code": school_code.value,
    "school_name": school_name.value,
    "major_name": major_name.value,
  })
    .then(response => { // 获取请求返回数据
      if (response.data.status == successCode) {
        // 更新分页数据
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





</script>
<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

</style>
