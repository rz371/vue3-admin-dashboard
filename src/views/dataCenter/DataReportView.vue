<!-- 数据报表 -->
<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import * as echarts from 'echarts'
import { Download, Refresh } from '@element-plus/icons-vue'

import headerImg1 from '@/assets/images/dashboard/headerImg1.svg'
import headerImg2 from '@/assets/images/dashboard/headerImg2.svg'
import headerImg3 from '@/assets/images/dashboard/headerImg3.svg'
import headerImg4 from '@/assets/images/dashboard/headerImg4.svg'
import LineCharts from '@/components/LineCharts.vue'
import PieCharts from '@/components/PieCharts.vue'
import BasicFilter from '@/components/BasicFilter.vue'
import BasicTable from '@/components/BasicTable.vue'

const channelOptions = [
  { label: '全部渠道', value: 'all' },
  { label: 'APP', value: 'app' },
  { label: '微信小程序', value: 'wechat' },
  { label: '支付宝小程序', value: 'alipay' }
]

const filterFields = [
  { prop: 'dateRange', type: 'daterange', startPlaceholder: '开始日期', endPlaceholder: '结束日期' },
  { prop: 'channel', type: 'select', placeholder: '全部渠道', options: channelOptions }
]

const filterModel = ref({
  dateRange: ['2024-05-12', '2024-05-18'],
  channel: 'all'
})
const treeChartRef = ref(null)
const treeChart = shallowRef(null)

const stats = [
  {
    label: 'GMV',
    value: '¥ 1,286,000',
    vsLastWeek: '+12.5%',
    trend: 'up',
    img: headerImg1
  },
  {
    label: '活跃用户',
    value: '42,680',
    vsLastWeek: '+8.3%',
    trend: 'up',
    img: headerImg2
  },
  {
    label: '订单转化率',
    value: '8.6%',
    vsLastWeek: '-0.7%',
    trend: 'down',
    img: headerImg3
  },
  {
    label: '客单价',
    value: '¥ 238',
    vsLastWeek: '+5.2%',
    trend: 'up',
    img: headerImg4
  }
]

const coreColumns = [
  { prop: 'date', label: '日期', minWidth: 150 },
  { prop: 'uv', label: '访问量（UV）', minWidth: 130 },
  { prop: 'orders', label: '下单数（单）', minWidth: 130 },
  { prop: 'gmv', label: '成交金额（元）', minWidth: 150 },
  { prop: 'rate', label: '转化率', minWidth: 110 }
]

const areaColumns = [
  { prop: 'rank', label: '排名', width: 72, slot: 'rank' },
  { prop: 'area', label: '区域', minWidth: 90 },
  { prop: 'sales', label: '成交金额（元）', minWidth: 140 },
  { prop: 'percent', label: '占比', minWidth: 80 }
]

const coreRows = [
  { date: '2024-05-12（周日）', uv: '12,845', orders: '1,024', gmv: '¥ 186,350.00', rate: '7.98%' },
  { date: '2024-05-13（周一）', uv: '13,756', orders: '1,158', gmv: '¥ 213,680.00', rate: '8.42%' },
  { date: '2024-05-14（周二）', uv: '14,269', orders: '1,312', gmv: '¥ 229,750.00', rate: '9.19%' },
  { date: '2024-05-15（周三）', uv: '16,032', orders: '1,487', gmv: '¥ 243,950.00', rate: '9.27%' },
  { date: '2024-05-16（周四）', uv: '15,478', orders: '1,389', gmv: '¥ 226,420.00', rate: '8.98%' },
  { date: '2024-05-17（周五）', uv: '17,856', orders: '1,642', gmv: '¥ 271,860.00', rate: '9.19%' },
  { date: '2024-05-18（周六）', uv: '18,903', orders: '1,789', gmv: '¥ 313,990.00', rate: '9.46%' }
]

