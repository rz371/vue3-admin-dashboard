<script setup>
import { ref } from 'vue'
import { Bell, Document, Tickets, TrendCharts, Warning } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { getBeforeDate } from '@/utils/dataTime'
import headerImg1 from '@/assets/images/dashboard/headerImg1.svg'
import headerImg2 from '@/assets/images/dashboard/headerImg2.svg'
import headerImg3 from '@/assets/images/dashboard/headerImg3.svg'
import headerImg4 from '@/assets/images/dashboard/headerImg4.svg'
import LineCharts from '@/components/LineCharts.vue'
import PieCharts from '@/components/PieCharts.vue'
import BasicTable from '@/components/BasicTable.vue'
const userStore = useUserStore()
const datePickerValue = ref([])
const stats = [
  {
    label: '今日访问',
    value: '12,846',
    vsYesterday: '+12.5%',
    trend: 'up',
    img: headerImg1
  },
  {
    label: '订单金额',
    value: '￥ 568,420',
    vsYesterday: '+8.7%',
    trend: 'up',
    img: headerImg2
  },
  {
    label: '待处理',
    value: '32',
    vsYesterday: '-11.5%',
    trend: 'down',
    img: headerImg3
  },
  {
    label: '转化率',
    value: '8.6%',
    vsYesterday: '+0.6%',
    trend: 'up',
    img: headerImg4
  }
]
const radio = ref('1')
const orderColumns = [
  {
    prop: 'orderNo',
    label: '订单号',
    minWidth: 120
  },
  {
    prop: 'customer',
    label: '用户',
    minWidth: 100
  },
  {
    prop: 'product',
    label: '商品',
    minWidth: 120
  },
  {
    prop: 'amount',
    label: '金额',
    minWidth: 100
  },
  {
    prop: 'status',
    label: '状态',
    minWidth: 90,
    type: 'tag',
    tagTypeMap: {
      '待处理': 'info',
      '待支付': 'warning',
      '已完成': 'success',
      '已发货': 'primary'
    }

  },
  {
    prop: 'createdAt',
    label: '下单时间',
    minWidth: 120
  }
]
const operateList = [
  {
    label: '详情',
    clickType: 'detail'
  }
]
const orderData = [
  {
    orderNo: 'DD20260610001',
    customer: '张三',
    product: '企业版套餐',
    amount: '￥1,280.00',
    status: '待处理',
    createdAt: '2026-06-10'
  },
  {
    orderNo: 'DD20260610002',
    customer: '李四',
    product: '企业版套餐',
    amount: '￥568.00',
    status: '待支付',
    createdAt: '2026-06-10'
  },
  {
    orderNo: 'DD20260609012',
    customer: '王五',
    amount: '￥3,420.00',
    product: '企业版套餐',
    status: '已完成',
    createdAt: '2026-06-09'
  },
  {
    orderNo: 'DD20260609008',
    customer: '赵六',
    amount: '￥899.00',
    product: '企业版套餐',
    status: '已发货',
    createdAt: '2026-06-09'
  }
]
const todoTasks = [
  {
    title: '处理用户反馈：系统登录异常',
    level: '紧急',
    levelType: 'danger',
    time: '10:00',
    icon: Bell,
    theme: 'danger'
  },
  {
    title: '审核新用户注册申请（共 12 条）',
    level: '高',
    levelType: 'warning',
    time: '11:30',
    icon: Tickets,
    theme: 'warning'
  },
  {
    title: '生成本周运营报告',
    level: '中',
    levelType: 'primary',
    time: '14:00',
    icon: TrendCharts,
    theme: 'primary'
  },
  {
    title: '更新产品文档',
    level: '低',
    levelType: 'info',
    time: '16:30',
    icon: Document,
    theme: 'success'
  }
]
</script>

