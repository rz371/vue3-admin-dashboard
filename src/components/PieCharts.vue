<template>
  <div class="pie-charts">
    <div ref="pieRef" class="pie-charts__canvas" />
    <ul class="pie-charts__legend">
      <li v-for="item in channelData" :key="item.name" class="pie-charts__legend-item">
        <span class="pie-charts__dot" :style="{ backgroundColor: item.color }" />
        <span class="pie-charts__name">{{ item.name }}</span>
        <span class="pie-charts__value">{{ item.percent }}%</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

const pieRef = ref(null)
const pieInstance = shallowRef(null)
const total = '12,846'
const channelData = [
  {
    name: '直接访问',
    percent: 32.6,
    color: '#1677ff'
  },
  {
    name: '搜索引擎',
    percent: 28.7,
    color: '#13b8a6'
  },
  {
    name: '社交媒体',
    percent: 18.3,
    color: '#ff8a00'
  },
  {
    name: '邮件营销',
    percent: 11.2,
    color: '#6254e8'
  },
  {
    name: '其他渠道',
    percent: 9.2,
    color: '#d7dce5'
  }
]

function initChart() {
  if (!pieRef.value) return

  pieInstance.value = echarts.init(pieRef.value)
  pieInstance.value.setOption({
    color: channelData.map(item => item.color),
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br />占比：{d}%'
    },
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '43%',
        style: {
          text: `总量\n${total}`,
          textAlign: 'center',
          fill: '#1f2937',
          fontSize: 13,
          fontWeight: 600,
          lineHeight: 20
        }
      }
    ],
    series: [
      {
        name: '渠道占比',
        type: 'pie',
        radius: ['48%', '76%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        silent: false,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        emphasis: {
          scaleSize: 4
        },
        data: channelData.map(item => ({
          name: item.name,
          value: item.percent
        }))
      }
    ]
  })
}

function handleResize() {
  pieInstance.value?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  pieInstance.value?.dispose()
})
</script>

<style lang="less" scoped>
.pie-charts {
  display: grid;
  min-height: 260px;
  grid-template-columns: minmax(150px, 1fr) 150px;
  align-items: center;
  gap: 14px;
  padding: 0 18px 16px;
}

.pie-charts__canvas {
  width: 100%;
  height: 220px;
}

.pie-charts__legend {
  display: grid;
  gap: 14px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.pie-charts__legend-item {
  display: grid;
  grid-template-columns: 8px minmax(58px, 1fr) 48px;
  align-items: center;
  gap: 8px;
  color: #344054;
  font-size: 12px;
}

.pie-charts__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.pie-charts__name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.pie-charts__value {
  color: #475467;
  text-align: right;
}

@media (max-width: 560px) {
  .pie-charts {
    grid-template-columns: 1fr;
  }

  .pie-charts__legend {
    width: min(220px, 100%);
    justify-self: center;
  }
}
</style>
