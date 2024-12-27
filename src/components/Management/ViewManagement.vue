<template>
  <el-row :gutter="24" justify="space-evenly" class="zhan-shi">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-row :gutter="20">
        <el-col :span="8">
          <h3>热门网站</h3>
          <el-row v-for="item in guangGao" :key="item.url">
            <el-image :src="item.url" style="width: 80%;height: 100px;" />
          </el-row>
        </el-col>
        <el-col :span="16">
          <h3>新闻资讯</h3>
          <hr>
          <el-row v-for="item in news" :key="item.id" class="news-style">
            <el-row style="font-size: xx-large;">{{ item.title }}</el-row>
            <el-row>
              <p>{{ item.main_info }}</p>
            </el-row>
            <el-row>
              <el-button @click="goUrl(item.url)">查看</el-button>
            </el-row>
          </el-row>
        </el-col>

      </el-row>
      <h3>高考工具箱</h3>
      <hr>
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in gongJvXiang" :key="item.name">
          <div style="margin: 10px;border: 1px,solid,gray;border-radius: 10px;padding: 10px">
            <el-row style="width: 100%;justify-content: center">
              <el-text class="mx-1" type="primary" style="font-size: 40px;">{{ item.name }}</el-text>
            </el-row>
            <el-row style="width: 100%;display: flex;    justify-content: space-evenly;">
              <el-button :disabled="!item.paper_url" type="success" plain
                @click="goUrl(item.paper_url)">试题查看</el-button>
              <el-button :disabled="!item.answer_url" type="success" plain
                @click="goUrl(item.answer_url)">答案查询</el-button>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <hr />
      <el-row>
        <h1>页面数据</h1>
        <el-row>
          <h3 style="margin: 0;">侧边广告栏:</h3>
        </el-row>
        <el-row>
          <el-col v-for="(item, index)  in guangGao" :key="item.id" :span="6">
            <span>广告栏{{ index + 1 }}连接</span>
            <el-input v-model="item.url" style="width: 240px" :disabled="state" placeholder="Please input" /></el-col>
        </el-row>
      </el-row>
      <hr>
      <el-row>
        <h1>新闻资讯</h1>
        <hr>
        <el-row>
          <h3 style="margin: 0;">侧边新闻栏:</h3>
        </el-row>
        <el-row>
          <el-col v-for="(item, index)  in news" :key="item.id" :span="8">
            <span>广告栏{{ index + 1 }}数据</span>
            <el-row class="center">
              <span>标题：</span>
              <el-input v-model="item.title" style="width: 200px" :disabled="state" placeholder="Please input" />
            </el-row>
            <el-row class="center">
              <span>简介：</span>
              <el-input v-model="item.main_info" style="width: 200px" :disabled="state" placeholder="Please input" />
            </el-row>
            <el-row class="center">
              <span>连接：</span>
              <el-input v-model="item.url" style="width: 200px" :disabled="state" placeholder="Please input" />
            </el-row>
          </el-col>
        </el-row>
      </el-row>
      <hr>
      <el-row>
        <el-row style="width: 100%;">
          <h1>试题管理</h1>
        </el-row>
        <el-row>
          <el-col :span="8" v-for="item in gongJvXiang" :key="item.name"
            style="width: 100%;border: 1px,solid,gray;border-radius: 5px;padding: 20px">
            <el-row style="width: 100%;">
              <h3>{{ item.name }}</h3>
            </el-row>
            <el-row class="center" style="margin: 10px;">
              <span>试题连接</span>
              <el-input v-model="item.paper_url" style="width: 200px" :disabled="state" placeholder="Please input" />
            </el-row>
            <el-row class="center" style="margin: 10px;">
              <span>答案连接</span>
              <el-input v-model="item.answer_url" style="width: 200px" :disabled="state" placeholder="Please input" />
            </el-row>
          </el-col>
        </el-row>

      </el-row>
      <el-form-item class="buttons">
        <el-button class="button" type="primary" auto-insert-space @click="changeState()">
          {{ changeText }}
        </el-button>
        <el-button @click="postAll()" class="button" type="primary" auto-insert-space>
          提交
        </el-button>
        <el-link type="info" :underline="false">
          ← 返回
        </el-link>
      </el-form-item>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>

