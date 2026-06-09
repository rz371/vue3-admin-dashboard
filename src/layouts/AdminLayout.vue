<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Expand, Fold, House, SwitchButton } from '@element-plus/icons-vue'

import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const activeMenu = computed(() => route.path)

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

      <el-menu router :default-active="activeMenu" :collapse="appStore.sidebarCollapsed" class="admin-layout__menu">
        <el-menu-item index="/dashboard">
          <el-icon>
            <House />
          </el-icon>
          <template #title>工作台</template>
        </el-menu-item>
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
