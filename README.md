# Admin System

Vue3 + Vite 后台管理项目骨架，内置 Vue Router、Pinia、Axios、Element Plus 按需导入和登录权限基础流程。

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Structure

```text
src/api       API 请求实例与业务接口
src/router    静态路由和权限守卫
src/stores    Pinia 状态管理
src/layouts   后台主布局
src/views     页面
src/utils     token 等通用工具
src/styles    全局样式
```

开发环境接口默认从 `/api` 代理到 `http://localhost:3000`，可在 `.env.development` 中调整。