</template>
<script lang="ts" setup name="name">
//工具箱
const goUrl = (url: string) => {
  console.log(url);

  window.open(url, "_blank")
}
const gongJvXiang = ref([
  {
    name: "语文",
    paper_url: 'http://127.0.0.1:8000/paper/语文试题.pdf',
    answer_url: 'http://127.0.0.1:8000/paper/语文答案.pdf',
  }, {
    name: "数学",
    paper_url: 'http://127.0.0.1:8000/paper/数学试题.pdf',
    answer_url: 'http://127.0.0.1:8000/paper/数学答案.pdf',
  }, {
    name: "英语",
    paper_url: 'http://127.0.0.1:8000/paper/英语试题.pdf',
    answer_url: 'http://127.0.0.1:8000/paper/英语答案.pdf',
  }, {
    name: "物理",
    paper_url: 'http://127.0.0.1:8000/paper/物理试题.pdf',
    answer_url: 'http://127.0.0.1:8000/paper/物理答案.pdf',
  }, {
    name: "化学",
    paper_url: 'http://127.0.0.1:8000/paper/化学试题.pdf',
    answer_url: 'http://127.0.0.1:8000/paper/化学答案.pdf',
  },
  {
    name: "生物",
    paper_url: 'http://127.0.0.1:8000/paper/生物试题.pdf',
    answer_url: 'http://127.0.0.1:8000/paper/生物答案.pdf',
  },
  {
    name: "历史",
    paper_url: 'http://127.0.0.1:8000/paper/历史试题.pdf',
    answer_url: '',
  },
  {
    name: "地理",
    paper_url: 'http://127.0.0.1:8000/paper/地理答案.pdf',
    answer_url: 'http://127.0.0.1:8000/paper/地理答案.pdf',
  },
  {
    name: "政治",
    paper_url: '',
    answer_url: '',
  },
])
const news = ref([
  {
    "title": "标题",
    "main_info": "去bilibili",
    "url": "https://www.bilibili.com/",
    "id": "0001"
  },
  {
    "title": "教育厅公示!东方理工大学，要来了",
    "main_info": "　11月18日，浙江教育厅网站发布公示，将新设宁波东方理工大学(暂名)，公示时间为2024年11月18日至2024年11月22日。此次公示标志着宁波东方理工大学(暂名)的建设进入新的关键阶段。",
    "url": "https://gaokao.eol.cn/daxue/zixun/202411/t20241119_2642379.shtml?proId=13",
    "id": "0002"
  },
  {
    "title": "思想引领 铸魂育人——高校党的建设与思想政治工作开创新局面",
    "main_info": "党的十八大以来，以习近平同志为核心的党中央高度重视高校党的建设，习近平总书记先后作出一系列重要论述，深刻阐明了加强高校党建工作的方向性、根本性问题，为推进高校党的建设提供了根本遵循。",
    "url": "http://www.moe.gov.cn/jyb_xwfb/s5147/202412/t20241218_1167551.html",
    "id": "0003"
  }
])
const guangGao = ref([
  {
    "id": "0001",
    "url": "http://127.0.0.1:8000/guanggao/img_1.png"
  },
  {
    "id": "0002",
    "url": "http://127.0.0.1:8000/guanggao/img_2.png"
  },
  {
    "id": "0003",
    "url": "http://127.0.0.1:8000/guanggao/img_3.png"
  },
  {
    "id": "0004",
    "url": "http://127.0.0.1:8000/guanggao/img_4.png"
  }
])
function getNews() {
  axios
    .get('index.php/Management/getAllNews')
    .then(response => {
      news.value = response.data.data
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}
function getGongJvXiang() {
  axios
    .get('index.php/Management/getGongJvXiang')
    .then(response => {
      gongJvXiang.value = response.data.data
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}
function getAllGuangGao() {
  axios
    .get('index.php/Management/getAllGuangGao')
    .then(response => {
      guangGao.value = response.data.data
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}
onMounted(() => {
  getGongJvXiang()
  getNews()
  getAllGuangGao()
})
function getAllInfo() {
  getGongJvXiang()
  getNews()
  getAllGuangGao()
}

import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
const changeState = () => {
  state.
    value = !state.value
}
const changeText = computed(() => {
  if (state.value) {
    getAllInfo();
    return '更改'
  } else {
    return '取消更改'
  }
})
const state = ref(true)
function postAll() {
  axios
    .post('index.php/Management/postAll', { "guangGao": guangGao.value, "news": news.value, "gongJvXiang": gongJvXiang.value })
    .then(response => {
      alert(response.data.message)
      getAllInfo()
      state.value = true
    })
    .catch(error => {
      console.error('There was an error!', error)
    })
}

</script>
<style scoped>

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
.news-style .el-row{
width: 100%;
margin: 0
}
.news-style {
padding: 10px;
border: 2px,solid,gray;
border-radius: 5px;
}
.el-row{
  width: 100%;
}
.center{
  display: flex;
      align-items: center;
}
</style>
