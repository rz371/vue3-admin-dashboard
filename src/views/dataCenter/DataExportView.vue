<!-- 数据导出 -->
<template>
  <section class="data-export-page">
    <div class="data-export-page__intro">
      <h1>数据导出</h1>
      <p>导出系统数据为多种格式，支持定时任务和数据筛选。</p>
    </div>

    <div class="data-export-page__content">
      <div class="export-panel">
        <div class="export-panel__header">
          <h3>选择导出类型</h3>
        </div>

        <div class="export-types">
          <div class="export-type-card" v-for="type in exportTypes" :key="type.value"
            :class="{ 'is-selected': selectedType === type.value }" @click="selectedType = type.value">
            <div class="export-type-icon" :class="`is-${type.color}`">
              <el-icon>
                <component :is="type.icon" />
              </el-icon>
            </div>
            <span class="export-type-name">啥啥啥{{ type.label }}</span>
            <span class="export-type-desc">{{ type.desc }}</span>
          </div>
        </div>

        <div class="export-options">
          <div class="option-group">
            <label class="option-label">导出格式</label>
            <div class="option-radio-group">
              <label class="radio-item">
                <input type="radio" v-model="exportFormat" value="excel" />
                <span>Excel (.xlsx)</span>
              </label>
              <label class="radio-item">
                <input type="radio" v-model="exportFormat" value="csv" />
                <span>CSV (.csv)</span>
              </label>
              <label class="radio-item">
                <input type="radio" v-model="exportFormat" value="json" />
                <span>JSON (.json)</span>
              </label>
            </div>
          </div>

          <div class="option-group">
            <label class="option-label">时间范围</label>
            <div class="date-range-picker">
              <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期"
                end-placeholder="结束日期" format="YYYY-MM-DD" />
            </div>
          </div>

          <div class="option-group">
            <label class="option-label">高级选项</label>
            <div class="option-checkbox-group">
              <label class="checkbox-item">
                <input type="checkbox" v-model="includeHeader" />
                <span>包含表头</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="includeTimestamp" />
                <span>包含导出时间戳</span>
              </label>
              <label class="checkbox-item">
                <input type="checkbox" v-model="compressFile" />
                <span>压缩文件</span>
              </label>
            </div>
          </div>
        </div>

        <div class="export-actions">
          <el-button type="primary" size="large" @click="handleExport">
            <el-icon>
              <Download />
            </el-icon>
            开始导出
          </el-button>
          <el-button size="large">
            <el-icon>
              <Clock />
            </el-icon>
            定时任务
          </el-button>
        </div>
      </div>

      <div class="history-panel">
        <div class="history-panel__header">
          <h3>导出历史</h3>
          <el-button type="text" class="clear-btn">清空历史</el-button>
        </div>

        <div class="history-list">
          <div class="history-item" v-for="item in exportHistory" :key="item.id">
            <div class="history-info">
              <span class="history-name">{{ item.name }}</span>
              <span class="history-time">{{ item.time }}</span>
            </div>
            <div class="history-meta">
              <span class="history-size">{{ item.size }}</span>
              <span class="history-status" :class="`is-${item.status}`">{{ item.statusText }}</span>
            </div>
            <div class="history-actions">
              <el-button link type="primary" size="small" @click="downloadFile(item)">
                下载
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
// import { FileSpreadsheet, FileText, Database, BarChart3, Download, Clock } from '@element-plus/icons-vue'

const selectedType = ref('user')
const exportFormat = ref('excel')
const dateRange = ref([])
const includeHeader = ref(true)
const includeTimestamp = ref(false)
const compressFile = ref(false)

const exportTypes = [
  { label: '用户数据', value: 'user', desc: '导出系统用户信息', icon: FileSpreadsheet, color: 'blue' },
  { label: '订单数据', value: 'order', desc: '导出订单交易记录', icon: FileText, color: 'green' },
  { label: '日志数据', value: 'log', desc: '导出系统操作日志', icon: Database, color: 'orange' },
  { label: '报表数据', value: 'report', desc: '导出统计报表', icon: BarChart3, color: 'purple' }
]

