<template>
  <div>
    <a-form-item label="默认值">
      <a-input v-model:value="modelValue.value" />
    </a-form-item>
    <a-form-item label="占位符">
      <a-input v-model:value="modelValue.$attrs.placeholder" />
    </a-form-item>
    <a-form-item label="允许清除">
      <a-switch v-model:checked="modelValue.$attrs.allowClear" />
    </a-form-item>
    <a-form-item label="最大长度">
      <a-input-number v-model:value="modelValue.$attrs.maxLength" :min="1" />
    </a-form-item>
    <a-form-item label="禁用">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="只读">
      <a-switch v-model:checked="modelValue.$attrs.readonly" />
    </a-form-item>
    <a-form-item label="前缀">
      <a-input v-model:value="modelValue.$attrs.prefix" />
    </a-form-item>
    <a-form-item label="后缀">
      <a-input v-model:value="modelValue.$attrs.suffix" />
    </a-form-item>
    <a-form-item label="前置标签">
      <a-input v-model:value="modelValue.$attrs.addonBefore" />
    </a-form-item>
    <a-form-item label="后置标签">
      <a-input v-model:value="modelValue.$attrs.addonAfter" />
    </a-form-item>
    <a-form-item label="显示字数">
      <a-switch v-model:checked="modelValue.$attrs.showCount" />
    </a-form-item>
    <a-form-item label="边框">
      <a-switch v-model:checked="modelValue.$attrs.bordered" />
    </a-form-item>
    <a-form-item label="尺寸">
      <a-select v-model:value="modelValue.$attrs.size">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="small">小</a-select-option>
        <a-select-option value="large">大</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="状态">
      <a-select v-model:value="modelValue.$attrs.status">
        <a-select-option value="">无</a-select-option>
        <a-select-option value="error">错误</a-select-option>
        <a-select-option value="warning">警告</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="自动获取焦点">
      <a-switch v-model:checked="modelValue.$attrs.autofocus" />
    </a-form-item>
    <a-form-item label="输入类型">
      <a-select v-model:value="modelValue.$attrs.type">
        <a-select-option value="text">文本</a-select-option>
        <a-select-option value="password">密码</a-select-option>
        <a-select-option value="number">数字</a-select-option>
        <a-select-option value="email">邮箱</a-select-option>
        <a-select-option value="tel">电话</a-select-option>
        <a-select-option value="url">URL</a-select-option>
        <a-select-option value="search">搜索</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="自动完成">
      <a-input v-model:value="modelValue.$attrs.autocomplete" placeholder="如: on/off/new-password" />
    </a-form-item>
    <a-form-item label="输入模式">
      <a-select v-model:value="modelValue.$attrs.inputmode">
        <a-select-option value="">默认</a-select-option>
        <a-select-option value="numeric">数字</a-select-option>
        <a-select-option value="decimal">小数</a-select-option>
        <a-select-option value="tel">电话</a-select-option>
        <a-select-option value="email">邮箱</a-select-option>
        <a-select-option value="search">搜索</a-select-option>
        <a-select-option value="url">URL</a-select-option>
      </a-select>
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