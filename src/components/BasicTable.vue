<template>
  <el-table :data="tableData" class="basic-table" v-bind="$attrs">
    <el-table-column
      v-for="column in columns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :min-width="column.minWidth"
      :align="column.align"
      :show-overflow-tooltip="column.showOverflowTooltip ?? true"
    >
      <template #default="scope">
        <slot v-if="column.slot" :name="column.slot" v-bind="scope" />
        <el-tag
          v-else-if="column.type === 'tag'"
          :type="getTagType(column, scope.row)"
          :effect="column.effect || 'light'"
          :class="column.className"
          size="small"
        >
          {{ scope.row[column.prop] }}
        </el-tag>
        <span v-else>{{ scope.row[column.prop] }}</span>
      </template>
    </el-table-column>

    <el-table-column
      v-if="operateList.length > 0"
      fixed="right"
      label="操作"
      :width="operateWidth"
      :min-width="operateMinWidth"
      :align="operateAlign"
    >
      <template #default="{ row }">
        <slot name="operate" :row="row">
          <el-button
            v-for="item in operateList"
            :key="item.clickType"
            link
            :type="item.type || 'primary'"
            size="small"
            @click="handleClick(item, row)"
          >
            {{ item.label }}
          </el-button>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
defineOptions({
  inheritAttrs: false
})

defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  tableData: {
    type: Array,
    default: () => []
  },
  operateList: {
    type: Array,
    default: () => []
  },
  operateWidth: {
    type: [String, Number],
    default: undefined
  },
  operateMinWidth: {
    type: [String, Number],
    default: 120
  },
  operateAlign: {
    type: String,
    default: 'left'
  }
})

const emit = defineEmits(['operate-click'])

const getTagType = (column, row) => {
  if (typeof column.tagTypeMap === 'function') {
    return column.tagTypeMap(row)
  }

  return column.tagTypeMap?.[row[column.prop]]
}

const handleClick = (action, row) => {
  emit('operate-click', action, row)
}
</script>

<style scoped lang="less">
.basic-table {
  width: 100%;
}
</style>
