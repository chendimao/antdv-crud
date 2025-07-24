<template>
  <div>
    <a-form-item label="默认值">
      <a-date-picker v-model:value="modelValue.value" style="width: 100%;" />
    </a-form-item>
    <a-form-item label="占位符">
      <a-input v-model:value="modelValue.$attrs.placeholder" />
    </a-form-item>
    <a-form-item label="禁用">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="显示时间">
      <a-switch v-model:checked="modelValue.$attrs.showTime" />
    </a-form-item>
    <a-form-item label="格式">
      <a-input v-model:value="modelValue.$attrs.format" placeholder="如: YYYY-MM-DD" />
    </a-form-item>
    <a-form-item label="选择器类型">
      <a-select v-model:value="modelValue.$attrs.picker">
        <a-select-option value="date">日期</a-select-option>
        <a-select-option value="week">周</a-select-option>
        <a-select-option value="month">月</a-select-option>
        <a-select-option value="quarter">季度</a-select-option>
        <a-select-option value="year">年</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="允许清除">
      <a-switch v-model:checked="modelValue.$attrs.allowClear" />
    </a-form-item>
    <a-form-item label="只读">
      <a-switch v-model:checked="modelValue.$attrs.inputReadOnly" />
    </a-form-item>
    <a-form-item label="边框">
      <a-switch v-model:checked="modelValue.$attrs.bordered" />
    </a-form-item>
    <a-form-item label="尺寸">
      <a-select v-model:value="modelValue.$attrs.size">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="small">小</a-select-option>
        <a-select-option value="large">大</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="显示今天">
      <a-switch v-model:checked="modelValue.$attrs.showToday" />
    </a-form-item>
    <a-form-item label="显示此刻">
      <a-switch v-model:checked="modelValue.$attrs.showNow" />
    </a-form-item>
    <a-form-item label="自动获取焦点">
      <a-switch v-model:checked="modelValue.$attrs.autoFocus" />
    </a-form-item>
    <a-form-item label="输入框状态">
      <a-select v-model:value="modelValue.$attrs.status">
        <a-select-option value="">无</a-select-option>
        <a-select-option value="error">错误</a-select-option>
        <a-select-option value="warning">警告</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="弹窗类名">
      <a-input v-model:value="modelValue.$attrs.popupClassName" />
    </a-form-item>
    <a-form-item label="弹窗样式">
      <a-input v-model:value="modelValue.$attrs.popupStyle" />
    </a-form-item>
    <a-form-item label="自定义类名">
      <a-input v-model:value="modelValue.$attrs.class" />
    </a-form-item>
    <a-form-item label="自定义样式">
      <a-input v-model:value="modelValue.$attrs.style" />
    </a-form-item>
    <a-form-item label="后缀图标">
      <a-input v-model:value="modelValue.$attrs.suffixIcon" />
    </a-form-item>
    <a-form-item label="面板模式">
      <a-select v-model:value="modelValue.$attrs.mode">
        <a-select-option value="date">日期</a-select-option>
        <a-select-option value="month">月份</a-select-option>
        <a-select-option value="year">年份</a-select-option>
        <a-select-option value="decade">十年</a-select-option>
        <a-select-option value="time">时间</a-select-option>
      </a-select>
    </a-form-item>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true }
});
if (!props.modelValue.$attrs) {
  props.modelValue.$attrs = {};
}
</script> 