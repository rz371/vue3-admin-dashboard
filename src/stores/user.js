import { defineStore } from 'pinia' // 定义store

import { loginApi } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

// 定义一个名称为 user的 Store 叫 useUserStore
export const useUserStore = defineStore('user', {
  // state 状态数据
  state: () => ({
    token: getToken(),
    profile: null, // 用户信息对象
    roles: [],
    menus: []
  }),
  // 计算属性
  getters: {
    // 根据有没有token判断用户是否已经登录
    isLoggedIn: (state) => Boolean(state.token)
  },
  // 操作方法
  actions: {
    async login(form) {
      const data = await loginApi(form)

      this.token = data.token
      this.profile = data.user
      this.roles = data.user?.roles || []
      setToken(data.token)

      return data
    },
    logout() {
      this.token = ''
      this.profile = null
      this.roles = []
      this.menus = []
      removeToken()
    }
  }
})
