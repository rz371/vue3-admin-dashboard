import request from './http'

export function loginApi(payload) {
  if (import.meta.env.DEV) {
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
