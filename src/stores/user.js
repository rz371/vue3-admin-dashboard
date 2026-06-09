import { defineStore } from 'pinia'

import { loginApi } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    profile: null,
    roles: [],
    menus: []
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.token)
  },
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
