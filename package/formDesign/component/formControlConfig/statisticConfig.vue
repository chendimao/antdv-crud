<template>
  <div>
    <a-form-item label="标题">
      <a-input v-model:value="modelValue.$attrs.title" />
    </a-form-item>
    <a-form-item label="数值">
      <a-input v-model:value="modelValue.$attrs.value" />
    </a-form-item>
    <a-form-item label="精度">
      <a-input-number v-model:value="modelValue.$attrs.precision" :min="0" />
    </a-form-item>
    <a-form-item label="前缀">
      <a-input v-model:value="modelValue.$attrs.prefix" />
    </a-form-item>
    <a-form-item label="后缀">
      <a-input v-model:value="modelValue.$attrs.suffix" />
    </a-form-item>
    <a-form-item label="千分分隔符">
      <a-input v-model:value="modelValue.$attrs.groupSeparator" placeholder="," />
    </a-form-item>
    <a-form-item label="小数点分隔符">
      <a-input v-model:value="modelValue.$attrs.decimalSeparator" placeholder="." />
    </a-form-item>
    <a-form-item label="自定义数值样式">
      <a-input v-model:value="modelValue.$attrs.valueStyle" placeholder="如：{ color: '#3f8600' }" />
    </a-form-item>
    <a-form-item label="加载中">
      <a-switch v-model:checked="modelValue.$attrs.loading" />
    </a-form-item>
    <a-form-item label="自定义类名">
      <a-input v-model:value="modelValue.$attrs.class" />
    </a-form-item>
    <a-form-item label="自定义样式">
      <a-input v-model:value="modelValue.$attrs.style" />
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