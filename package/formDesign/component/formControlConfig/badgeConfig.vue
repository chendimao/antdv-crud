<template>
  <div>
    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" />
    </a-form-item>
    <a-form-item label="内容">
      <a-input v-model:value="modelValue.$attrs.text" />
    </a-form-item>
    <a-form-item label="颜色">
      <a-input v-model:value="modelValue.$attrs.color" />
    </a-form-item>
    <a-form-item label="显示点">
      <a-switch v-model:checked="modelValue.$attrs.dot" />
    </a-form-item>
    <a-form-item label="计数">
      <a-input-number v-model:value="modelValue.$attrs.count" :min="0" />
    </a-form-item>
    <a-form-item label="最大值">
      <a-input-number v-model:value="modelValue.$attrs.overflowCount" :min="0" />
    </a-form-item>
    <a-form-item label="状态点">
      <a-select v-model:value="modelValue.$attrs.status">
        <a-select-option value="">无</a-select-option>
        <a-select-option value="success">成功</a-select-option>
        <a-select-option value="processing">进行中</a-select-option>
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="error">错误</a-select-option>
        <a-select-option value="warning">警告</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="显示零值">
      <a-switch v-model:checked="modelValue.$attrs.showZero" />
    </a-form-item>
    <a-form-item label="偏移量">
      <a-input v-model:value="modelValue.$attrs.offset" placeholder="如: [10, -10]" />
    </a-form-item>
    <a-form-item label="标题">
      <a-input v-model:value="modelValue.$attrs.title" />
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