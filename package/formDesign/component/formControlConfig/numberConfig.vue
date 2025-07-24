<template>
  <div>
    <a-form-item label="占位符">
      <a-input v-model:value="modelValue.$attrs.placeholder" />
    </a-form-item>
    <a-form-item label="最小值">
      <a-input-number v-model:value="modelValue.$attrs.min" />
    </a-form-item>
    <a-form-item label="最大值">
      <a-input-number v-model:value="modelValue.$attrs.max" />
    </a-form-item>
    <a-form-item label="步长">
      <a-input-number v-model:value="modelValue.$attrs.step" :min="0.01" :step="0.01" />
    </a-form-item>
    <a-form-item label="精度">
      <a-input-number v-model:value="modelValue.$attrs.precision" :min="0" />
    </a-form-item>
    <a-form-item label="禁用">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="只读">
      <a-switch v-model:checked="modelValue.$attrs.readonly" />
    </a-form-item>
    <a-form-item label="显示控制按钮">
      <a-switch v-model:checked="modelValue.$attrs.controls" />
    </a-form-item>
    <a-form-item label="字符串模式">
      <a-switch v-model:checked="modelValue.$attrs.stringMode" />
    </a-form-item>
    <a-form-item label="默认值">
      <a-input-number v-model:value="modelValue.value" />
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