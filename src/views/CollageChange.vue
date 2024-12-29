<template>
  <el-container>
    <el-header :gutter="24" style="padding-top: 50px;padding-bottom: 30px;height: 150px;">
      <el-row>
        <el-col :span="2" :offset="3" style="display: flex; justify-content: center; align-items:center;">
          <img class="icon-img" :src="webUrl + 'schoolimgs/schoolIcon/' + schoolList.logo_filename" alt="Logo Image" />
        </el-col>
        <el-col :span="8" class="col-list">
          <el-row>
            <span class="text onclick-style">{{ schoolList.cn_name }}</span>
          </el-row>
          <el-row>
            <el-input v-model="schoolList.features" style="width: 400px" :disabled="state" placeholder="Please input" />
          </el-row>
          <el-row>
            <el-input v-model="schoolList.province_name" :disabled="state" style="width: 80px;"
              placeholder="Please input" />
            <el-input v-model="schoolList.city_name" :disabled="state" style="width: 80px;"
              placeholder="Please input" />
            <el-input v-model="schoolList.categories" :disabled="state" style="width: 80px;"
              placeholder="Please input" />
            <el-input v-model="schoolList.belong" :disabled="state" style="width: 80px;" placeholder="Please input" />
          </el-row>
        </el-col>
        <el-col :span="3">
          <el-row style="display: flex;align-items:center">
            热度：
            <el-input v-model="schoolList.hits" :disabled="state" style="width: 100px;" placeholder="Please input" />
          </el-row>
          <el-row style="display: flex;align-items:center">
            排名： <el-input v-model="schoolList.ranking" :disabled="state" style="width: 100px;"
              placeholder="Please input" />
          </el-row>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="2" style="display: flex;align-items:center">
          <el-button type="warning" style="width: 100px;height: 40px;" plain @click="changeState()">
            {{ stateText }}
          </el-button>
        </el-col>
        <el-col :span="2" style="display: flex;align-items:center">
          <el-button type="success" style="width: 100px;height: 40px;" plain @click="updateChllageInfo()">提交</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="24" justify="center">
        <el-col>
        </el-col>
        <el-col :span="18" style="padding-top: 30px;">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <!-- 第一页为院校简介 -->
            <el-tab-pane label="院校简介" name="first">
              <el-row :gutter="24">
                <el-col :span="8">
                  <img class="info-img" :src="webUrl + 'schoolimgs/schoolPictures/' + schoolData.banner_url"
                    alt="Logo Image" />
                </el-col>
                <el-col :span="16">
                  <el-row class="many-icon" style="display: flex;justify-content: space-evenly;">
                    <div>
                      <img src="/images/time.png" alt="">
                      <el-input :disabled="state" class="text" v-model="schoolData.created_year" style="width: 80px;"
                        placeholder="请输入" />
                    </div>
                    <div>
                      <img src="/images/school.png" alt="">
                      <el-input :disabled="state" class="text" v-model="schoolList.nature_type" style="width: 80px;"
                        placeholder="请输入" />
                    </div>
                    <div>
                      <img src="/images/apps.png" alt="">
                      <el-input :disabled="state" class="text" v-model="schoolList.categories" style="width: 80px;"
                        placeholder="请输入" />
                    </div>
                    <div>
                      <img src="/images/class.png" alt="">
                      <el-input :disabled="state" class="text" v-model="schoolList.belong" style="width: 80px;"
                        placeholder="请输入" />
                    </div>
                    <div>
                      <img src="/images/cup.png" alt="">
                      <el-input :disabled="state" class="text" v-model="schoolList.edu_level" style="width: 80px;"
                        placeholder="请输入" />
                    </div>
                    <div>
                      <img src="/images/location.png" alt="">
                      <el-input :disabled="state" class="text" v-model="schoolList.province_name" style="width: 80px;"
                        placeholder="请输入" />/ <el-input :disabled="state" class="text" v-model="schoolList.city_name"
                        style="width: 80px;" placeholder="请输入" />
                    </div>
                    <div>
                      <img src="/images/shuo.png" alt="">
                      <el-input :disabled="state" class="text" v-model="schoolData.points_of_shuo[0].number"
                        style="width: 80px;" placeholder="请输入" />
                    </div>
                    <div>
                      <img src="/images/bo.png" alt="">
                      <el-input :disabled="state" class="text" v-model="schoolData.points_of_bo[0].number"
                        style="width: 80px;" placeholder="请输入" />
                    </div>
                  </el-row>
                  <el-row style="display: block;margin: 10px;padding: 10px;">
                    <h1 style="color: rgb(148.6, 212.3, 117.1);margin-top: 0;">学校校训</h1>
                    <el-input :disabled="state" v-model="schoolData.motto" style="width: 100%;font-size: larger;"
                      :rows="1" placeholder="请输入" type="textarea" />
                  </el-row>
                </el-col>
                <el-col>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="16">
                  <h1>院校简介</h1>
                  <hr>
                  <el-input :disabled="state" v-model="schoolData.introduction" style="width: 100%;font-size: larger;"
                    :rows="12" placeholder="Please input" type="textarea" />

                </el-col>
                <el-col :span="8">
                  <shoolPlacecard :address="schoolData.address" :website="schoolData.website"
                    :zhao_ban_wz="schoolData.zhao_ban_wz" :zhao_ban_dh="schoolData.zhao_ban_dh" />
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="专业分数线" name="second">
              <scoreList :code="props.code" />
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col>
        </el-col>
      </el-row>
    </el-main>
  </el-container>

