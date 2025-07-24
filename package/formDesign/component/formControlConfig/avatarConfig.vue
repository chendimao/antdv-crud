<template>
  <div>
    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" />
    </a-form-item>
    <a-form-item label="图片地址">
      <a-input v-model:value="modelValue.$attrs.src" />
    </a-form-item>
    <a-form-item label="形状">
      <a-select v-model:value="modelValue.$attrs.shape">
        <a-select-option value="circle">圆形</a-select-option>
        <a-select-option value="square">方形</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="大小">
      <a-input-number v-model:value="modelValue.$attrs.size" :min="16" />
    </a-form-item>
    <a-form-item label="图标">
      <a-input v-model:value="modelValue.$attrs.icon" placeholder="如: user" />
    </a-form-item>
    <a-form-item label="替代文本">
      <a-input v-model:value="modelValue.$attrs.alt" />
    </a-form-item>
    <a-form-item label="边框">
      <a-switch v-model:checked="modelValue.$attrs.bordered" />
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