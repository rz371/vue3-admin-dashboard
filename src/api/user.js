import request from './http'

export function loginApi(payload) {
  // 如果是开发环境的话，就走if模拟登录，如果是生产环境的话，就发送真实http请求到后端
  if (import.meta.env.DEV) { // 开发环境模拟登录
    return Promise.resolve({
      token: 'mock-admin-token',
      user: {
        id: 1,
        name: payload.username || 'admin',
        roles: ['admin']
      }
    })
  }

  return request({
    url: '/auth/login',
    method: 'post',
    data: payload
  })
}

export function getUserInfoApi() {
  return request({
    url: '/auth/me',
    method: 'get'
  })
}
