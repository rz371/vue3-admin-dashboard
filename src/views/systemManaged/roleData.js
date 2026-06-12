export const roleColumns = [

    {
        prop: 'name',
        label: '角色名称',
        minWidth: 220,
        slot: 'role'
    },
    {
        prop: 'memberCount',
        label: '成员数',
        minWidth: 130
    },
    {
        prop: 'dataPermission',
        label: '数据权限',
        minWidth: 170
    },
    {
        prop: 'status',
        label: '状态',
        minWidth: 130,
        slot: 'status'
    },
    {
        prop: 'updatedAt',
        label: '更新时间',
        minWidth: 170
    },
]
export const roleOperateList = [
    {
        label: '编辑',
        clickType: 'edit'
    },
    {
        label: '复制',
        clickType: 'assignRole'
    },
    {
        label: '删除',
        clickType: 'disable',
        type: 'danger'
    }
]

export const roleList = [
    {
        id: 1,
        name: '超级管理员',

        description: '系统内置角色',
        memberCount: 2,
        dataPermission: '全部数据',
        status: 1,
        updatedAt: '2024-05-18 10:30:45'
    },
    {
        id: 2,
        name: '运营主管',
        roleTheme: 'green',
        description: '运营管理相关权限',
        memberCount: 6,
        dataPermission: '本部门数据',
        status: 1,
        updatedAt: '2024-05-17 16:22:31'
    },
    {
        id: 3,
        name: '财务专员',
        roleTheme: 'orange',
        description: '财务相关权限',
        memberCount: 3,
        dataPermission: '本部门数据',
        status: 1,
        updatedAt: '2024-05-16 09:15:22'
    },
    {
        id: 4,
        name: '客服人员',
        roleTheme: 'purple',
        description: '客服相关权限',
        memberCount: 8,
        dataPermission: '仅本人数据',
        status: 1,
        updatedAt: '2024-05-15 14:18:07'
    },
    {
        id: 5,
        name: '仓储管理员',
        roleTheme: 'cyan',
        description: '仓储相关权限',
        memberCount: 4,
        dataPermission: '本部门数据',
        status: 0,
        updatedAt: '2024-05-14 11:09:33'
    }
]

export const permissionTree = [
    {
        id: 'workspace',
        label: '工作台',
        children: [
            {
                id: 'workspace:view',
                label: '查看工作台'
            },
            {
                id: 'workspace:setting',
                label: '自定义设置'
            }
        ]
    },
    {
        id: 'order',
        label: '订单管理',
        children: [
            {
                id: 'order:list',
                label: '订单列表'
            },
            {
                id: 'order:detail',
                label: '订单详情'
            },
            {
                id: 'order:export',
                label: '订单导出'
            }
        ]
    },
    {
        id: 'user',
        label: '用户管理',
        children: [
            {
                id: 'user:list',
                label: '用户列表'
            },
            {
                id: 'user:create',
                label: '用户新增'
            },
            {
                id: 'user:edit',
                label: '用户编辑'
            },
            {
                id: 'user:disable',
                label: '用户禁用'
            }
        ]
    },
    {
        id: 'role',
        label: '角色管理'
    },
    {
        id: 'menu',
        label: '菜单管理'
    },
    {
        id: 'report',
        label: '数据报表',
        children: [
            {
                id: 'report:view',
                label: '报表查看'
            },
            {
                id: 'report:export',
                label: '报表导出'
            }
        ]
    },
    {
        id: 'log',
        label: '系统日志',
        children: [
            {
                id: 'log:list',
                label: '日志列表'
            },
            {
                id: 'log:detail',
                label: '日志详情'
            }
        ]
    }
]

export const defaultCheckedPermissions = [
    'workspace:view',
    'workspace:setting',
    'order:list',
    'order:detail',
    'order:export',
    'user:list',
    'user:create',
    'user:edit',
    'user:disable',
    'role',
    'menu',
    'report:view',
    'report:export',
    'log:list',
    'log:detail'
]
