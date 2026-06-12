<script setup>
import { computed, reactive } from 'vue'
import { Avatar, UserFilled } from '@element-plus/icons-vue'
import BasicFilter from '@/components/BasicFilter.vue'
import BasicTable from '@/components/BasicTable.vue'
import { userColumns, userList, userOperateList } from './userData'

const userStats = [
  {
    label: '总用户',
    value: '1,248',
    subText: '较昨日',
    change: '24',
    icon: UserFilled,
    theme: 'blue'
  },
  {
    label: '启用用户',
    value: '1,086',
    subText: '占比',
    change: '87.0%',
    icon: Avatar,
    theme: 'green'
  },
  {
    label: '今日新增',
    value: '18',
    subText: '较昨日',
    change: '6',
    icon: UserFilled,
    theme: 'purple'
  }
]

const statusOptions = [
  {
    label: '全部状态',
    value: ''
  },
  {
    label: '启用',
    value: '启用'
  },
  {
    label: '禁用',
    value: '禁用'
  }
]

const formInline = reactive({
  user: '',
  phone: '',
  status: '',
  createdRange: []
})

const filterFields = [
  {
    prop: 'user',
    label: '用户名',
    type: 'input',
    placeholder: '请输入用户名'
  },
  {
    prop: 'phone',
    label: '手机号',
    type: 'input',
    placeholder: '请输入手机号'
  },
  {
    prop: 'status',
    label: '状态',
    type: 'select',
    placeholder: '全部状态',
    options: statusOptions
  },
  {
    prop: 'createdRange',
    label: '创建时间',
    type: 'daterange',
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期'
  }
]

const tableData = computed(() => {
  return userList.filter((item) => {
    const matchedName = !formInline.user || item.name.includes(formInline.user)
    const matchedPhone = !formInline.phone || item.phone.includes(formInline.phone)
    const matchedStatus = !formInline.status || item.status === formInline.status
    const matchedDate =
      !formInline.createdRange?.length ||
      (item.createdAt.slice(0, 10) >= formInline.createdRange[0] &&
        item.createdAt.slice(0, 10) <= formInline.createdRange[1])

    return matchedName && matchedPhone && matchedStatus && matchedDate
  })
})

const handleReset = () => {
  formInline.user = ''
  formInline.phone = ''
  formInline.status = ''
  formInline.createdRange = []
}

const handleOperate = (action, row) => {
  console.log(action.clickType, row)
}
</script>

