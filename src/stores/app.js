import { defineStore } from 'pinia'

// 定义一个名称为 app的 Store 叫 useAppStore
export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarCollapsed: false,
    loading: false,
    tabs: [
      {
        title: '工作台',
        path: '/dashboard'
      }
    ]
  }),
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    setLoading(loading) {
      this.loading = loading
    }
  }
})
