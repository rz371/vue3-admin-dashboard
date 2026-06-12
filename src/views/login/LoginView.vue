<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Lock, User } from '@element-plus/icons-vue'

import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const form = reactive({
  username: 'admin',
  password: '123456'
})

async function handleLogin() {
  loading.value = true

  try {
    await userStore.login(form)
    router.replace(route.query.redirect || '/dashboard')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="login-page">
    <section class="login-page__panel">
      <div class="login-page__intro">
        <h1>Admin System</h1>
        <p>轻量、清晰的 Vue3 后台管理基础工程。</p>
      </div>

      <el-form class="login-page__form" :model="form" @submit.prevent="handleLogin">
        <h2>登录</h2>
        <el-form-item>
          <el-input v-model="form.username" size="large" placeholder="用户名" :prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" size="large" placeholder="密码" type="password" show-password
            :prefix-icon="Lock" />
        </el-form-item>
        <el-button type="primary" size="large" native-type="submit" :loading="loading" class="login-page__submit">
          登录
        </el-button>
      </el-form>
    </section>
  </main>
</template>
