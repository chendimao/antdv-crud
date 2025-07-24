<template>
  <div>
    <a-form-item label="占位符">
      <a-input v-model:value="modelValue.$attrs.placeholder" />
    </a-form-item>
    <a-form-item label="禁用">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
    <a-form-item label="是否多选">
      <a-switch v-model:checked="modelValue.$attrs.multiple" />
    </a-form-item>
    <a-form-item label="是否可搜索">
      <a-switch v-model:checked="modelValue.$attrs.showSearch" />
    </a-form-item>
    <a-form-item label="允许清除">
      <a-switch v-model:checked="modelValue.$attrs.allowClear" />
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
    <a-form-item label="自动获取焦点">
      <a-switch v-model:checked="modelValue.$attrs.autofocus" />
    </a-form-item>
    <a-form-item label="显示完整路径">
      <a-switch v-model:checked="modelValue.$attrs.showAllLevels" />
    </a-form-item>
    
    <a-form-item label="默认值">
      <a-cascader v-model:value="modelValue.value" :options="modelValue.$attrs.options" :multiple="modelValue.$attrs.multiple" style="width: 100%;" />
    </a-form-item>
    <!-- 选项配置 -->
    <a-form-item label="级联选项">
      <div class="options-config">
        <tree-options-editor
          :option="modelValue.$attrs.options"
          :modelValue="modelValue"
          :valueType="modelValue.$attrs.optionsValueType"
          :depth="1"
          :maxDepth="0"
          :maxChildren="0"
        />
      </div>
    </a-form-item>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import TreeOptionsEditor from './_TreeOptionsEditor.vue';
const props = defineProps({
  modelValue: { type: Object, required: true }
});
if (!props.modelValue.$attrs) {
  props.modelValue.$attrs = {};
}
if (!Array.isArray(props.modelValue.$attrs.options)) {
  props.modelValue.$attrs.options = [
    { label: '节点1', value: '1', children: [] },
    { label: '节点2', value: '2', children: [] }
  ];
}
if (!props.modelValue.$attrs.optionsValueType) {
  props.modelValue.$attrs.optionsValueType = 'string';
}
// 保证 fieldNames 始终存在
watch(() => props.modelValue.$attrs, (val) => {
  if (!val.fieldNames) val.fieldNames = { label: 'label', value: 'value', children: 'children' };
}, { immediate: true, deep: true });
</script>

<script>
export default {
  components: {
    TreeOptionsEditor
  }
}
</script> 