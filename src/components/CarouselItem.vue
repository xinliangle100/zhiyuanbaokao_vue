<template>
  <div class="block text-center">
    <el-carousel>
      <el-carousel-item v-for="item in src" :key="item">
        <img :src="item" alt="" style="width: 100%;">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script lang="ts" setup name="CarouselItem">

import xzps from '@/assets/images/lunBo1/xzps.png';
import jnps from '@/assets/images/lunBo1/jnps.jpg';
import gjps1 from '@/assets/images/lunBo1/gjps1.jpg';
const src = [xzps, jnps, gjps1]
</script>
<style scoped>
img{
max-height: 100%;
width: auto;
min-height: 100%;


}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
