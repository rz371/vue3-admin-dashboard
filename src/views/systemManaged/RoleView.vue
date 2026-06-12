<template>
  <section class="role-page">
    <div class="role-page__intro">
      <h1>角色管理</h1>
      <p>用于管理系统角色、分配权限及控制数据范围。</p>
    </div>

    <div class="role-page__content">
      <div class="role-page__left">
        <div class="role-page__filter">
          <BasicFilter v-model="formInline" :fields="filterFields" create-text="新增角色" @reset="handleReset" />
        </div>

        <div class="role-page__main">
          <BasicTable :columns="roleColumns" :table-data="filteredRoleList" :operate-list="roleOperateList"
            :operate-min-width="170" operate-align="center" row-key="id" highlight-current-row
            @current-change="handleRoleChange" @operate-click="handleOperate">
            <template #role="{ row }">
              <div class="role-cell">
                <span class="role-cell__icon" :class="`is-${row.roleTheme || 'blue'}`">
                  <el-icon>
                    <component :is="row.icon" />
                  </el-icon>
                </span>
                <span class="role-cell__content">
                  <strong>{{ row.name }}</strong>
                  <small>{{ row.description }}</small>
                </span>
              </div>
            </template>

            <template #status="{ row }">
              <el-tag size="small" effect="light" :type="row.status === 1 ? 'success' : 'danger'">
                {{ row.status === 1 ? '启用' : '禁用' }}
              </el-tag>
            </template>

            <template #operate="{ row }">
              <div class="table-actions">
                <el-button link type="primary" size="small" @click="handleOperate({ clickType: 'edit' }, row)">
                  编辑
                </el-button>
                <el-button link type="primary" size="small" @click="handleOperate({ clickType: 'copy' }, row)">
                  复制
                </el-button>
                <el-button link type="danger" size="small" @click="handleOperate({ clickType: 'delete' }, row)">
                  删除
                </el-button>
              </div>
            </template>
          </BasicTable>
        </div>
      </div>

      <aside class="permission-card">
        <div class="permission-card__header">
          <h2>权限配置</h2>
          <p>
            已选择角色：
            <span>{{ currentRole.name }}</span>
          </p>
        </div>

        <el-scrollbar class="permission-card__body">
          <el-tree ref="permissionTreeRef" :data="permissionTree" node-key="id" show-checkbox default-expand-all
            :default-checked-keys="checkedPermissions" :props="treeProps" />
        </el-scrollbar>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { Coin, Headset, Management, Money, UserFilled } from '@element-plus/icons-vue'
import BasicTable from '@/components/BasicTable.vue'
import BasicFilter from '@/components/BasicFilter.vue'
import {
  defaultCheckedPermissions,
  permissionTree,
  roleColumns,
  roleList,
  roleOperateList
} from './roleData'

const filterFields = [
  {
    prop: 'name',
    label: '角色名称',
    type: 'input',
    placeholder: '请输入角色名称'
  },
  {
    prop: 'permissionScope',
    label: '权限范围',
    type: 'select',
    placeholder: '请选择权限范围',
    options: [
      {
        label: '全部数据',
        value: '全部数据'
      },
      {
        label: '本部门数据',
        value: '本部门数据'
      },
      {
        label: '仅本人数据',
        value: '仅本人数据'
      }
    ]
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    placeholder: '全部状态',
    options: [
      {
        label: '启用',
        value: 1
      },
      {
        label: '禁用',
        value: 0
      }
    ]
  },
]
const formInline = reactive({
  name: '',
  status: '',
  permissionScope: ''
})
const roleIconMap = {
  超级管理员: Management,
  运营主管: UserFilled,
  财务专员: Money,
  客服人员: Headset,
  仓储管理员: Coin
}

roleList.forEach((item) => {
  item.icon = roleIconMap[item.name] || UserFilled
})

const permissionTreeRef = ref()
const currentRole = ref(roleList[0])
const treeProps = {
  label: 'label',
  children: 'children'
}

const checkedPermissions = computed(() => {
  if (currentRole.value?.id === 1) {
    return defaultCheckedPermissions
  }

  return defaultCheckedPermissions.filter((item) => !['user:disable', 'role', 'menu'].includes(item))
})

const filteredRoleList = computed(() => {
  return roleList.filter((item) => {
    const matchedName = !formInline.name || item.name.includes(formInline.name)
    const matchedScope = !formInline.permissionScope || item.dataPermission === formInline.permissionScope
    const matchedStatus = formInline.status === '' || item.status === formInline.status

    return matchedName && matchedScope && matchedStatus
  })
})

