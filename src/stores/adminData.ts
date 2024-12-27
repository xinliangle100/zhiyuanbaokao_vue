import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAdminDataStore = defineStore(
  'adminData',
  () => {
    const adminId = ref('')
    const isLogin = computed(() => {
      if (adminId.value) {
        return true
      } else {
        return false
      }
    })

    function setAdminId(id: string) {
      adminId.value = id
    }

    return { adminId, isLogin, setAdminId }
  },
  {
    persist: { storage: sessionStorage },
  },
)
