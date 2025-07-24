<template>
  <div>
    <a-form-item label="标题">
      <a-input v-model:value="modelValue.$attrs.title" />
    </a-form-item>
    <a-form-item label="列数">
      <a-input-number v-model:value="modelValue.$attrs.column" :min="1" />
    </a-form-item>
    <a-form-item label="边框">
      <a-switch v-model:checked="modelValue.$attrs.bordered" />
    </a-form-item>
    <a-form-item label="布局">
      <a-select v-model:value="modelValue.$attrs.layout">
        <a-select-option value="horizontal">水平</a-select-option>
        <a-select-option value="vertical">垂直</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="尺寸">
      <a-select v-model:value="modelValue.$attrs.size">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="middle">中等</a-select-option>
        <a-select-option value="small">小</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="显示冒号">
      <a-switch v-model:checked="modelValue.$attrs.colon" />
    </a-form-item>
    <a-form-item label="额外内容">
      <a-input v-model:value="modelValue.$attrs.extra" />
    </a-form-item>
    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" />
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