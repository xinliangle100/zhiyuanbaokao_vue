<template>
  <el-container style="height: 500px; flex-direction: column;">
    <el-row :gutter="24" style="border: 5px,solid,rgb(196, 86.4, 86.4);border-width: 0 0 0 5px;align-items: center;">
      <el-col :span="8">
        <h1>选择校区</h1>
      </el-col>
      <el-col :span="16">
        <el-select v-model="pageValue" :placeholder="props.address[0]?.name" style="width: 240px">
          <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.key" />
        </el-select>
      </el-col>
    </el-row>
    <el-row class="card-item-center" style="border: 2px,solid,gray;border-radius: 5px;width: 100%;">
      <div>
        <el-icon>
          <Location />
        </el-icon>
        <span>
          {{ computedPlaceholder }}
        </span>
      </div>
      <div>
        <el-icon>
          <Phone />
        </el-icon>
        <span v-for="item in props.zhao_ban_dh.split(' ,')" :key="item">
          {{ item }}&nbsp;
        </span>
      </div>
      <div>
        <el-icon>
          <ChromeFilled />
        </el-icon>
        <span>
          <a :href="props.zhao_ban_wz" target="_blank"> {{ props.zhao_ban_wz }}</a>
        </span>
      </div>
    </el-row>
  </el-container>
</template>
<script lang="ts" setup name="name">
import { ref, watch, defineProps, type PropType, onMounted, computed } from 'vue';

type typeAddress = {
  name: string;
  address: string;
  coordinate: string;
};

type typeOption = {
  key: string;
  value: string;
};

// 获取 props 数据
const props = defineProps({
  address: {
    type: Array as PropType<typeAddress[]>,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  zhao_ban_wz: {
    type: String,
    required: true,
  },
  zhao_ban_dh: {
    type: String,
    required: true,
  },
});

const pageValue = ref<string>('0'); // 默认选择值为字符串类型

// 初始化 options 数组
const options = ref<typeOption[]>([]);

// 在 onMounted 中处理数据填充
onMounted(() => {
  // 遍历 props.address 填充 options
  props.address.forEach((propsItem, index) => {
    options.value.push({
      key: String(index), // 将 index 转换为字符串作为 key
      value: propsItem.name, // 使用 name 作为 value
    });
  });
  console.log('Options updated:', options.value);
});

// 使用 watch 监听 props.address 的变化
watch(
  () => props.address,
  () => {
    options.value = []; // 重置 options
    props.address.forEach((propsItem, index) => {
      options.value.push({
        key: String(index),
        value: propsItem.name,
      });
    });
    console.log('Options updated via watch:', options.value);
  },
  { immediate: true } // 确保组件加载时就执行一次
);

const computedPlaceholder = computed(() => {
  return props.address[Number(pageValue.value) ? Number(pageValue.value) : 0].address
});

</script>
<style scoped>

</style>
<style scoped>
.el-container{
  align-items: center;
  flex-direction: column;

}

.card-item-center div{
  margin: 10px;
  width: 100%;
    display: flex;
    align-items: center;
}
.card-item-center div .el-icon{
color: blue;
margin: 0 10px 0 5px;
}


.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
/* 下面为elementcss */
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-left: 10%;
}

.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}
.my-autocomplete li .highlighted .addr {
  color: #ddd;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
