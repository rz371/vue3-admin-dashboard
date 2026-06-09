import axios from 'axios'
import { ElMessage } from 'element-plus'

import router from '@/router'
import { getToken, removeToken } from '@/utils/auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000
})

service.interceptors.request.use(
  (config) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    const data = response.data

    if (data && typeof data === 'object' && 'code' in data && data.code !== 0) {
      ElMessage.error(data.message || '请求失败')
      return Promise.reject(data)
    }

    return data
  },
  (error) => {
    const status = error.response?.status

    if (status === 401) {
      removeToken()
      ElMessage.error('登录状态已失效，请重新登录')
      router.replace('/login')
    } else {
      ElMessage.error(error.response?.data?.message || error.message || '网络异常')
    }

    return Promise.reject(error)
  }
)

export default service
