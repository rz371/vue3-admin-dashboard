import { defineStore } from 'pinia'

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
