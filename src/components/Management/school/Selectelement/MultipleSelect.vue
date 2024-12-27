<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="2">
        <p>{{ title }}:</p>
      </el-col>
      <el-col :span="22">
        <el-checkbox-group v-model="selectedItems" @change="handleChange" class="checkbox-group">
          <el-checkbox-button :value="'不限'" class="disperse" @click="selectUnlimit">
            不限
          </el-checkbox-button>
          <el-checkbox-button v-for="item in propItems" :key="item" :value="item" class="disperse">
            {{ item }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-col>
    </el-row>

  </div>
</template>
<script lang="ts" setup>


const { title, propItems } = defineProps(['title', 'propItems'])

// const checkboxGroup = ref(groupKey)

// 定义选项数据
const selectedItems = defineModel('selectData', {
  default: ['不限'], // 可选，设置默认值
});

//选择不限
const selectUnlimit = () => {
  selectedItems.value = ["不限"];
}
// 处理选项变化的逻辑
const handleChange = () => {
  if (selectedItems.value.includes("不限") && selectedItems.value.length > 0) {
    // 如果“不限”与其他选项同时被选中，取消其他选项
    selectedItems.value.shift();
  } else if (!selectedItems.value.includes("不限") && selectedItems.value.length === 0) {
    // 如果其他选项全部取消，重新选中“不限”
    selectedItems.value = ["不限"];
  }
};
// // 监听选项变化（可选）
// watch(selectedItems, (newVal) => {
//   console.log("选中项发生变化:", newVal);
// });



</script>

<style scoped>
.demo-button-style {
  margin-top: 24px;
}
.disperse{
  margin: 5px;
  border: rgb(121.3, 187.1, 255),solid,1px;
  border-radius: 2px;

}

</style>
