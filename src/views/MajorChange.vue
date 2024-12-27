<template>
  <el-container>
    <el-col :span="4">

    </el-col>
    <el-col :span="14">
      <el-row style="margin-bottom: 20px;margin-top: 20px;">
        <el-row style="font-size: 54px;">
          {{ majorInfo.name }}
        </el-row>
        <el-row :gutter="24" style="font-size: 24px;">
          <el-col :span="7">
            国标代码{{ majorInfo.code }}（不可用于填报）
          </el-col>
          <el-col :span="9">
          </el-col>

          <el-col :span="4">
            <el-button type="warning" plain @click="changeState()">
              {{ stateText }}
            </el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="success" plain @click="updateMajorData()">提交</el-button>
          </el-col>
        </el-row>
      </el-row>
      <hr>
      <el-row style="font-size: 28px;">
        专业详情
      </el-row>
      <el-row class="many-icon" style="display: flex;justify-content: space-evenly;">
        <div>
          <img src="/images/time.png" alt="">
          <el-row>
            <el-input :disabled="state" class="text" v-model="majorInfo.edu_level" style="width: 70px;"
              placeholder="请输入" />
            <span class="text2">学历层次</span>
          </el-row>
        </div>
        <div>
          <img src="/images/school.png" alt="">
          <el-row>
            <div> <el-input :disabled="state" class="text" v-model="majorInfo.learn_year" style="width: 50px;"
                placeholder="请输入" />年</div>
            <span class="text2">修业年限</span>
          </el-row>
        </div>
        <div>
          <img src="/images/apps.png" alt="">
          <el-row>
            <el-input :disabled="state" class="text" v-model="majorInfo.degree" style="width: 100px;"
              placeholder="请输入" />
            <span class="text2">授予学位</span>
          </el-row>
        </div>
        <div>
          <img src="/images/class.png" alt="">
          <span class="text2"></span>
          <el-row>
            <div> <el-input :disabled="state" class="text" v-model="majorInfo.male_ratio" style="width: 50px;"
                placeholder="请输入" />/<el-input :disabled="state" v-model="majorInfo.female_ratio" style="width: 50px;"
                placeholder="请输入" /></div>
            <span class="text2">男女比例</span>
          </el-row>
        </div>

      </el-row>
      <el-row class="text-card" :gutter="24">
        <el-row>
          <span style="">专业介绍</span>
        </el-row>
        <el-input :disabled="state" v-model="majorInfo.introduction" style="width: 100%;font-size: larger;" :rows="6"
          placeholder="请输入" type="textarea" />
      </el-row>
      <el-row class="text-card" :gutter="24">
        <el-row>
          <span style="">培养目标</span>
        </el-row>
        <el-input :disabled="state" v-model="majorInfo.edu_objective" style="width: 100%;font-size: larger;" :rows="6"
          placeholder="请输入" type="textarea" />
      </el-row>
      <el-row class="text-card" :gutter="24">
        <el-row>
          <span style="">培养要求</span>
        </el-row>
        <el-input :disabled="state" v-model="majorInfo.edu_requirement" style="width: 100%;font-size: larger;" :rows="6"
          placeholder="请输入" type="textarea" />

      </el-row>
      <el-row class="text-card" :gutter="24">
        <el-row>
          <span style="">学科要求</span>
        </el-row>
        <el-input :disabled="state" v-model="majorInfo.subject_requirement" style="width: 100%;font-size: larger;"
          :rows="6" placeholder="Please input" type="textarea" />
      </el-row>
      <el-row class="text-card" :gutter="24">
        <el-row>
          <span style="">知识能力</span>
        </el-row>
        <el-input :disabled="state" v-model="majorInfo.lore_and_ability" style="width: 100%;font-size: larger;"
          :rows="6" placeholder="请输入" type="textarea" />

      </el-row>
      <el-row class="text-card" :gutter="24">
        <el-row>
          <span style="">考研方向</span>
        </el-row>
        <el-input :disabled="state" v-model="majorInfo.study_direction" style="width: 100%;font-size: larger;" :rows="6"
          placeholder="请输入" type="textarea" />
      </el-row>
      <el-row class="text-card" :gutter="24">
        <el-row>
          <span style="">主要课程</span>
        </el-row>
        <el-input :disabled="state" v-model="majorInfo.main_course" style="width: 100%;font-size: larger;" :rows="6"
          placeholder="请输入" type="textarea" />
      </el-row>
      <el-row class="text-card" :gutter="24">
        <el-row>
          <span style="">社会名人</span>
        </el-row>
        <el-input :disabled="state" v-model="majorInfo.famous_scholar" style="width: 100%;font-size: larger;" :rows="6"
          placeholder="请输入" type="textarea" />
      </el-row>
      <el-row class="text-card" :gutter="24">
        <el-row>
          <span style="">就业方向</span>
        </el-row>
        <el-input :disabled="state" v-model="majorInfo.job_direction" style="width: 100%;font-size: larger;" :rows="6"
          placeholder="请输入" type="textarea" />
      </el-row>
    </el-col>
    <el-col :span="4">

    </el-col>
  </el-container>

