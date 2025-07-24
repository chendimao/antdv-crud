<template>
  <div>
    <a-form-item label="占位符">
      <a-input v-model:value="modelValue.$attrs.placeholder" />
    </a-form-item>
    <a-form-item label="允许清除">
      <a-switch v-model:checked="modelValue.$attrs.allowClear" />
    </a-form-item>
    <a-form-item label="禁用">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="多选模式">
      <a-select v-model:value="modelValue.$attrs.mode">
        <a-select-option value="">单选</a-select-option>
        <a-select-option value="multiple">多选</a-select-option>
        <a-select-option value="tags">标签</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="可搜索">
      <a-switch v-model:checked="modelValue.$attrs.showSearch" />
    </a-form-item>
    <a-form-item label="最大标签数">
      <a-input-number v-model:value="modelValue.$attrs.maxTagCount" :min="0" />
    </a-form-item>
    <a-form-item label="最大标签文本长度">
      <a-input-number v-model:value="modelValue.$attrs.maxTagTextLength" :min="0" />
    </a-form-item>
    <a-form-item label="尺寸">
      <a-select v-model:value="modelValue.$attrs.size">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="small">小</a-select-option>
        <a-select-option value="large">大</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="边框">
      <a-switch v-model:checked="modelValue.$attrs.bordered" />
    </a-form-item>
    <a-form-item label="标签值模式">
      <a-switch v-model:checked="modelValue.$attrs.labelInValue" />
    </a-form-item>
    <a-form-item label="optionLabelProp">
      <a-input v-model:value="modelValue.$attrs.optionLabelProp" placeholder="如: children" />
    </a-form-item>
    <a-form-item label="optionFilterProp">
      <a-input v-model:value="modelValue.$attrs.optionFilterProp" placeholder="如: children" />
    </a-form-item>
    <a-form-item label="默认值">
      <a-select v-model:value="modelValue.value" :options="modelValue.$attrs.options" :mode="modelValue.$attrs.mode" style="width: 100%;" />
    </a-form-item>
    <!-- 选项配置 -->
    <a-form-item label="下拉选项">
      <div class="options-config">
        <div style="margin-bottom: 8px;">
          <a-select v-model:value="modelValue.$attrs.optionsValueType" style="width: 120px; margin-right: 8px;">
            <a-select-option value="string">字符串</a-select-option>
            <a-select-option value="number">数字</a-select-option>
          </a-select>
          <span>选项值类型</span>
        </div>
        <div v-for="(option, index) in modelValue.$attrs.options" :key="index" class="option-item">
          <a-input v-model:value="option.label" placeholder="选项名称" style="width: 120px; margin-right: 8px;" />
          <a-input 
            v-if="modelValue.$attrs.optionsValueType === 'string'"
            v-model:value="option.value" 
            placeholder="选项值" 
            style="width: 120px; margin-right: 8px;" 
          />
          <a-input-number 
            v-else
            v-model:value="option.value" 
            placeholder="选项值" 
            style="width: 120px; margin-right: 8px;" 
          />
          <a-button type="link" danger @click="removeOption(index)">
            <delete-outlined />
          </a-button>
        </div>
        <a-button type="dashed" @click="addOption" style="width: 100%; margin-top: 8px;">
          <plus-outlined />添加选项
        </a-button>
      </div>
    </a-form-item>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
const props = defineProps({
  modelValue: { type: Object, required: true }
});
if (!props.modelValue.$attrs) {
  props.modelValue.$attrs = {};
}
// 初始化 options
if (!Array.isArray(props.modelValue.$attrs.options)) {
  props.modelValue.$attrs.options = [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' }
  ];
}
if (!props.modelValue.$attrs.optionsValueType) {
  props.modelValue.$attrs.optionsValueType = 'string';
}
const addOption = () => {
  props.modelValue.$attrs.options.push({
    label: `选项${props.modelValue.$attrs.options.length + 1}`,
    value: ''
  });
};
const removeOption = (index) => {
  props.modelValue.$attrs.options.splice(index, 1);
};
watch(() => props.modelValue.$attrs.optionsValueType, (val) => {
  props.modelValue.$attrs.options.forEach(option => {
    if (val === 'number') {
      option.value = option.value ? Number(option.value) : 0;
    } else {
      option.value = option.value ? String(option.value) : '';
    }
  });
});
</script>
