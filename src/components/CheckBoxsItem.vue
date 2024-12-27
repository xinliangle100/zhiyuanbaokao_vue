<template>
  <div style="display: inline-flex; align-items: center;">
    <span style="font-size: medium;margin-right: 10px;">{{ props.title ? props.title : defaultTitle }}:</span>
    <el-checkbox-group v-model="checkedCities" :min="(props.min ? props.data : 0)" :max="props.max ? props.max : 2">
      <el-checkbox-button v-for="item in (props.data ? props.data : defaultData)" :key="item" :label="item"
        :value="item">
        {{ item }}
      </el-checkbox-button>
    </el-checkbox-group>

  </div>

</template>

<script lang="ts" setup name="CheckBoxsItem">
import { ref } from 'vue'
const checkedCities = ref([])
const defaultTitle = "默认标题"
const defaultData = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
const props = defineProps(["min", "max", "data", "title"])
</script>