const areaRows = [
  { rank: 1, area: '广东省', sales: '¥ 278,650.00', percent: '21.7%' },
  { rank: 2, area: '江苏省', sales: '¥ 189,320.00', percent: '14.7%' },
  { rank: 3, area: '浙江省', sales: '¥ 158,780.00', percent: '12.3%' },
  { rank: 4, area: '山东省', sales: '¥ 132,640.00', percent: '10.3%' },
  { rank: 5, area: '四川省', sales: '¥ 118,560.00', percent: '9.2%' }
]

function initTreeChart() {
  if (!treeChartRef.value) return

  treeChart.value = echarts.init(treeChartRef.value)
  treeChart.value.setOption({
    color: ['#1677ff', '#13c2c2', '#ff8a00', '#765dff', '#20c997', '#f59e0b'],
    tooltip: {
      formatter: '{b}<br />销售额：{c} 万'
    },
    series: [
      {
        type: 'treemap',
        roam: false,
        nodeClick: false,
        breadcrumb: { show: false },
        label: {
          color: '#fff',
          fontSize: 13,
          fontWeight: 600
        },
        upperLabel: { show: false },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 3,
          gapWidth: 3
        },
        data: [
          { name: '家用电器', value: 32 },
          { name: '手机数码', value: 26 },
          { name: '美妆护肤', value: 21 },
          { name: '食品饮料', value: 18 },
          { name: '服饰箱包', value: 14 },
          { name: '家居家装', value: 11 }
        ]
      }
    ]
  })
}

function handleResize() {
  treeChart.value?.resize()
}

onMounted(async () => {
  await nextTick()
  initTreeChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  treeChart.value?.dispose()
})
</script>

<template>
  <section class="data-report-page">
    <header class="report-header">
      <div>
        <h1>数据报表</h1>
        <p>多维度数据分析，助力业务决策</p>
      </div>

      <BasicFilter v-model="filterModel" :fields="filterFields" compact :show-search="false" :show-reset="false"
        :show-create="false">
        <template #actions>
          <el-button :icon="Refresh">刷新</el-button>
          <el-button type="primary" :icon="Download">导出报表</el-button>
        </template>
      </BasicFilter>
    </header>

    <div class="report-stats">
      <el-card v-for="item in stats" :key="item.label" shadow="never" class="report-stat-card">
        <div class="report-stat">
          <img :src="item.img" alt="" class="report-stat__icon">
          <div class="report-stat__main">
            <span class="report-stat__label">{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
            <div class="report-stat__compare">
              <span>较上周</span>
              <b :class="{ 'is-down': item.trend === 'down' }">{{ item.vsLastWeek }}</b>
            </div>
          </div>
          <div class="report-stat__trend" :class="{ 'is-down': item.trend === 'down' }" />
        </div>
      </el-card>
    </div>

    <div class="report-chart-grid">
      <section class="report-card line-card">
        <div class="card-header">
          <h3>营收趋势</h3>
        </div>
        <LineCharts />
      </section>

      <section class="report-card pie-card">
        <div class="card-header">
          <h3>渠道贡献</h3>
          <span>查看全部 ></span>
        </div>
        <PieCharts />
      </section>

      <section class="report-card tree-card">
        <div class="card-header">
          <h3>品类销售树状图</h3>
          <span>查看全部 ></span>
        </div>
        <div ref="treeChartRef" class="tree-chart"></div>
      </section>
    </div>

    <div class="report-table-grid">
      <section class="report-card core-card">
        <div class="card-header">
          <h3>核心指标明细</h3>
        </div>
        <BasicTable :columns="coreColumns" :table-data="coreRows" class="report-table" />
      </section>

      <section class="report-card area-card">
        <div class="card-header">
          <h3>区域销售TOP5</h3>
          <span>查看全部 ></span>
        </div>
        <BasicTable :columns="areaColumns" :table-data="areaRows" class="report-table area-table">
          <template #rank="{ row }">
            <span class="rank-badge" :class="`rank-${row.rank}`">{{ row.rank }}</span>
          </template>
        </BasicTable>
      </section>
    </div>
  </section>
</template>

<style scoped lang="less">
.data-report-page {
  display: grid;
  gap: 16px;
}

.report-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;

  h1 {
    margin: 0 0 8px;
    color: #111827;
    font-size: 26px;
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    margin: 0;
    color: #8a94a6;
    font-size: 14px;
  }
}

