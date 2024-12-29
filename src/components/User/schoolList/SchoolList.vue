<template>
  <SchoolListCard v-for="(school) in data" :key="school.code"
    :logo_url="webUrl + 'schoolimgs/schoolIcon/' + school.logo_filename" :cn_name="school.cn_name"
    :features="school.features" :province_name="school.province_name" :city_name="school.city_name"
    :categories="school.categories" :belong="school.belong" :hits="school.hits" :rank="school.ranking"
    :code="school.code" />
</template>
<script lang="ts" setup name="name">
import { useUrlStore } from "@/stores/url";
const { webUrl } = useUrlStore()
//导入学校卡片
import { onMounted, ref, watch } from 'vue';
import SchoolListCard from './SchoolListCard.vue';
import axios from 'axios';
// import { delay } from 'lodash';
const { propSelectedProvince, propSelectLableNames, propSearchKey } = defineProps(['propSelectedProvince', 'propSelectLableNames', 'propSearchKey'])

interface School {
  code: string;
  gb_code: string;
  cn_name: string;
  logo_filename: string;
  nature_type: string;
  edu_level: string;
  belong: string;
  categories: string;
  features: string;  // 如果features是逗号分隔的多个值，可以考虑使用string[]类型
  art_features: string;
  province_code: string;
  province_name: string;
  city_name: string;
  hits: string;  // 如果需要转换为数字，可以改为number类型
  ranking: number;  // 如果需要数字，可以改为number类型
}
const totalSchool = defineModel('totalSchool', {
  default: 0, // 可选，设置默认值
});

const data = ref<School[]>([]);   // 用于存储学校数据

const currentPage = ref(1);  // 当前页数
watch(currentPage, async (newQuestion, oldQuestion) => {
  console.log(oldQuestion + '=>' + newQuestion);
})

let isLoading = false; // 防止重复请求
const catchSchoolByQuery = (page: number) => {
  if (isLoading) return; // 防止重复请求
  isLoading = true; // 设置为正在加载
  axios.post('/index.php/User/getSchoolByQuery', {
    "selectedProvince": propSelectedProvince,
    "selectLableNames": propSelectLableNames,
    "searchKey": propSearchKey,
    "page": page,        // 页码
    "pageSize": 20       // 每页条数
  })
    .then(response => {
      isLoading = false; // 请求完成后恢复状态
      if (response.data.status == successCode) {
        totalSchool.value = response.data.total
        // 处理返回的学校数据
        if (page === 1) {
          data.value = response.data.data
        } else {
          data.value.push(...response.data.data);  // 否则，追加新数据
        }
        // 检查是否有更多数据，假设返回的总页数可以帮助判断是否继续加载
        if (response.data.page < response.data.totalPages) {
          currentPage.value = page
        } else {
          currentPage.value = page
          console.log("没有更多数据了");
          isLoading = true;//禁止请求
        }
      } else {
        console.log(response.data.message);
      }
    })
    .catch(error => {
      isLoading = true;
      console.log(error);  // 捕获错误
    });
};
// 监听 propSelectedProvince, propSelectLableNames 和 propSearchKey 的变化
watch(
  [() => propSelectedProvince, () => propSelectLableNames, () => propSearchKey],
  () => {
    (() => {
      isLoading = true; // 设置为正在加载
      axios.post('/index.php/User/getSchoolByQuery', {
        "selectedProvince": propSelectedProvince,
        "selectLableNames": propSelectLableNames,
        "searchKey": propSearchKey,
        "page": 1,        // 页码
        "pageSize": 20       // 每页条数
      })
        .then(response => {
          totalSchool.value = response.data.total
          isLoading = false; // 请求完成后恢复状态
          if (response.data.status == successCode) {
            console.log({
              "selectedProvince": propSelectedProvince,
              "selectLableNames": propSelectLableNames,
              "searchKey": propSearchKey,
              "page": 1
            });
            data.value = response.data.data
            currentPage.value = 1;  // 更新当前页
            console.log(response.data.message);
          }
        })
        .catch(error => {
          isLoading = false;
          console.log(error);  // 捕获错误
        });
    })()
  }, {
  deep: true // 设置深度监听
}
);
// 添加滚动监听事件
const onScroll = () => {
  // 获取滚动条位置和页面高度
  const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // 判断是否滚动到页面底部
  if (scrollPosition + windowHeight >= documentHeight - 50) {
    // 当距离底部 50px 内时，加载下一页
    catchSchoolByQuery(currentPage.value + 1);

  }
};

// // 初始化时，加载第一页数据
// catchSchoolByQuery(currentPage.value);

// 监听滚动事件
window.addEventListener('scroll', onScroll);

onMounted(() => {
  catchSchoolByQuery(1);
});
const successCode = 'success'

</script>
<style>

</style>
