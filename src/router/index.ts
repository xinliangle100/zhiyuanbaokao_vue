import { createRouter, createWebHistory } from 'vue-router'
import UserMainView from '@/views/UserMainView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminLoginView from '@/views/AdminLoginView.vue'
import ManagementView from '@/views/ManagementView.vue'
import CollageInfo from '@/views/CollageInfo.vue'
import UserPage from '@/views/UserPage.vue'
import MajorInfoPage from '@/views/MajorInfoPage.vue'
import CollageChange from '@/views/CollageChange.vue'
import MajorChange from '@/views/MajorChange.vue'
import { useAdminDataStore } from '@/stores/adminData'
import { storeToRefs } from 'pinia'
import ChatGpt from '@/components/User/ChatGpt.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/LoginView',
      name: 'LoginView',
      component: LoginView,
    },
    {
      path: '/',
      name: 'UserMainView',
      component: UserMainView,
    },
    {
      path: '/adminLoginView',
      name: 'AdminLoginView',
      component: AdminLoginView,
    },
    {
      path: '/CollageInfo/:code',
      name: 'CollageInfo',
      component: CollageInfo,
      props: true,
    },
    {
      path: '/MajorInfo/:code',
      name: 'MajorInfo',
      component: MajorInfoPage,
      props: true,
    },
    {
      path: '/userPage',
      name: 'userPage',
      component: UserPage,
      props: true,
    },
    {
      path: '/CollageChange/:code',
      name: 'CollageChange',
      component: CollageChange,
      props: true,
    },
    {
      path: '/managementView',
      name: 'ManagementView',
      component: ManagementView,
    },
    {
      path: '/MajorChange/:code',
      name: 'MajorChange',
      component: MajorChange,
      props: true,
    },
    {
      path: '/ChatGpt',
      name: 'ChatGpt',
      component: ChatGpt,
      props: true,
    },
  ],
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const adminStore = useAdminDataStore()
  const { isLogin } = storeToRefs(adminStore) // 获取 isLogin 状态
  console.log(isLogin.value)

  // 确保在 store 已加载并初始化之后再判断登录状态
  if (
    (to.name == 'CollageChange' ||
      to.name == 'ManagementView' ||
      to.name == 'MajorChange') &&
    !isLogin.value
  ) {
    // 未登录，重定向到登录页面
    next({ name: 'AdminLoginView' })
  } else {
    // 已登录或无需登录，继续路由
    next()
  }
})

export default router
