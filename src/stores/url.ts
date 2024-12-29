import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUrlStore = defineStore('defineUrl', () => {
  const webUrl = ref('http://127.0.0.1:8000/')
  return { webUrl }
})
