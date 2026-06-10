// 这里存放时间的js

// 获取 xxx 几天前的日期
export function getBeforeDate(days) {
    const date = new Date()
    date.setDate(date.getDate() - days)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}