const handleReset = () => {
  formInline.name = ''
  formInline.status = ''
  formInline.permissionScope = ''
}

const refreshCheckedPermissions = async () => {
  await nextTick()
  permissionTreeRef.value?.setCheckedKeys(checkedPermissions.value)
}

const handleRoleChange = (row) => {
  if (!row) {
    return
  }

  currentRole.value = row
  refreshCheckedPermissions()
}

const handleOperate = (action, row) => {
  console.log(action.clickType, row)
}
</script>

<style scoped lang="less">
.role-page {
  display: grid;
  gap: 16px;
}

.role-page__intro {
  padding: 2px 2px 0;

  h1 {
    margin: 0 0 10px;
    color: #111827;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    margin: 0;
    color: #667085;
    font-size: 14px;
  }
}

.role-page__content {
  display: grid;
  grid-template-columns: minmax(720px, 1fr) 386px;
  gap: 16px;
  align-items: start;
}

.role-page__left {
  display: grid;
  gap: 16px;
  min-width: 0;
}

.role-page__filter,
.role-page__main,
.permission-card {
  border: 1px solid #e7ebf2;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(31, 45, 61, 0.05);
}

.role-page__filter {
  overflow: hidden;

  :deep(.basic-filter) {
    padding: 24px 20px 22px;
  }

  :deep(.basic-filter__fields) {
    column-gap: 34px;
    row-gap: 18px;
  }

  :deep(.basic-filter__actions) {
    margin-top: 22px;
  }
}

.role-page__main {
  overflow: hidden;
  padding: 0 14px 12px;

  :deep(.el-table) {
    color: #44556f;
    font-size: 13px;
  }

  :deep(.el-table__header th) {
    height: 56px;
    color: #1f2d3d;
    font-weight: 700;
    background: #fff;
  }

  :deep(.el-table__row) {
    height: 84px;
  }

  :deep(.el-table__cell) {
    border-bottom-color: #edf1f7;
  }

  :deep(.el-button.is-link) {
    height: 22px;
    padding: 0 6px;
    font-weight: 600;
  }
}

.role-cell {
  display: inline-flex;
  align-items: center;
  gap: 14px;
}

.role-cell__icon {
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-size: 22px;
  background: linear-gradient(135deg, #4d8dff, #0f67ff);
}

.role-cell__icon.is-green {
  background: linear-gradient(135deg, #25d7a0, #13bd7d);
}

.role-cell__icon.is-orange {
  background: linear-gradient(135deg, #ffbd4a, #ff970f);
}

.role-cell__icon.is-purple {
  background: linear-gradient(135deg, #8b6cff, #6c4ff1);
}

.role-cell__icon.is-cyan {
  background: linear-gradient(135deg, #22d3c5, #09a99d);
}

.role-cell__content {
  display: grid;
  gap: 6px;

  strong {
    color: #1f2d3d;
    font-size: 14px;
    font-weight: 700;
  }

  small {
    color: #7b8798;
    font-size: 12px;
  }
}

.table-actions {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.permission-card {
  overflow: hidden;
  min-height: 674px;
}

.permission-card__header {
  padding: 22px 22px 16px;

  h2 {
    margin: 0 0 20px;
    color: #111827;
    font-size: 18px;
    font-weight: 700;
  }

  p {
    margin: 0;
    color: #5d6b82;
    font-size: 14px;
  }

  span {
    color: #1677ff;
    font-weight: 700;
  }
}

.permission-card__body {
  height: 535px;
  margin: 0 18px 18px;
  padding: 8px 10px 12px;
  border: 1px solid #e7ebf2;
  border-radius: 4px;
}

.permission-card {
  :deep(.el-tree) {
    color: #4a5568;
    font-size: 14px;
  }

  :deep(.el-tree-node__content) {
    height: 30px;
    border-radius: 4px;
  }

  :deep(.el-tree-node__content:hover) {
    background: #f5f8ff;
  }

  :deep(.el-checkbox__input.is-checked .el-checkbox__inner),
  :deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
    border-color: #1677ff;
    background-color: #1677ff;
  }

  :deep(.el-checkbox__inner) {
    width: 15px;
    height: 15px;
    border-color: #c8d2e1;
    border-radius: 3px;
  }

  :deep(.el-tree-node__expand-icon) {
    color: #98a2b3;
  }
}

@media (max-width: 1180px) {
  .role-page__content {
    grid-template-columns: 1fr;
  }

  .permission-card__body {
    height: 420px;
  }
}
</style>
