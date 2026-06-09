<script setup>
import { DataAnalysis, Finished, Monitor, Operation } from '@element-plus/icons-vue'

const stats = [
  {
    label: '今日访问',
    value: '12,846',
    icon: Monitor
  },
  {
    label: '待处理',
    value: '28',
    icon: Operation
  },
  {
    label: '成功率',
    value: '98.6%',
    icon: Finished
  },
  {
    label: '接口调用',
    value: '76k',
    icon: DataAnalysis
  }
]
</script>

<template>
  <section class="dashboard-view">
    <div class="dashboard-view__heading">
      <h1>工作台</h1>
      <p>项目骨架已包含路由、请求、状态管理和 Element Plus 按需导入。</p>
    </div>

    <div class="dashboard-view__stats">
      <el-card v-for="item in stats" :key="item.label" shadow="never" class="dashboard-view__card">
        <div class="dashboard-view__stat">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <div>
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </div>
        </div>
      </el-card>
    </div>

    <el-card shadow="never" class="dashboard-view__section">
      <template #header>基础能力</template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="路由守卫">未登录访问后台页面会跳转登录页</el-descriptions-item>
        <el-descriptions-item label="API 封装">Axios 已配置 baseURL、token 和错误处理</el-descriptions-item>
        <el-descriptions-item label="状态管理">Pinia 已预留用户、权限、菜单和应用状态</el-descriptions-item>
        <el-descriptions-item label="组件导入">Element Plus 组件和样式自动按需导入</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </section>
</template>