<template>
  <section class="dashboard-view">
    <div class="dashboard-view__heading">
      <p>欢迎回来，{{ userStore.profile?.name || 'admin' }}</p>
      <el-date-picker v-model="datePickerValue" type="daterange" range-separator="To" start-placeholder="开始时间"
        end-placeholder="结束时间" size="small" style="width:200px" />
    </div>

    <div class="dashboard-view__stats">
      <el-card v-for="item in stats" :key="item.label" shadow="never" class="dashboard-view__card">
        <div class="dashboard-view__stat">
          <img :src="item.img" alt="" class="dashboard-view__stat-icon">
          <div class="dashboard-view__stat-main">
            <span class="dashboard-view__stat-label">{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
            <div class="dashboard-view__stat-compare">
              <span>较昨日</span>
              <b :class="{ 'is-down': item.trend === 'down' }">{{ item.vsYesterday }}</b>
            </div>
          </div>
          <div class="dashboard-view__trend" :class="{ 'is-down': item.trend === 'down' }" />
        </div>
      </el-card>
    </div>

    <div class="dashboard-second">
      <div class="left white-card">
        <div class="header">
          <h3>
            近7日运营趋势
            <el-tooltip class="box-item" effect="dark" content="Top Left prompts info" placement="top-start">
              <el-icon>
                <Warning />
              </el-icon>
            </el-tooltip>
          </h3>
          <el-radio-group v-model="radio" size="small" fill="#409eff">
            <el-radio-button label="按天" value="1" />
            <el-radio-button label="按小时" value="2" />
          </el-radio-group>
        </div>
        <LineCharts />
      </div>
      <div class="right white-card">
        <div class="header">
          <h3>渠道占比</h3>
          <p class="control">更新时间：{{ getBeforeDate(1) }}</p>
        </div>
        <PieCharts />
      </div>
    </div>
    <div class="dashboard-third">
      <div class="left white-card">
        <div class="header">
          <h3>最近订单</h3>
          <span class="control" style="color: #409eff;">查看全部 > </span>
        </div>
        <BasicTable :columns="orderColumns" :table-data="orderData" :operate-list="operateList" />
      </div>
      <div class="right white-card">
        <div class="header">
          <h3>待办任务</h3>
          <span class="control" style="color: #409eff;">查看全部 > </span>
        </div>
        <ul class="todo-list">
          <li v-for="item in todoTasks" :key="item.title" class="todo-list__item">
            <span class="todo-list__icon" :class="`is-${item.theme}`">
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
            </span>
            <span class="todo-list__title">{{ item.title }}</span>
            <el-tag :type="item.levelType" effect="light" size="small" class="todo-list__tag">
              {{ item.level }}
            </el-tag>
            <span class="todo-list__time">{{ item.time }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="less">
.dashboard-view {
  // padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 10px;

    h3 {
      font-size: 14px;
    }

    .control {
      font-size: 12px;
      color: #909399;
      cursor: pointer;
    }
  }

  .white-card {
    flex: 1;
    // border: 1px solid red;
    // height: 200px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .dashboard-view__heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    color: #909399;
    font-size: 13px;
  }

  .dashboard-view__stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    // margin-bottom: 16px;
  }

  .dashboard-view__card {
    border: 1px solid #e8edf5;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 6px 18px rgba(37, 55, 90, 0.06);

    :deep(.el-card__body) {
      padding: 22px 16px;
    }
  }

  .dashboard-view__stat {
    display: grid;
    grid-template-columns: 48px minmax(88px, 1fr) 74px;
    align-items: center;
    gap: 12px;
    min-height: 58px;
  }

  .dashboard-view__stat-icon {
    width: 48px;
    height: 48px;
    display: block;
  }

  .dashboard-view__stat-main {
    min-width: 0;

    strong {
      display: block;
      margin-top: 6px;
      color: #101828;
      font-size: 22px;
      font-weight: 700;
      line-height: 1.1;
      white-space: nowrap;
    }
  }

  .dashboard-view__stat-label {
    display: block;
    color: #667085;
    font-size: 13px;
    font-weight: 600;
    line-height: 1;
  }

  .dashboard-view__stat-compare {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    color: #8a94a6;
    font-size: 12px;
    line-height: 1;

    b {
      color: #20c997;
      font-weight: 700;
    }

    b.is-down {
      color: #ff5c64;
    }
  }

  .dashboard-view__trend {
    width: 74px;
    height: 34px;
    border-radius: 4px;
    background:
      linear-gradient(135deg, transparent 0 18%, #2f7df6 19% 21%, transparent 22% 34%, #2f7df6 35% 37%, transparent 38% 53%, #2f7df6 54% 56%, transparent 57% 72%, #2f7df6 73% 75%, transparent 76%),
      linear-gradient(180deg, transparent, rgba(47, 125, 246, 0.08));
  }

  .dashboard-view__trend.is-down {
    background:
      linear-gradient(155deg, transparent 0 18%, #ff8b2b 19% 21%, transparent 22% 34%, #ff8b2b 35% 37%, transparent 38% 53%, #ff8b2b 54% 56%, transparent 57% 72%, #ff8b2b 73% 75%, transparent 76%),
      linear-gradient(180deg, transparent, rgba(255, 139, 43, 0.08));
  }

  .dashboard-second {

    display: flex;



    .left {
      flex: 2;
      margin-right: 10px;

      h3 {
        display: flex;
        align-items: center;

        .el-icon {
          margin-left: 5px;
        }
      }
    }

    .right {
      flex: 1;
      margin-left: 10px;
    }
  }

  .dashboard-third {
    display: flex;


    .left {
      margin-right: 10px;
      flex: 2;
    }

    .right {
      margin-left: 10px;
      flex: 1;
    }
  }

  .todo-list {
    padding: 4px 18px 18px;
    margin: 0;
    list-style: none;
  }

  .todo-list__item {
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr) 48px 46px;
    align-items: center;
    gap: 10px;
    min-height: 46px;
    border-bottom: 1px solid #eef1f5;
    color: #303846;
    font-size: 13px;
  }

  .todo-list__item:last-child {
    border-bottom: 0;
  }

  .todo-list__icon {
    display: inline-flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 13px;
  }

  .todo-list__icon.is-danger {
    color: #ff4d4f;
    background: #fff1f0;
  }

  .todo-list__icon.is-warning {
    color: #fa8c16;
    background: #fff7e6;
  }

  .todo-list__icon.is-primary {
    color: #2f7df6;
    background: #eef5ff;
  }

  .todo-list__icon.is-success {
    color: #13c2a3;
    background: #e9fbf7;
  }

  .todo-list__title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .todo-list__tag {
    justify-self: center;
    min-width: 34px;
    border: 0;
  }

  .todo-list__time {
    color: #606f85;
    font-size: 12px;
    text-align: right;
  }
}

@media (max-width: 1180px) {
  .dashboard-view {
    .dashboard-view__stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
}

@media (max-width: 640px) {
  .dashboard-view {
    .dashboard-view__heading {
      align-items: flex-start;
      flex-direction: column;
      gap: 12px;
    }

    .dashboard-view__stats {
      grid-template-columns: 1fr;
    }
  }
}
</style>