<template>
  <section class="user-page">
    <div class="user-page__hero">
      <div class="user-page__intro">
        <h1>用户管理</h1>
        <p>用户列表与管理，可新增、编辑、分配角色及管理用户状态。</p>
      </div>

      <div class="user-page__stats">
        <div v-for="item in userStats" :key="item.label" class="user-page__stat-card">
          <span class="user-page__stat-icon" :class="`is-${item.theme}`">
            <el-icon>
              <component :is="item.icon" />
            </el-icon>
          </span>
          <div class="user-page__stat-content">
            <span class="user-page__stat-label">{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
            <span class="user-page__stat-meta">
              {{ item.subText }}
              <b>↑ {{ item.change }}</b>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="user-page__panel">
      <BasicFilter
        v-model="formInline"
        :fields="filterFields"
        create-text="+ 新增用户"
        @reset="handleReset"
      />

      <div class="user-page__table">
        <BasicTable
          :columns="userColumns"
          :table-data="tableData"
          :operate-list="userOperateList"
          :operate-min-width="180"
          operate-align="center"
          row-key="id"
          @operate-click="handleOperate"
        >
          <template #user="{ row }">
            <div class="user-cell">
              <el-avatar :size="32" class="user-cell__avatar">{{ row.avatar }}</el-avatar>
              <span>{{ row.name }}</span>
            </div>
          </template>

          <template #role="{ row }">
            <el-tag size="small" effect="light" class="role-tag" :class="`is-${row.roleTheme}`">
              {{ row.role }}
            </el-tag>
          </template>

          <template #status="{ row }">
            <el-tag size="small" effect="light" :type="row.status === '启用' ? 'success' : 'danger'">
              {{ row.status }}
            </el-tag>
          </template>

          <template #operate="{ row }">
            <div class="table-actions">
              <el-button link type="primary" size="small" @click="handleOperate({ clickType: 'edit' }, row)">
                编辑
              </el-button>
              <el-button link type="primary" size="small" @click="handleOperate({ clickType: 'assignRole' }, row)">
                分配角色
              </el-button>
              <el-button
                link
                :type="row.status === '启用' ? 'danger' : 'success'"
                size="small"
                @click="handleOperate({ clickType: row.status === '启用' ? 'disable' : 'enable' }, row)"
              >
                {{ row.status === '启用' ? '禁用' : '启用' }}
              </el-button>
            </div>
          </template>
        </BasicTable>
      </div>
    </div>
  </section>
</template>

<style scoped lang="less">
.user-page {
  display: grid;
  gap: 18px;
  min-height: 240px;
}

.user-page__hero {
  display: grid;
  grid-template-columns: minmax(280px, 1fr) minmax(520px, 1.5fr);
  align-items: center;
  gap: 28px;
  padding: 28px 24px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(31, 45, 61, 0.05);
}

.user-page__intro {
  h1 {
    margin: 0 0 14px;
    color: #111827;
    font-size: 28px;
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    margin: 0;
    color: #475467;
    font-size: 14px;
    line-height: 1.8;
  }
}

.user-page__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.user-page__stat-card {
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  min-height: 108px;
  padding: 18px 20px;
  border: 1px solid #e7ebf2;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 8px 20px rgba(37, 55, 90, 0.04);
}

.user-page__stat-icon {
  display: inline-flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
  font-size: 26px;
}

.user-page__stat-icon.is-blue {
  background: linear-gradient(135deg, #1677ff, #004df5);
}

.user-page__stat-icon.is-green {
  background: linear-gradient(135deg, #20c997, #10a98e);
}

.user-page__stat-icon.is-purple {
  background: linear-gradient(135deg, #7c5cff, #6842e9);
}

.user-page__stat-content {
  min-width: 0;

  strong {
    display: block;
    margin-top: 4px;
    color: #111827;
    font-size: 24px;
    font-weight: 700;
    line-height: 1.15;
  }
}

.user-page__stat-label {
  color: #667085;
  font-size: 13px;
  font-weight: 600;
}

.user-page__stat-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  color: #667085;
  font-size: 12px;

  b {
    color: #13a37b;
    font-weight: 700;
  }
}

.user-page__panel {
  overflow: hidden;
  border: 1px solid #e7ebf2;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(31, 45, 61, 0.05);
}

.user-page__table {
  padding: 0 14px 16px;

  :deep(.el-table) {
    color: #44556f;
    font-size: 13px;
  }

  :deep(.el-table__header th) {
    height: 50px;
    color: #1f2d3d;
    font-weight: 700;
    background: #fff;
  }

  :deep(.el-table__row) {
    height: 58px;
  }

  :deep(.el-table__cell) {
    border-bottom-color: #edf1f7;
  }

  :deep(.el-button.is-link) {
    height: 22px;
    padding: 0 6px;
    border: 1px solid currentColor;
    border-radius: 4px;
    background: #fff;
    font-weight: 600;
  }
}

.user-cell {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.user-cell__avatar {
  color: #fff;
  background: linear-gradient(135deg, #5f8ee6, #2f7df6);
}

.role-tag {
  border: 0;
  font-weight: 600;
}

.role-tag.is-blue {
  color: #2f6ff6;
  background: #eef5ff;
}

.role-tag.is-green {
  color: #0ea47a;
  background: #e9fbf7;
}

.role-tag.is-purple {
  color: #7c5cff;
  background: #f1efff;
}

.role-tag.is-orange {
  color: #d88316;
  background: #fff5e8;
}

.table-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

@media (max-width: 1180px) {
  .user-page__hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .user-page__stats {
    grid-template-columns: 1fr;
  }

}
</style>
