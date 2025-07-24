<template>
  <div>
    <a-form-item label="禁用">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="格式">
      <a-input v-model:value="modelValue.$attrs.format" placeholder="如: hex, rgb" />
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