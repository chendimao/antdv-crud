<template>
  <div>
    <a-form-item label="默认值">
      <a-input-number v-model:value="modelValue.value" />
    </a-form-item>
    <a-form-item label="百分比">
      <a-input-number v-model:value="modelValue.$attrs.percent" :min="0" :max="100" />
    </a-form-item>
    <a-form-item label="类型">
      <a-select v-model:value="modelValue.$attrs.type">
        <a-select-option value="line">线型</a-select-option>
        <a-select-option value="circle">圆型</a-select-option>
        <a-select-option value="dashboard">仪表盘</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="状态">
      <a-select v-model:value="modelValue.$attrs.status">
        <a-select-option value="normal">正常</a-select-option>
        <a-select-option value="success">成功</a-select-option>
        <a-select-option value="exception">异常</a-select-option>
        <a-select-option value="active">激活</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="尺寸">
      <a-select v-model:value="modelValue.$attrs.size">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="small">小</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="进度条宽度">
      <a-input-number v-model:value="modelValue.$attrs.strokeWidth" :min="1" />
    </a-form-item>
    <a-form-item label="圆形/仪表盘宽度">
      <a-input-number v-model:value="modelValue.$attrs.width" :min="1" />
    </a-form-item>
    <a-form-item label="显示文字">
      <a-switch v-model:checked="modelValue.$attrs.showInfo" />
    </a-form-item>
    <a-form-item label="成功分段百分比">
      <a-input-number v-model:value="modelValue.$attrs.successPercent" :min="0" :max="100" />
    </a-form-item>
    <a-form-item label="自定义颜色">
      <a-input v-model:value="modelValue.$attrs.strokeColor" placeholder="如: #1890ff 或 { from: '#108ee9', to: '#87d068' }" />
    </a-form-item>
    <a-form-item label="间隙角度(仪表盘)">
      <a-input-number v-model:value="modelValue.$attrs.gapDegree" :min="0" :max="360" />
    </a-form-item>
    <a-form-item label="间隙位置(仪表盘)">
      <a-select v-model:value="modelValue.$attrs.gapPosition">
        <a-select-option value="top">上</a-select-option>
        <a-select-option value="bottom">下</a-select-option>
        <a-select-option value="left">左</a-select-option>
        <a-select-option value="right">右</a-select-option>
      </a-select>
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