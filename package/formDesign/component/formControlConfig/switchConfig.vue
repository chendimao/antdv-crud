<template>
  <div>
    <a-form-item label="默认值">
      <a-switch v-model:checked="modelValue.value" />
    </a-form-item>
    <a-form-item label="禁用">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="加载中">
      <a-switch v-model:checked="modelValue.$attrs.loading" />
    </a-form-item>
    <a-form-item label="尺寸">
      <a-select v-model:value="modelValue.$attrs.size">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="small">小</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="checkedValue">
      <a-input v-model:value="modelValue.$attrs.checkedValue" placeholder="默认: true" />
    </a-form-item>
    <a-form-item label="unCheckedValue">
      <a-input v-model:value="modelValue.$attrs.unCheckedValue" placeholder="默认: false" />
    </a-form-item>
    <a-form-item label="checkedChildren">
      <a-input v-model:value="modelValue.$attrs.checkedChildren" placeholder="开关打开时的内容" />
    </a-form-item>
    <a-form-item label="unCheckedChildren">
      <a-input v-model:value="modelValue.$attrs.unCheckedChildren" placeholder="开关关闭时的内容" />
    </a-form-item>
    <a-form-item label="自动获取焦点">
      <a-switch v-model:checked="modelValue.$attrs.autofocus" />
    </a-form-item>
    <a-form-item label="边框">
      <a-switch v-model:checked="modelValue.$attrs.bordered" />
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
