<template>
  <div>
    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" />
    </a-form-item>
    <a-form-item label="内容">
      <a-input v-model:value="modelValue.$attrs.text" />
    </a-form-item>
    <a-form-item label="颜色">
      <a-input v-model:value="modelValue.$attrs.color" />
    </a-form-item>
    <a-form-item label="可关闭">
      <a-switch v-model:checked="modelValue.$attrs.closable" />
    </a-form-item>
    <a-form-item label="预设色">
      <a-select v-model:value="modelValue.$attrs.preset">
        <a-select-option value="">无</a-select-option>
        <a-select-option value="success">成功</a-select-option>
        <a-select-option value="processing">进行中</a-select-option>
        <a-select-option value="error">错误</a-select-option>
        <a-select-option value="warning">警告</a-select-option>
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="magenta">洋红</a-select-option>
        <a-select-option value="red">红色</a-select-option>
        <a-select-option value="volcano">火山</a-select-option>
        <a-select-option value="orange">橙色</a-select-option>
        <a-select-option value="gold">金色</a-select-option>
        <a-select-option value="lime">青柠</a-select-option>
        <a-select-option value="green">绿色</a-select-option>
        <a-select-option value="cyan">青色</a-select-option>
        <a-select-option value="blue">蓝色</a-select-option>
        <a-select-option value="geekblue">极客蓝</a-select-option>
        <a-select-option value="purple">紫色</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="形状">
      <a-select v-model:value="modelValue.$attrs.shape">
        <a-select-option value="">默认</a-select-option>
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="round">圆角</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="边框">
      <a-switch v-model:checked="modelValue.$attrs.bordered" />
    </a-form-item>
    <a-form-item label="图标">
      <a-input v-model:value="modelValue.$attrs.icon" placeholder="请输入图标名称" />
    </a-form-item>
    <a-form-item label="显示/隐藏">
      <a-switch v-model:checked="modelValue.$attrs.visible" />
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