<template>
  <div>
    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" />
    </a-form-item>
    <a-form-item label="步骤">
      <a-input v-model:value="modelValue.$attrs.stepsStr" placeholder="格式: 步骤1,步骤2,步骤3" />
    </a-form-item>
    <a-form-item label="方向">
      <a-select v-model:value="modelValue.$attrs.direction">
        <a-select-option value="horizontal">横向</a-select-option>
        <a-select-option value="vertical">纵向</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="类型">
      <a-select v-model:value="modelValue.$attrs.type">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="navigation">导航</a-select-option>
        <a-select-option value="inline">内嵌</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="尺寸">
      <a-select v-model:value="modelValue.$attrs.size">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="small">小</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="当前步骤">
      <a-input-number v-model:value="modelValue.$attrs.current" :min="0" />
    </a-form-item>
    <a-form-item label="进度点">
      <a-switch v-model:checked="modelValue.$attrs.progressDot" />
    </a-form-item>
    <a-form-item label="标签放下方式">
      <a-select v-model:value="modelValue.$attrs.labelPlacement">
        <a-select-option value="horizontal">横向</a-select-option>
        <a-select-option value="vertical">纵向</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="起始序号">
      <a-input-number v-model:value="modelValue.$attrs.initial" :min="0" />
    </a-form-item>
    <a-form-item label="状态">
      <a-select v-model:value="modelValue.$attrs.status">
        <a-select-option value="process">进行中</a-select-option>
        <a-select-option value="wait">等待</a-select-option>
        <a-select-option value="finish">已完成</a-select-option>
        <a-select-option value="error">错误</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="点状步骤条">
      <a-switch v-model:checked="modelValue.$attrs.dots" />
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