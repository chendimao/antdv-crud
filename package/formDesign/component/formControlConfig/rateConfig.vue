<template>
  <div>
    <a-form-item label="默认值">
      <a-input-number v-model:value="modelValue.value" />
    </a-form-item>
    <a-form-item label="最大星数">
      <a-input-number v-model:value="modelValue.$attrs.count" :min="1" />
    </a-form-item>
    <a-form-item label="允许半选">
      <a-switch v-model:checked="modelValue.$attrs.allowHalf" />
    </a-form-item>
    <a-form-item label="禁用">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="允许清除">
      <a-switch v-model:checked="modelValue.$attrs.allowClear" />
    </a-form-item>
    <a-form-item label="自动获取焦点">
      <a-switch v-model:checked="modelValue.$attrs.autofocus" />
    </a-form-item>
    <a-form-item label="自定义字符">
      <a-input v-model:value="modelValue.$attrs.character" placeholder="如: ★" />
    </a-form-item>
    <a-form-item label="工具提示">
      <a-input v-model:value="modelValue.$attrs.tooltips" placeholder="如: ['差','一般','好']" />
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