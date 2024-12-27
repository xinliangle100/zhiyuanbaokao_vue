<template>
  <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="Please input"
    @select="handleSelect" />
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, ref } from 'vue'

const state = ref('')

interface LinkItem {
  value: string
  link: string
}

const links = ref<LinkItem[]>([])

const loadAll = () => {
  axios.get('/index.php/User/getAllMajor3',)
    .then(response => { // 获取请求返回数据
      if (response.data.status == 'success') {
        links.value = response.data.data
      } else (
        alert(response.data.message)
      )

    })
    .catch(error => { // 捕获异常
      console.log(error)
    })
}

let timeout: ReturnType<typeof setTimeout>
const querySearchAsync = (queryString: string, cb: (arg: unknown) => void) => {
  const results = queryString
    ? links.value.filter(createFilter(queryString))
    : links.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 3000 * Math.random())
}
const createFilter = (queryString: string) => {
  return (restaurant: LinkItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

const handleSelect = (item: Record<string, unknown>) => {
  console.log(item)
}

onMounted(() => {
  loadAll();
})
</script>