const exportHistory = [
  { id: 1, name: '用户数据_20240518.xlsx', time: '2024-05-18 10:30:45', size: '2.3 MB', status: 'success', statusText: '成功' },
  { id: 2, name: '订单数据_20240517.csv', time: '2024-05-17 16:22:31', size: '5.6 MB', status: 'success', statusText: '成功' },
  { id: 3, name: '日志数据_20240516.json', time: '2024-05-16 09:15:22', size: '12.1 MB', status: 'success', statusText: '成功' },
  { id: 4, name: '报表数据_20240515.xlsx', time: '2024-05-15 14:18:07', size: '890 KB', status: 'warning', statusText: '部分成功' },
  { id: 5, name: '用户数据_20240514.xlsx', time: '2024-05-14 11:09:33', size: '-', status: 'error', statusText: '失败' }
]

const handleExport = () => {
  console.log('Exporting:', {
    type: selectedType.value,
    format: exportFormat.value,
    dateRange: dateRange.value,
    options: {
      includeHeader: includeHeader.value,
      includeTimestamp: includeTimestamp.value,
      compressFile: compressFile.value
    }
  })
}

const downloadFile = (item) => {
  console.log('Download:', item.name)
}
</script>

<style scoped lang="less">
.data-export-page {
  display: grid;
  gap: 16px;
}

.data-export-page__intro {
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

.data-export-page__content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 16px;
}

.export-panel {
  border: 1px solid #e7ebf2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(31, 45, 61, 0.05);
}

.export-panel__header {
  padding: 20px 24px;
  border-bottom: 1px solid #e7ebf2;

  h3 {
    margin: 0;
    color: #1f2d3d;
    font-size: 16px;
    font-weight: 600;
  }
}

.export-types {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 20px 24px;
  border-bottom: 1px solid #e7ebf2;
}

.export-type-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 2px solid #e7ebf2;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4d8dff;
    background: #f8fafc;
  }

  &.is-selected {
    border-color: #1677ff;
    background: #f0f5ff;
  }
}

.export-type-icon {
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: linear-gradient(135deg, #4d8dff, #0f67ff);
  color: #fff;
  font-size: 18px;

  &.is-green {
    background: linear-gradient(135deg, #25d7a0, #13bd7d);
  }

  &.is-orange {
    background: linear-gradient(135deg, #ffbd4a, #ff970f);
  }

  &.is-purple {
    background: linear-gradient(135deg, #8b6cff, #6c4ff1);
  }
}

.export-type-name {
  color: #1f2d3d;
  font-size: 14px;
  font-weight: 600;
}

.export-type-desc {
  color: #667085;
  font-size: 12px;
}

.export-options {
  display: grid;
  gap: 20px;
  padding: 20px 24px;
  border-bottom: 1px solid #e7ebf2;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-label {
  color: #4b5563;
  font-size: 14px;
  font-weight: 600;
}

.option-radio-group,
.option-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.radio-item,
.checkbox-item {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: #4b5563;
  font-size: 13px;

  input {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
}

.export-actions {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
}

.history-panel {
  border: 1px solid #e7ebf2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(31, 45, 61, 0.05);
}

.history-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
  border-bottom: 1px solid #e7ebf2;

  h3 {
    margin: 0;
    color: #1f2d3d;
    font-size: 16px;
    font-weight: 600;
  }
}

.clear-btn {
  color: #9ca3af;
  font-size: 13px;
}

.history-list {
  padding: 8px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 6px;

  &:hover {
    background: #f9fafb;
  }
}

.history-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.history-name {
  color: #374151;
  font-size: 13px;
}

.history-time {
  color: #9ca3af;
  font-size: 12px;
}

.history-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.history-size {
  color: #6b7280;
  font-size: 12px;
}

.history-status {
  padding: 1px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;

  &.is-success {
    color: #10b981;
    background: #d1fae5;
  }

  &.is-warning {
    color: #f59e0b;
    background: #fef3c7;
  }

  &.is-error {
    color: #ef4444;
    background: #fee2e2;
  }
}

.history-actions {
  margin-left: 8px;
}

@media (max-width: 1024px) {
  .data-export-page__content {
    grid-template-columns: 1fr;
  }

  .export-types {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .export-types {
    grid-template-columns: 1fr;
  }
}
</style>