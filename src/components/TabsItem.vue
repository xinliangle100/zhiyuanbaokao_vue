<script lang="ts" setup name="TabsItem">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
//导入多选框
import CheckBoxsItem from '@/components/CheckBoxsItem.vue';
const secondData = ref(["化学", "生物", "政治", "地理",])
const firstData = ref(["物理", "历史"])

//分数,位次转换
import { Calendar, Location } from '@element-plus/icons-vue'
const inputScore = ref('')
const inputScorRanking = ref('')


</script>
<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="普通类" name="first">
      <el-card>
        <el-row>
          <CheckBoxsItem :data="firstData" :max="1" :min="0" title="首选" />
        </el-row>
        <el-row>
          <CheckBoxsItem :data="secondData" :max="2" :min="0" title="次选" />
        </el-row>
        <el-row :gutter="2">
          <el-col :span="4">
            <span style="font-size: medium;">分数:</span>
          </el-col>
          <el-col :span="10"><el-input v-model="inputScore" style="width: 120px" placeholder="填写分数"
              :suffix-icon="Calendar" /></el-col>
          <el-col :span="10"> <el-input v-model="inputScorRanking" style="width: 120px" placeholder="填写名次"
              :prefix-icon="Location" /></el-col>
        </el-row>
        <el-row justify="center">
          <div class="mb-4">
            <el-button type="success" size="large">智能填报</el-button>
          </div>
        </el-row>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="艺术类" name="second">未实装</el-tab-pane>
  </el-tabs>
</template>


<style>
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
.text{
  font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC',
  'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  font-size: medium;
}

</style>
