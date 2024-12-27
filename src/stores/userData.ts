import { defineStore } from 'pinia'
import axios from 'axios'
interface typeUserInfo {
  username: string
  userpassword: string
  sex: string
  birthday: string
  intro: string
  phone: string
  userid: string
  score: number
}

import { computed, ref } from 'vue'
export const useUserDataStore = defineStore(
  'userData',
  () => {
    const userId = ref('')
    const isLogin = computed(() => {
      if (userId.value) {
        return true
      } else {
        return false
      }
    })
    const userInfo = ref<typeUserInfo>({
      username: '',
      userpassword: '',
      sex: '',
      birthday: '',
      intro: '',
      phone: '',
      userid: '',
      score: 0,
    })
    // 登录提交
    function getUserInfoById() {
      axios
        .post('index.php/User/getUserInfoById', { userId: userId.value })
        .then(response => {
          console.log(response.data.data[0])
          userInfo.value = {
            username: response.data.data[0].username,
            userpassword: response.data.data[0].userpassword,
            sex: response.data.data[0].sex,
            birthday: response.data.data[0].birthday,
            intro: response.data.data[0].intro,
            phone: response.data.data[0].id,
            userid: response.data.data[0].id,
            score: response.data.data[0].score,
          }
        })
        .catch(error => {
          console.error('There was an error!', error)
        })
    }
    function setUserId(id: string) {
      userId.value = id
      getUserInfoById()
    }

    function getUserName() {
      getUserInfoById()
      return userInfo.value.username
    }

    return { userId, isLogin, setUserId, userInfo, getUserName }
  },
  {
    persist: { storage: sessionStorage },
  },
)
