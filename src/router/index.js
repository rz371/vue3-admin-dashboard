import { createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginView.vue'),
    meta: {
      title: '登录',
      public: true
    }
  },
  {
    path: '/',
    // 自动加载 AdminLayout 布局，
    component: () => import('@/layouts/AdminLayout.vue'),
    // 自动重定向到 dashboard
    redirect: '/dashboard',
    isPublic: true, // 显示在左侧
    // 子页面会渲染到 AdminLayout 的 <router-view> 中
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: {
          title: '首页',
          isPublic: true
        }
      },
      {
        path: '403',
        name: 'Forbidden',
        component: () => import('@/views/error/ForbiddenView.vue'),
        meta: {
          title: '无权限'
        }
      },
      {
        path: '404',
        name: 'NotFound',
        component: () => import('@/views/error/NotFoundView.vue'),
        meta: {
          title: '页面不存在'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  const appTitle = import.meta.env.VITE_APP_TITLE || 'Admin System'

  document.title = to.meta.title ? `${to.meta.title} - ${appTitle}` : appTitle

  if (to.meta.public) {
    return userStore.isLoggedIn && to.path === '/login' ? '/dashboard' : true
  }

  if (!userStore.isLoggedIn) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
  }

  return true
})

export default router
