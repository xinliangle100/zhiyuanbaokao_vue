<template>
  <el-autocomplete v-model="state" :fetch-suggestions="querySearchAsync" placeholder="Please input"
    @select="handleSelect">
    <template #suffix>
      <el-icon>
        <Search />
      </el-icon>
    </template>
  </el-autocomplete>

</template>

<script lang="ts" setup name="AutocompleteItem">
import { onMounted, ref } from 'vue'

const props = defineProps(["searchUrl"])
const state = ref('')

interface LinkItem {
  value: string
  link: string
}

const links = ref<LinkItem[]>([])

const loadAll = () => {
  return [
    { value: props.searchUrl, link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },

  ]
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
  links.value = loadAll()
})
</script>
