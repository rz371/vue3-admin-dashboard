<template>
    <el-table :data="tableData" class="basic-table">
        <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"
            :width="column.width" :min-width="column.minWidth" :align="column.align"
            :show-overflow-tooltip="column.showOverflowTooltip ?? true">
            <template #default="{ row }">
                <el-tag v-if="column.type === 'tag'" :type="column.tagTypeMap[row[column.prop]]">{{ row[column.prop]
                    }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="120" v-if="operateList.length > 0">
            <template #default>
                <el-button v-for="item in operateList" :key="item.clickType" link type="primary" size="small"
                    @click="handleClick">
                    {{ item.label }}
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
defineProps({
    columns: { // 表头
        type: Array,
        default: () => []
    },
    tableData: { // 表格数据
        type: Array,
        default: () => []
    },
    operateList: { // 操作栏
        type: Array,
        default: () => []
    }
})
</script>

<style scoped lang="less">
.basic-table {
    width: 100%;
}
</style>
