<template>
  <el-form :model="model" class="basic-filter" :class="{ 'basic-filter--compact': compact }">
    <div class="basic-filter__fields">
      <el-form-item v-for="field in fields" :key="field.prop" :label="field.label"
        :class="{ 'basic-filter__date': field.type === 'daterange' }">
        <slot v-if="field.slot" :name="field.slot" :field="field" :model="model" />

        <el-input v-else-if="field.type === 'input'" v-model="model[field.prop]" :placeholder="field.placeholder"
          :clearable="field.clearable ?? true" />

        <el-select v-else-if="field.type === 'select'" v-model="model[field.prop]" :placeholder="field.placeholder"
          :clearable="field.clearable ?? true">
          <el-option v-for="item in field.options || []" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>

        <el-date-picker v-else-if="field.type === 'daterange'" v-model="model[field.prop]" type="daterange"
          :value-format="field.valueFormat || 'YYYY-MM-DD'" :start-placeholder="field.startPlaceholder || '开始日期'"
          :end-placeholder="field.endPlaceholder || '结束日期'" :range-separator="field.rangeSeparator || '~'"
          :clearable="field.clearable ?? true" />
      </el-form-item>
    </div>

    <div class="basic-filter__actions">
      <el-button v-if="showSearch" type="primary" :icon="Search" @click="emit('search')">{{ searchText }}</el-button>
      <el-button v-if="showReset" :icon="Refresh" @click="emit('reset')">{{ resetText }}</el-button>
      <el-button v-if="showCreate" type="primary" :icon="Plus" @click="emit('create')">{{ createText }}</el-button>
      <slot name="actions" />
    </div>
  </el-form>
</template>

<script setup>
import { Plus, Refresh, Search } from '@element-plus/icons-vue'

const model = defineModel({
  type: Object,
  required: true
})

defineProps({
  fields: {
    type: Array,
    default: () => []
  },
  searchText: {
    type: String,
    default: '查询'
  },
  resetText: {
    type: String,
    default: '重置'
  },
  createText: {
    type: String,
    default: '+ 新增'
  },
  showCreate: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  showReset: {
    type: Boolean,
    default: true
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['search', 'reset', 'create'])
</script>

<style scoped lang="less">
.basic-filter {
  padding: 18px 22px 12px;

  :deep(.el-form-item) {
    margin-right: 0;
    margin-bottom: 0;
  }

  :deep(.el-form-item__label) {
    height: 38px;
    padding-right: 12px;
    color: #303846;
    font-size: 14px;
    font-weight: 600;
    line-height: 38px;
  }

  :deep(.el-input),
  :deep(.el-select) {
    width: 196px;
  }

  :deep(.el-input__wrapper),
  :deep(.el-select__wrapper) {
    min-height: 38px;
    border-radius: 4px;
    box-shadow: 0 0 0 1px #dfe6f0 inset;
  }

  :deep(.el-input__inner),
  :deep(.el-select__placeholder) {
    color: #8a94a6;
    font-size: 13px;
  }

  :deep(.el-date-editor) {
    width: 300px;
    height: 38px;
  }
}

.basic-filter__fields {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 28px;
  row-gap: 14px;
}

.basic-filter__date {
  :deep(.el-form-item__label) {
    padding-right: 14px;
  }
}

.basic-filter__actions {
  display: flex;
  gap: 12px;
  margin-top: 18px;

  :deep(.el-button) {
    min-width: 68px;
    height: 38px;
    padding: 0 20px;
    border-radius: 4px;
    font-weight: 600;
  }

  :deep(.el-button--primary) {
    box-shadow: 0 6px 12px rgba(22, 119, 255, 0.18);
  }
}

.basic-filter--compact {
  display: flex;
  align-items: center;
  padding: 0;

  .basic-filter__fields {
    flex-wrap: nowrap;
    column-gap: 10px;
  }

  .basic-filter__actions {
    margin-top: 0;
    margin-left: auto;
  }

  :deep(.el-form-item__label) {
    display: none;
  }
}

@media (max-width: 760px) {
  .basic-filter {

    :deep(.el-input),
    :deep(.el-select),
    :deep(.el-date-editor) {
      width: 100%;
    }
  }

  .basic-filter__fields,
  .basic-filter__actions {
    align-items: stretch;
    flex-direction: column;
  }

  .basic-filter--compact {
    flex-wrap: wrap;

    .basic-filter__fields {
      flex-wrap: wrap;
    }

    .basic-filter__actions {
      margin-left: 0;
    }
  }
}
</style>
