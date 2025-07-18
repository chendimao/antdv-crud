<template>
  <a-form :model="formConfig" labelWrap layout="vertical" :labelAlign="'left'" :label-col="{style: {width: '100px'}}" name="basic" autocomplete="off">
    <a-form-item label="表单布局">
      <a-radio-group v-model:value="formConfig.layout" button-style="solid">
        <a-radio-button value="horizontal">水平</a-radio-button>
        <a-radio-button value="vertical">垂直</a-radio-button>
        <a-radio-button value="inline">行内</a-radio-button>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="全局标签宽度">
      <a-input v-model:value="formConfig.labelCol.style.width"/>
    </a-form-item>
    <a-form-item label="表单属性">
      <a-checkbox-group v-model:value="formConfig.attribute" :options="attributeOption" />
    </a-form-item>

    <!-- 自定义样式 -->
    <a-form-item label="自定义样式">
      <code-mirror
        v-model:value="formConfig.css"
        :options="{ 
          theme: 'monokai',
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 2,
          indentUnit: 2,
          matchBrackets: true,
          autoCloseBrackets: true,
          styleActiveLine: true
        }"
        :showSave="false"
        :language="'css'"
        :height="'200px'"
        :width="'100%'"
      />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CodeMirror from './codeMirror.vue';

const props = defineProps({
  formConfig: {
    type: Object,
    required: true
  }
});

// 确保 formConfig 有 css 属性
if (!props.formConfig.css) {
  props.formConfig.css = '';
}

const attributeOption = ref([
  {label: 'label后面显示冒号', value: 'colon'},
]);
</script>

<style scoped lang="less">
.form-config {
  :deep(.code-mirror-wrapper) {
    border: 1px solid #d9d9d9;
    border-radius: 2px;
  }
}
</style> 