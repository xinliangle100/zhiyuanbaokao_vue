<template>
  <el-row :gutter="24">
    <el-col :span="4" style="display: flex; justify-content: center; align-items: center;">
      <img :src="logo_url" alt="Logo Image" />
    </el-col>
    <el-col :span="8" class="col-list">
      <el-row>
        <span class="text onclick-style" @click="goCollageInfo">{{ cn_name }}</span>
      </el-row>
      <el-row>
        <span v-for="item in newfeatures" :key="item" class="features-class">
          {{ item }}
        </span>
      </el-row>
      <el-row>
        {{ province_name }} {{ city_name }} / {{ categories }} / {{ belong }}
      </el-row>
    </el-col>
    <el-col :span="5" class="col-list">
      <el-row>
        <span class="text">排名</span>
      </el-row>
      <el-row>
        第{{ finalRank }}名
      </el-row>
    </el-col>
    <el-col :span="5" class="col-list">
      <el-row>
        <span class="text">热度</span>
      </el-row>
      <el-row>
        {{ hits }}万
      </el-row>
    </el-col>
    <el-col :span="2" class="col-list">
      <div class="mb-4">
        <el-button type="primary" @click="goCollageChangePage">修改信息</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup name="name">
import { defineProps, ref } from 'vue';

const props = defineProps({
  logo_url: {
    type: String,
    required: true,
  },
  cn_name: {
    type: String,
    required: true,
  },
  features: {
    type: String,
    required: true,
  },
  province_name: {
    type: String,
    required: true,
  },
  city_name: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  belong: {
    type: String,
    required: true,
  },
  hits: {
    type: String,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  }
});

// 确保 features 存在并且可以 split，初始化 newfeatures 数组
const newfeatures = ref<string[]>([]);

// 判断 features 是否是有效字符串，若有效则拆分成数组
if (props.features && typeof props.features === 'string') {
  newfeatures.value = props.features.split(','); // 将字符串按逗号分割成数组
} else {
  newfeatures.value = []; // 如果 features 无效，则设置为一个空数组
}

// 转入学校详细信息页面
const goCollageInfo = () => {
  window.open(`/CollageInfo/${props.code}`, '_blank'); // -> /user/eduardo
}
// 转入修改学校信息页面
const goCollageChangePage = () => {
  window.open(`/CollageChange/${props.code}`, '_blank'); // -> /user/eduardo
}
const finalRank = ref('--')
if (props.rank === 9999) {
  finalRank.value = '--';  // 如果是 9999，显示 '--'
} else if (typeof props.rank === 'number' && !isNaN(props.rank)) {
  finalRank.value = String(props.rank);  // 如果是有效数字，转换为字符串
} else {
  finalRank.value = '--';  // 如果不是有效数字，设置为默认值 '--'
}


</script>

<style scoped>

img {
  width: 72px;
  height: 72px;
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
