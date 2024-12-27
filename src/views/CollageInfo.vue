<template>

  <el-container>
    <el-header :gutter="24" style="padding-top: 50px;padding-bottom: 30px;height: 150px;">
      <el-row>
        <el-col :span="2" :offset="3" style="display: flex; justify-content: center; align-items:center;">
          <img class="icon-img" :src="'http://127.0.0.1:8000/schoolimgs/schoolIcon/' + schoolList.logo_filename"
            alt="Logo Image" />
        </el-col>
        <el-col :span="14" class="col-list">
          <el-row>
            <span class="text onclick-style">{{ schoolList.cn_name }}</span>
          </el-row>
          <el-row>
            <span v-for="item in newfeatures" :key="item" class="features-class">
              {{ item }}
            </span>
          </el-row>
          <el-row>
            {{ schoolList.province_name }} {{ schoolList.city_name }} / {{ schoolList.categories }} / {{
              schoolList.belong
            }}
          </el-row>
        </el-col>
        <el-col :span="4" class="col-list"></el-col>
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
                  <img class="info-img"
                    :src="'http://127.0.0.1:8000/schoolimgs/schoolPictures/' + schoolData.banner_url"
                    alt="Logo Image" />
                </el-col>
                <el-col :span="16">
                  <el-row class="many-icon" style="display: flex;justify-content: space-evenly;">
                    <div v-if="schoolData.created_year">
                      <img src="/images/time.png" alt="">
                      <span class="text">{{ schoolData.created_year }}年</span>
                    </div>
                    <div v-if="schoolList.nature_type">
                      <img src="/images/school.png" alt="">
                      <span class="text">{{ schoolList.nature_type }}</span>
                    </div>
                    <div v-if="schoolList.categories">
                      <img src="/images/apps.png" alt="">
                      <span class="text">{{ schoolList.categories }}</span>
                    </div>
                    <div v-if="schoolList.belong">
                      <img src="/images/class.png" alt="">
                      <span class="text">{{ schoolList.belong }}</span>
                    </div>
                    <div v-if="schoolList.edu_level">
                      <img src="/images/cup.png" alt="">
                      <span class="text">{{ schoolList.edu_level }}</span>
                    </div>
                    <div v-if="schoolList.province_name && schoolList.city_name">
                      <img src="/images/location.png" alt="">
                      <span class="text">{{ schoolList.province_name }}/{{ schoolList.city_name }}</span>
                    </div>
                    <div v-if="schoolData.points_of_shuo[0]">
                      <img src="/images/shuo.png" alt="">
                      <span class="text">{{ schoolData.points_of_shuo[0].number }}</span>
                    </div>
                    <div v-if="schoolData.points_of_bo[0]">
                      <img src="/images/bo.png" alt="">
                      <span class="text">{{ schoolData.points_of_bo[0].number }}</span>
                    </div>
                  </el-row>
                  <el-row style="display: block;margin: 10px;padding: 10px;">
                    <h1 style="color: rgb(148.6, 212.3, 117.1);">学校校训</h1>
                    <p class="text">{{ schoolData.motto }}</p>
                  </el-row>
                </el-col>
                <el-col>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="16">
                  <h1>院校简介</h1>
                  <hr>
                  <p class="text" v-html="formattedIntroduction"></p>
                </el-col>
                <el-col :span="8">

                  <shoolPlacecard :address="schoolData.address" :website="schoolData.website"
                    :zhao_ban_wz="schoolData.zhao_ban_wz" :zhao_ban_dh="schoolData.zhao_ban_dh" />
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="专业分数线" name="second">
              <el-row style="align-items: center;"> <el-col :span="1"
                  style="text-align: center;justify-self: center;">年份:</el-col>
                <el-col :span="3">
                  <el-select v-model="selectedYear" :placeholder="opinions[0]" style="width: 240px">
                    <el-option v-for="(item, index) in opinions" :key="index" :label="item" :value="item" />
                  </el-select>
                </el-col>
              </el-row>
              <component :is="currentComponent" :code="props.code" />
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
const opinions = ref(['2022', '2023', '2024'])
const selectedYear = ref('2024')
const currentComponent = ref(scoreList)
//切换页面
const handleSelect = (key: string) => {
  switch (key) {
    case '2024':
      currentComponent.value = scoreList
      break
    case '2023':
      currentComponent.value = scoreList2023
      break
    case '2022':
      currentComponent.value = scoreList2022
      break
    default:
      currentComponent.value = scoreList
  }
}
watch(() => selectedYear.value, (newValue) => {
  handleSelect(newValue)
})
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
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
// 确保 features 存在并且可以 split，初始化 newfeatures 数组
const newfeatures = ref<string[]>([]);


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


        // 判断 features 是否是有效字符串，若有效则拆分成数组
        if (schoolList.value.features && typeof schoolList.value.features === 'string') {
          newfeatures.value = schoolList.value.features.split(','); // 将字符串按逗号分割成数组
        } else {
          newfeatures.value = []; // 如果 features 无效，则设置为一个空数组
        }

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


// 格式化 introduction，将 \n 转换为 <br> 标签
const formattedIntroduction = computed(() => {
  return schoolData.value.introduction.replace(/\n/g, '<br>');
});

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
import scoreList2022 from '@/components/User/scoreList/scoreList2022.vue';
import scoreList2023 from '@/components/User/scoreList/scoreList2023.vue';
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
</style>