</template>
<script lang="ts" setup>
import { useUrlStore } from "@/stores/url";
const { webUrl } = useUrlStore()
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
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
  getSchoolInfoByCode();
  catchSchoolListByCode();
  state.value = !state.value
}
//提交修改

const updateChllageInfo = () => {
  axios.post('/index.php/Management/updateChllageList', {
    "updateSchoolList": schoolList.value, "updateSchoolData": schoolData.value
  })
    .then(response => { // 获取请求返回数据
      alert(response.data.message)
      state.value = true
      getSchoolInfoByCode();
      catchSchoolListByCode();
    })
    .catch(error => { // 捕获异常
      console.log(error)
    })
};




const props = defineProps({
  code: {
    type: String,
    required: true,
  }
});

interface shuo {
  disPlayName: string;
  number: number;
  type: string;
}
interface bo {
  disPlayName: string;
  number: number;
  type: string;
}
interface address {
  name: string;
  address: string;
  coordinate: string;
}
// 定义接口，指定字段类型
interface SchoolData {
  code: string;
  vr_url: string;
  address: address[];  // 存储为字符串，后续可以解析为 JSON 对象
  created_year: string;
  celebrate_day: string;
  introduction: string;
  en_name: string;
  motto: string;
  bx_level: string;
  points_of_shuo: shuo[];  // 存储为字符串，后续可以解析为 JSON 数组
  points_of_bo: bo[];    // 存储为字符串，后续可以解析为 JSON 数组
  star: string;
  banner_url: string;
  website: string;
  zhao_ban_wz: string;
  zhao_ban_dh: string;
}

const schoolData = ref<SchoolData>({
  code: '',
  vr_url: '',
  address: [{
    name: '',
    address: '',
    coordinate: '',
  }],
  created_year: '',
  celebrate_day: '',
  introduction: '',
  en_name: '',
  motto: '',
  bx_level: '',
  points_of_shuo: [{
    disPlayName: '',
    number: 0,
    type: '',
  }],
  points_of_bo: [{
    disPlayName: '',
    number: 0,
    type: '',
  }],
  star: '',
  banner_url: '',
  website: '',
  zhao_ban_wz: '',
  zhao_ban_dh: '',
});