.report-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.report-stat-card {
  border: 1px solid #e8edf5;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 6px 18px rgba(37, 55, 90, 0.06);

  :deep(.el-card__body) {
    padding: 22px 16px;
  }
}

.report-stat {
  display: grid;
  min-height: 58px;
  grid-template-columns: 48px minmax(88px, 1fr) 74px;
  align-items: center;
  gap: 12px;
}

.report-stat__icon {
  display: block;
  width: 48px;
  height: 48px;
}

.report-stat__main {
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

.report-stat__label {
  display: block;
  color: #667085;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
}

.report-stat__compare {
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

.report-stat__trend {
  justify-self: end;
  width: 74px;
  height: 34px;
  border-radius: 4px;
  background:
    linear-gradient(135deg, transparent 0 18%, #2f7df6 19% 21%, transparent 22% 34%, #2f7df6 35% 37%, transparent 38% 53%, #2f7df6 54% 56%, transparent 57% 72%, #2f7df6 73% 75%, transparent 76%),
    linear-gradient(180deg, transparent, rgba(47, 125, 246, 0.08));
}

.report-stat__trend.is-down {
  background:
    linear-gradient(155deg, transparent 0 18%, #ff8b2b 19% 21%, transparent 22% 34%, #ff8b2b 35% 37%, transparent 38% 53%, #ff8b2b 54% 56%, transparent 57% 72%, #ff8b2b 73% 75%, transparent 76%),
    linear-gradient(180deg, transparent, rgba(255, 139, 43, 0.08));
}

.report-chart-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.9fr 0.95fr;
  gap: 16px;
}

.report-table-grid {
  display: grid;
  grid-template-columns: 1.4fr 0.95fr;
  gap: 16px;
}

.report-card {
  overflow: hidden;
  border: 1px solid #e7ebf2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(31, 45, 61, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 42px;
  padding: 14px 18px 0;

  h3 {
    margin: 0;
    color: #1f2937;
    font-size: 16px;
    font-weight: 700;
  }

  span {
    color: #409eff;
    font-size: 12px;
    cursor: pointer;
  }
}

.line-card {
  :deep(.line-charts) {
    height: 260px;
  }
}

.pie-card {
  :deep(.pie-charts) {
    min-height: 260px;
    padding-top: 0;
  }
}

.tree-chart {
  width: 100%;
  height: 260px;
  padding: 0 12px 12px;
}

.report-table {
  width: 100%;
  padding: 4px 16px 16px;

  :deep(.el-table__header th) {
    color: #667085;
    font-weight: 700;
    background: #f8fafd;
  }

  :deep(.el-table__cell) {
    padding: 9px 0;
    color: #475467;
    font-size: 13px;
  }

  :deep(.el-table__inner-wrapper::before) {
    display: none;
  }
}

.rank-badge {
  display: inline-grid;
  width: 22px;
  height: 22px;
  place-items: center;
  border-radius: 50%;
  color: #667085;
  font-size: 12px;
  font-weight: 700;
  background: #f0f3f8;
}

.rank-1 {
  color: #fff;
  background: #ffba08;
}

.rank-2 {
  color: #fff;
  background: #cbd5e1;
}

.rank-3 {
  color: #fff;
  background: #fb923c;
}

@media (max-width: 1360px) {

  .report-chart-grid,
  .report-table-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1100px) {
  .report-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .report-stat {
    grid-template-columns: 48px minmax(88px, 1fr) 74px;
  }

  .report-header {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .report-stats {
    grid-template-columns: 1fr;
  }

  .report-stat {
    grid-template-columns: 48px minmax(0, 1fr);
  }

  .report-stat__icon {
    width: 48px;
    height: 48px;
  }

  .report-stat__trend {
    display: none;
  }
}
</style>
