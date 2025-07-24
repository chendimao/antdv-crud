<template>
  <div>
    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" />
    </a-form-item>
    <a-form-item label="占位符">
      <a-input v-model:value="modelValue.$attrs.placeholder" />
    </a-form-item>
    <a-form-item label="允许清除">
      <a-switch v-model:checked="modelValue.$attrs.allowClear" />
    </a-form-item>
    <a-form-item label="最大长度(maxLength)">
      <a-input-number v-model:value="modelValue.$attrs.maxLength" :min="1" />
    </a-form-item>
    <a-form-item label="行数(rows)">
      <a-input-number v-model:value="modelValue.$attrs.rows" :min="1" />
    </a-form-item>
    <a-form-item label="自动调整高度(autoSize)">
      <a-switch v-model:checked="modelValue.$attrs.autoSize" />
    </a-form-item>
    <a-form-item label="禁用(disabled)">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="只读(readonly)">
      <a-switch v-model:checked="modelValue.$attrs.readonly" />
    </a-form-item>
    <a-form-item label="显示字数(showCount)">
      <a-switch v-model:checked="modelValue.$attrs.showCount" />
    </a-form-item>
    <a-form-item label="边框(bordered)">
      <a-switch v-model:checked="modelValue.$attrs.bordered" />
    </a-form-item>
    <a-form-item label="尺寸(size)">
      <a-select v-model:value="modelValue.$attrs.size">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="small">小</a-select-option>
        <a-select-option value="large">大</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="状态(status)">
      <a-select v-model:value="modelValue.$attrs.status">
        <a-select-option value="">无</a-select-option>
        <a-select-option value="error">错误</a-select-option>
        <a-select-option value="warning">警告</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="自动获取焦点(autofocus)">
      <a-switch v-model:checked="modelValue.$attrs.autofocus" />
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