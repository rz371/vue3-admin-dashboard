<template>
  <section class="data-board-page">
    <div class="data-board-page__intro">
      <h1>数据看板</h1>
      <p>可视化展示关键业务指标和数据概览。</p>
    </div>

    <div class="data-board-page__content">
      <div class="board-grid">
        <div class="board-card board-card--large">
          <h3>访问量统计</h3>
          <div class="donut-chart">
            <div class="donut-ring"></div>
            <div class="donut-center">
              <span class="donut-value">85%</span>
              <span class="donut-label">完成率</span>
            </div>
          </div>
        </div>

        <div class="board-card">
          <h3>转化率</h3>
          <div class="metric-display">
            <span class="metric-value">23.5%</span>
            <span class="metric-trend up">+5.2%</span>
          </div>
        </div>

        <div class="board-card">
          <h3>跳出率</h3>
          <div class="metric-display">
            <span class="metric-value">45.8%</span>
            <span class="metric-trend down">-3.1%</span>
          </div>
        </div>

        <div class="board-card">
          <h3>平均时长</h3>
          <div class="metric-display">
            <span class="metric-value">4分32秒</span>
            <span class="metric-trend up">+12%</span>
          </div>
        </div>

        <div class="board-card board-card--wide">
          <h3>实时数据</h3>
          <div class="realtime-list">
            <div class="realtime-item" v-for="item in realtimeData" :key="item.id">
              <span class="realtime-dot" :class="item.status"></span>
              <span class="realtime-info">{{ item.info }}</span>
              <span class="realtime-time">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const realtimeData = [
  { id: 1, info: '用户 192.168.1.xxx 登录系统', status: 'success', time: '刚刚' },
  { id: 2, info: '订单 #20240518001 已支付', status: 'success', time: '2分钟前' },
  { id: 3, info: 'API接口调用异常', status: 'warning', time: '5分钟前' },
  { id: 4, info: '数据同步完成', status: 'success', time: '8分钟前' },
  { id: 5, info: '用户退出登录', status: 'info', time: '10分钟前' }
]
</script>

<style scoped lang="less">
.data-board-page {
  display: grid;
  gap: 16px;
}

.data-board-page__intro {
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

.data-board-page__content {
  display: grid;
  gap: 16px;
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.board-card {
  padding: 24px;
  border: 1px solid #e7ebf2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(31, 45, 61, 0.05);

  &--large {
    grid-column: span 2;
    grid-row: span 2;
  }

  &--wide {
    grid-column: span 2;
  }

  h3 {
    margin: 0 0 20px;
    color: #1f2d3d;
    font-size: 16px;
    font-weight: 600;
  }
}

.donut-chart {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.donut-ring {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(#4d8dff 0deg, #4d8dff 306deg, #e7ebf2 306deg, #e7ebf2 360deg);
  mask: radial-gradient(transparent 60%, #000 61%);
  -webkit-mask: radial-gradient(transparent 60%, #000 61%);
}

.donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.donut-value {
  display: block;
  color: #1f2d3d;
  font-size: 32px;
  font-weight: 700;
}

.donut-label {
  display: block;
  color: #667085;
  font-size: 13px;
}

.metric-display {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.metric-value {
  color: #1f2d3d;
  font-size: 28px;
  font-weight: 700;
}

.metric-trend {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  &.up {
    color: #10b981;
    background: #d1fae5;
  }

  &.down {
    color: #ef4444;
    background: #fee2e2;
  }
}

.realtime-list {
  display: grid;
  gap: 12px;
}

.realtime-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 6px;
  background: #f9fafb;
}

.realtime-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;

  &.warning {
    background: #f59e0b;
  }

  &.info {
    background: #3b82f6;
  }
}

.realtime-info {
  flex: 1;
  color: #4b5563;
  font-size: 13px;
}

.realtime-time {
  color: #9ca3af;
  font-size: 12px;
}

@media (max-width: 1200px) {
  .board-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .board-grid {
    grid-template-columns: 1fr;
  }

  .board-card--large {
    grid-column: span 1;
  }

  .board-card--wide {
    grid-column: span 1;
  }
}
</style>