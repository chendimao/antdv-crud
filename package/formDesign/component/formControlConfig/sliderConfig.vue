<template>
  <div>
    <a-form-item label="最小值">
      <a-input-number v-model:value="modelValue.$attrs.min" />
    </a-form-item>
    <a-form-item label="最大值">
      <a-input-number v-model:value="modelValue.$attrs.max" />
    </a-form-item>
    <a-form-item label="步长">
      <a-input-number v-model:value="modelValue.$attrs.step" :min="0.01" :step="0.01" />
    </a-form-item>
    <a-form-item label="禁用">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="显示输入框">
      <a-switch v-model:checked="modelValue.$attrs.inputNumber" />
    </a-form-item>
    <a-form-item label="默认值">
      <a-slider v-model:value="modelValue.value" />
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