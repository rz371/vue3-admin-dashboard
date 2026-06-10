<template>
    <div ref="pieRef" class="pie-charts"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref, shallowRef } from 'vue';

const pieRef = ref(null)
const pieInstance = shallowRef(null)
const initChart = () => {
    if (!pieRef.value) return
    pieInstance.value = echarts.init(pieRef.value)

    const option = {
        tooltip: {
            trigger: 'item'
        },
        // legend: {

        //     top: '5%',
        //     left: 'center'
        // },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1048, name: 'Search Engine' },
                    { value: 735, name: 'Direct' },
                    { value: 580, name: 'Email' },
                    { value: 484, name: 'Union Ads' },
                    { value: 300, name: 'Video Ads' }
                ]
            }
        ]

    }

    pieInstance.value.setOption(option)
}

const handleResize = () => {
    pieInstance.value?.resize()
}
onMounted(() => {
    initChart()
    window.addEventListener('resize', handleResize)
})
</script>


<style lang="less" scoped>
.pie-charts {
    width: 100%;
    height: 300px;
}
</style>