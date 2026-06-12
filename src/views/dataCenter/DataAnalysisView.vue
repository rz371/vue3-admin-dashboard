<template>
  <section class="data-analysis-page">
    <div class="data-analysis-page__intro">
      <h1>数据分析</h1>
      <p>深度分析业务数据，挖掘数据价值和趋势洞察。</p>
    </div>

    <div class="data-analysis-page__content">
      <div class="analysis-section">
        <div class="analysis-filter">
          <el-select v-model="selectedPeriod" placeholder="选择时间周期" class="filter-select">
            <el-option label="本周" value="week" />
            <el-option label="本月" value="month" />
            <el-option label="本季度" value="quarter" />
            <el-option label="本年" value="year" />
          </el-select>
          <el-select v-model="selectedDimension" placeholder="选择分析维度" class="filter-select">
            <el-option label="用户维度" value="user" />
            <el-option label="产品维度" value="product" />
            <el-option label="渠道维度" value="channel" />
          </el-select>
        </div>

        <div class="analysis-charts">
          <div class="chart-panel">
            <h3>用户活跃度分布</h3>
            <div class="distribution-chart">
              <div class="dist-item" v-for="(item, index) in distributionData" :key="index">
                <span class="dist-label">{{ item.label }}</span>
                <div class="dist-bar-container">
                  <div class="dist-bar" :style="{ width: item.value + '%' }"></div>
                </div>
                <span class="dist-value">{{ item.value }}%</span>
              </div>
            </div>
          </div>

          <div class="chart-panel">
            <h3>Top 5 分析指标</h3>
            <div class="ranking-list">
              <div class="ranking-item" v-for="(item, index) in rankingData" :key="index">
                <span class="ranking-num" :class="{ 'is-top': index < 3 }">{{ index + 1 }}</span>
                <span class="ranking-name">{{ item.name }}</span>
                <span class="ranking-value">{{ item.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="analysis-section">
        <div class="insight-card">
          <div class="insight-header">
            <el-icon class="insight-icon">
              <Opportunity />
            </el-icon>
            <h3>数据洞察</h3>
          </div>
          <div class="insight-content">
            <ul class="insight-list">
              <li class="insight-item">
                <span class="insight-badge">趋势</span>
                本周用户活跃度较上周提升 <strong>15.3%</strong>
              </li>
              <li class="insight-item">
                <span class="insight-badge">异常</span>
                渠道 C 的转化率出现 <strong>明显下降</strong>，建议关注
              </li>
              <li class="insight-item">
                <span class="insight-badge">机会</span>
                产品 A 的复购率达到 <strong>45%</strong>，可加大推广
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { Opportunity } from '@element-plus/icons-vue'

const selectedPeriod = ref('month')
const selectedDimension = ref('user')

const distributionData = [
  { label: '周一', value: 65 },
  { label: '周二', value: 78 },
  { label: '周三', value: 82 },
  { label: '周四', value: 75 },
  { label: '周五', value: 90 },
  { label: '周六', value: 95 },
  { label: '周日', value: 88 }
]

const rankingData = [
  { name: '首页', value: '12,543' },
  { name: '产品列表', value: '8,934' },
  { name: '详情页', value: '6,782' },
  { name: '购物车', value: '4,521' },
  { name: '结算页', value: '3,245' }
]
</script>

<style scoped lang="less">
.data-analysis-page {
  display: grid;
  gap: 16px;
}

.data-analysis-page__intro {
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

.data-analysis-page__content {
  display: grid;
  gap: 16px;
}

.analysis-section {
  border: 1px solid #e7ebf2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(31, 45, 61, 0.05);
}

.analysis-filter {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-bottom: 1px solid #e7ebf2;
}

.filter-select {
  width: 160px;
}

.analysis-charts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
}

.chart-panel {
  padding: 24px;
  border-left: 1px solid #e7ebf2;

  &:first-child {
    border-left: none;
  }

  h3 {
    margin: 0 0 20px;
    color: #1f2d3d;
    font-size: 16px;
    font-weight: 600;
  }
}

.distribution-chart {
  display: grid;
  gap: 12px;
}

.dist-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dist-label {
  width: 40px;
  color: #667085;
  font-size: 13px;
}

.dist-bar-container {
  flex: 1;
  height: 20px;
  border-radius: 10px;
  background: #f1f5f9;
  overflow: hidden;
}

.dist-bar {
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(90deg, #4d8dff, #0f67ff);
  transition: width 0.5s ease;
}

.dist-value {
  width: 50px;
  text-align: right;
  color: #4b5563;
  font-size: 13px;
  font-weight: 600;
}

.ranking-list {
  display: grid;
  gap: 10px;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 6px;
  background: #f9fafb;
}

.ranking-num {
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;

  &.is-top {
    background: linear-gradient(135deg, #4d8dff, #0f67ff);
    color: #fff;
  }
}

.ranking-name {
  flex: 1;
  color: #374151;
  font-size: 14px;
}

.ranking-value {
  color: #1f2d3d;
  font-size: 14px;
  font-weight: 600;
}

.insight-card {
  padding: 24px;
}

.insight-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  h3 {
    margin: 0;
    color: #1f2d3d;
    font-size: 16px;
    font-weight: 600;
  }
}

.insight-icon {
  color: #f59e0b;
  font-size: 20px;
}

.insight-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 14px;
}

.insight-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 8px;
  background: #fef3c7;
  color: #92400e;
  font-size: 14px;

  strong {
    color: #d97706;
  }
}

.insight-badge {
  padding: 2px 8px;
  border-radius: 12px;
  background: #fbbf24;
  color: #78350f;
  font-size: 11px;
  font-weight: 600;
}

@media (max-width: 960px) {
  .analysis-charts {
    grid-template-columns: 1fr;
  }

  .chart-panel {
    border-left: none;
    border-top: 1px solid #e7ebf2;

    &:first-child {
      border-top: none;
    }
  }
}
</style>
