<template>
  <div>
    <a-form-item label="禁用">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="全屏">
      <a-switch v-model:checked="modelValue.$attrs.fullscreen" />
    </a-form-item>
    <a-form-item label="默认值">
      <a-date-picker v-model:value="modelValue.value" style="width: 100%;" />
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