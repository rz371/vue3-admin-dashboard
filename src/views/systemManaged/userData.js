export const userColumns = [
  {
    prop: 'id',
    label: '用户ID',
    minWidth: 90
  },
  {
    prop: 'name',
    label: '用户名',
    minWidth: 120,
    slot: 'user'
  },
  {
    prop: 'phone',
    label: '手机号',
    minWidth: 130
  },
  {
    prop: 'role',
    label: '角色',
    minWidth: 120,
    slot: 'role'
  },
  {
    prop: 'department',
    label: '部门',
    minWidth: 110
  },
  {
    prop: 'status',
    label: '状态',
    minWidth: 90,
    slot: 'status'
  },
  {
    prop: 'createdAt',
    label: '创建时间',
    minWidth: 170
  }
]

export const userOperateList = [
  {
    label: '编辑',
    clickType: 'edit'
  },
  {
    label: '分配角色',
    clickType: 'assignRole'
  },
  {
    label: '禁用',
    clickType: 'disable',
    type: 'danger'
  }
]

export const userList = [
  {
    id: '10001',
    name: '张三',
    phone: '138****1001',
    role: '超级管理员',
    roleTheme: 'blue',
    department: '技术部',
    status: '启用',
    createdAt: '2024-05-18 09:58:21',
    avatar: '张'
  },
  {
    id: '10002',
    name: '李四',
    phone: '138****1002',
    role: '运营管理员',
    roleTheme: 'green',
    department: '运营部',
    status: '启用',
    createdAt: '2024-05-17 14:22:33',
    avatar: '李'
  },
  {
    id: '10003',
    name: '王五',
    phone: '138****1003',
    role: '客服专员',
    roleTheme: 'purple',
    department: '客服部',
    status: '启用',
    createdAt: '2024-05-16 11:05:44',
    avatar: '王'
  },
  {
    id: '10004',
    name: '赵六',
    phone: '138****1004',
    role: '财务专员',
    roleTheme: 'orange',
    department: '财务部',
    status: '启用',
    createdAt: '2024-05-15 16:30:12',
    avatar: '赵'
  },
  {
    id: '10005',
    name: '孙七',
    phone: '138****1005',
    role: '运营专员',
    roleTheme: 'green',
    department: '运营部',
    status: '禁用',
    createdAt: '2024-05-14 10:20:31',
    avatar: '孙'
  },
  {
    id: '10006',
    name: '周八',
    phone: '138****1006',
    role: '客服专员',
    roleTheme: 'purple',
    department: '客服部',
    status: '启用',
    createdAt: '2024-05-13 09:15:27',
    avatar: '周'
  },
  {
    id: '10007',
    name: '吴九',
    phone: '138****1007',
    role: '数据分析师',
    roleTheme: 'blue',
    department: '数据部',
    status: '启用',
    createdAt: '2024-05-12 18:45:09',
    avatar: '吴'
  }
]