const getSchoolInfoByCode = () => {
  axios.post('/index.php/SchoolInfo/getSchoolInfoByCode', {
    "code": props.code,
  })
    .then((response) => {
      if (response.data.status === 'success') {
        const data = response.data.data[0];
        // 将字段逐个赋值到 schoolData 对象
        schoolData.value = {
          code: data.code,
          vr_url: data.vr_url,
          address: JSON.parse(data.address),
          created_year: data.created_year,
          celebrate_day: data.celebrate_day,
          introduction: data.introduction,
          en_name: data.en_name,
          motto: data.motto,
          bx_level: data.bx_level,
          points_of_shuo: JSON.parse(data.points_of_shuo),
          points_of_bo: JSON.parse(data.points_of_bo),
          star: data.star,
          banner_url: data.banner_url,
          website: data.website,
          zhao_ban_wz: data.zhao_ban_wz,
          zhao_ban_dh: data.zhao_ban_dh,
        };
        console.log(schoolData.value.created_year);
        // 解析字符串并推送到数组
        // schoolData.value.address = JSON.parse(schoolData.value.address);
        // schoolData.value.points_of_shuo = JSON.parse(schoolData.value.points_of_shuo);
        // schoolData.value.points_of_bo = JSON.parse(schoolData.value.points_of_bo);

        console.log(schoolData.value.points_of_bo);  // 检查结果

      }
    })
    .catch((error) => {
      console.error("请求失败:", error);
    });
}

// 学校信息接口
interface School {
  code: string;
  gb_code: string;
  cn_name: string;
  logo_filename: string;
  nature_type: string;
  edu_level: string;
  belong: string;
  categories: string;
  features: string;  // 使用 string[] 类型来存储逗号分隔的多个值
  art_features: string;
  province_code: string;
  province_name: string;
  city_name: string;
  hits: number;  // 转换为数字类型
  ranking: number;  // 转换为数字类型
}

// 定义学校列表，初始值为一个空对象
const schoolList = ref<School>({
  code: '',
  gb_code: '',
  cn_name: '',
  logo_filename: '',
  nature_type: '',
  edu_level: '',
  belong: '',
  categories: '',
  features: '',  // 初始值为空数组
  art_features: '',
  province_code: '',
  province_name: '',
  city_name: '',
  hits: 0,  // 初始为 0
  ranking: 0,  // 初始为 0
});

const catchSchoolListByCode = () => {
  axios.post('/index.php/SchoolInfo/getSchoolListByCode', {
    "code": props.code,
  })
    .then((response) => {
      if (response.data.status === 'success') {
        const data = response.data.data[0];
        // 将字段逐个赋值到 schoolData 对象
        schoolList.value = {
          code: data.code,
          gb_code: data.gb_code,
          cn_name: data.cn_name,
          logo_filename: data.logo_filename,
          nature_type: data.nature_type,
          edu_level: data.edu_level,
          belong: data.belong,
          categories: data.categories,
          features: data.features,
          art_features: data.art_features,
          province_code: data.province_code,
          province_name: data.province_name,
          city_name: data.city_name,
          hits: data.hits,
          ranking: data.ranking,
        };
      }
    })
    .catch(error => {
      console.log(error);  // 捕获错误
    });
};
onMounted(() => {
  getSchoolInfoByCode();
  catchSchoolListByCode();
});



// // 格式化 introduction，将 \n 转换为 <br> 标签
// const formattedIntroduction = computed(() => {
//   return schoolData.value.introduction.replace(/\n/g, '<br>');
// });

//标签页
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

//导入地址组件
import shoolPlacecard from '@/components/User/shoolPlacecard/shoolPlacecard.vue';

//导入分数线组件
import scoreList from '@/components/User/scoreList/scoreList.vue';

</script>
<style scoped>

.many-icon div{
  display: flex;
  width: 100px;
  flex-direction: column;
  align-items: center;
}
.many-icon div img{
  width: 64px;
  height: 64px;
  align-items: center;
}
.many-icon div span{
  text-align: center;
}



.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.info-img{
    width: 400px;
  height: 250px;
}
.icon-img {
  width: 100px;
  height: 100px;
}
.text {
  font-size: large;
}
.features-class {
  border: 1px solid rgb(177.3, 179.4, 183.6);
  border-radius: 5px;
  font-size: small;
  color: rgb(177.3, 179.4, 183.6);
  margin: 2px;
}
.col-list > div:not(:last-child) {
  margin-bottom: 5px;
}
.onclick-style:hover {
  color: rgb(51.2, 126.4, 204);
}
.el-input{
  width: 100px;
}
</style>
