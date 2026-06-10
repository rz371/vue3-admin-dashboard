<template>
    <div ref="chartRef" class="line-charts"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import * as echarts from 'echarts'

// shallowRef '浅层响应' 是 vue 提供的一个特殊的 ref，它不会递归地监听对象的属性变化,
// 这里我们使用 shallowRef 是因为我们只需要监听 chartRef.value 的变化，而不需要监听 chartRef.value 内部的属性变化

// 而 ref是深层响应，每一层都看的清清楚楚
const chartRef = ref(null)
const chartInstance = shallowRef(null)

const initChart = () => {
    if (!chartRef.value) return
    chartInstance.value = echarts.init(chartRef.value)

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'cross' }
        },
        legend: {
            data: ['访问量', '订单金额'],
            top: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: 40,
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: [
            {
                type: 'value',
                name: '访问量',
                position: 'left',
                axisLine: { show: true },
                axisLabel: { formatter: '{value}' }
            },
            {
                type: 'value',
                name: '订单金额',
                position: 'right',
                axisLine: { show: true },
                axisLabel: { formatter: '￥{value}' },
                splitLine: { show: false }
            }
        ],
        series: [
            {
                name: '访问量',
                type: 'line',
                smooth: true,
                yAxisIndex: 0,
                data: [1280, 2340, 1890, 3120, 2780, 4100, 3560],
                itemStyle: { color: '#409EFF' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(64,158,255,0.3)' },
                        { offset: 1, color: 'rgba(64,158,255,0.02)' }
                    ])
                }
            },
            {
                name: '订单金额',
                type: 'line',
                smooth: true,
                yAxisIndex: 1,
                data: [5200, 8400, 6300, 12500, 9800, 15600, 13200],
                itemStyle: { color: '#67C23A' },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(103,194,58,0.3)' },
                        { offset: 1, color: 'rgba(103,194,58,0.02)' }
                    ])
                }
            }
        ]
    }

    chartInstance.value.setOption(option)
}

// 处理图表自适应窗口大小变化
const handleResize = () => {
    // resize:echarts的内置方法，重新计算图表尺寸并重绘
    chartInstance.value?.resize()
}

onMounted(() => {
    initChart()
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    chartInstance.value?.dispose()
})
</script>

<style lang="less" scoped>
// 一定要加 容器高度，不然不显示
.line-charts {
    width: 100%;
    height: 300px;
}
</style>