</template>
<script lang="ts" setup name="name">
//状态管理
const state = ref(true)
const stateText = computed(() => {
  if (state.value) {
    return '修改'
  } else {
    return '取消修改'
  }
})
const changeState = () => {
  state.value = !state.value
  fetchDataByQuery()
}

import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
type typeMajorInfo = {
  big_name: string,
  middle_name: string,
  code: string,
  name: string,
  introduction: string,
  edu_level: string,
  learn_year: string,
  degree: string,
  male_ratio: string,
  female_ratio: string,
  salary: string,
  edu_objective: string,
  edu_requirement: string,
  subject_requirement: string,
  lore_and_ability: string,
  study_direction: string,
  main_course: string,
  job_direction: string,
  famous_scholar: string,
  hits: string,

}
const majorInfo = ref<typeMajorInfo>({
  big_name: '',
  middle_name: '',
  code: '',
  name: '',
  introduction: '',
  edu_level: '',
  learn_year: '',
  degree: '',
  male_ratio: '',
  female_ratio: '',
  salary: '',
  edu_objective: '',
  edu_requirement: '',
  subject_requirement: '',
  lore_and_ability: '',
  study_direction: '',
  main_course: '',
  job_direction: '',
  famous_scholar: '',
  hits: '',
})
const props = defineProps({
  code: {
    type: String,
    required: true,
  }
});
//提交修改

const updateMajorData = () => {
  axios.post('/index.php/Management/updateMajorData', {
    "updateData": majorInfo.value
  })
    .then(response => { // 获取请求返回数据
      alert(response.data.message)
      fetchDataByQuery()
      state.value = true
    })
    .catch(error => { // 捕获异常
      console.log(error)
    })
};

const fetchDataByQuery = () => {
  axios.post('/index.php/User/getMajorInfo', {
    "code": props.code
  })
    .then(response => { // 获取请求返回数据
      if (response.data.status == 'success') {
        const data = response.data.data[0];
        majorInfo.value = {
          "big_name": data.big_name,
          "middle_name": data.middle_name,
          "code": data.code,
          "name": data.name,
          "introduction": data.introduction,
          "edu_level": data.edu_level,
          "learn_year": data.learn_year,
          "degree": data.degree,
          "male_ratio": data.male_ratio,
          "female_ratio": data.female_ratio,
          "salary": data.salary,
          "edu_objective": data.edu_objective,
          "edu_requirement": data.edu_requirement,
          "subject_requirement": data.subject_requirement,
          "study_direction": data.study_direction,
          "lore_and_ability": data.lore_and_ability,
          "main_course": data.main_course,
          "job_direction": data.job_direction,
          "famous_scholar": data.famous_scholar,
          "hits": data.hits,
        }
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

// const lore_and_ability = computed(() => {
//   return majorInfo.value.lore_and_ability.replace(/\n/g, '<br>');
// });

</script>
<style scoped>
.many-icon div img{
width: 74px;
height: 74px;
margin: 10px
}
.many-icon {
  display: flex;
  justify-content: space-around;

}
.many-icon div {
  display: flex;
  justify-content: space-around;
}
.many-icon div .el-row{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-row{
  width: 100%;
}
.text {
  font-size: large;
}
.text-card{
align-items: center;margin: 5px 5px 15px 5px
}
.text-card .el-row{
margin: 0;
}
.text-card .el-row span{
font-size: 28px;
border: 5px,solid,rgb(196, 86.4, 86.4);
border-width: 0 0 0 5px;
}
.text-card p{
  margin-top: 0;
  text-align: left;
}
</style>
