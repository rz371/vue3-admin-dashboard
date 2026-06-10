<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Avatar,
  Document,
  Expand,
  Fold,
  House,
  List,
  Setting,
  SwitchButton,
  User
} from '@element-plus/icons-vue'

import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const activeMenu = computed(() => route.path)
const iconMap = {
  Avatar,
  Document,
  House,
  List,
  Setting,
  User
}

function normalizePath(parentPath, path) {
  if (path.startsWith('/')) return path
  if (!parentPath || parentPath === '/') return `/${path}`
  return `${parentPath}/${path}`
}

function formatMenuRoutes(routes, parentPath = '') {
  return routes
    .filter(item => item.meta?.isPublic)
    .map((item) => {
      const fullPath = normalizePath(parentPath, item.path)
      return {
        ...item,
        fullPath,
        children: item.children ? formatMenuRoutes(item.children, fullPath) : []
      }
    })
}

const routersList = computed(() => {
  const layoutRoute = router.options.routes.find(item => item.isPublic)
  return layoutRoute?.children ? formatMenuRoutes(layoutRoute.children) : []
})

function getMenuIcon(icon) {
  return iconMap[icon] || House
}

function handleLogout() {
  userStore.logout()
  router.replace('/login')
}
</script>

<template>
  <el-container class="admin-layout">
    <el-aside :width="appStore.sidebarCollapsed ? '64px' : '220px'" class="admin-layout__aside">
      <div class="admin-layout__brand">
        <span class="admin-layout__brand-mark">S</span>
        <span v-if="!appStore.sidebarCollapsed" class="admin-layout__brand-name">智能运营管理平台</span>
      </div>

      <el-menu
        router
        :default-active="activeMenu"
        :collapse="appStore.sidebarCollapsed"
        class="admin-layout__menu"
      >
        <template v-for="item in routersList" :key="item.fullPath">
          <el-sub-menu v-if="item.children?.length" :index="item.fullPath">
            <template #title>
              <el-icon>
                <component :is="getMenuIcon(item.meta?.icon)" />
              </el-icon>
              <span>{{ item.meta?.title || item.path }}</span>
            </template>

            <el-menu-item v-for="child in item.children" :key="child.fullPath" :index="child.fullPath">
              <el-icon>
                <component :is="getMenuIcon(child.meta?.icon)" />
              </el-icon>
              <template #title>{{ child.meta?.title || child.path }}</template>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item v-else :index="item.fullPath">
            <el-icon>
              <component :is="getMenuIcon(item.meta?.icon)" />
            </el-icon>
            <template #title>{{ item.meta?.title || item.path }}</template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="admin-layout__header">
        <el-button text :icon="appStore.sidebarCollapsed ? Expand : Fold" @click="appStore.toggleSidebar" />

        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ route.meta.title || '页面' }}</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="admin-layout__actions">
          <span class="admin-layout__user">{{ userStore.profile?.name || 'admin' }}</span>
          <el-button type="danger" text :icon="SwitchButton" @click="handleLogout">退出</el-button>
        </div>
      </el-header>

      <div class="admin-layout__tabs">
        <el-tag effect="plain" type="info">工作台</el-tag>
      </div>

      <el-main class="admin-layout__main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
