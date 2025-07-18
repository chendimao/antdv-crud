<template>
  <a-modal v-model:visible="visible" title="可视化样式配置" width="800px" @cancel="close" :footer="null">
    <a-tabs v-model:activeKey="tab">
      <a-tab-pane key="global" tab="全局样式">
        <code-mirror v-model:value="globalCss" :options="codeMirrorOptions" :language="'css'" :height="'300px'" />
      </a-tab-pane>
      <a-tab-pane
        v-for="item in formData"
        :key="item.name"
        :tab="item.text || item.name"
      >
        <code-mirror v-model:value="componentCss[item.name]" :options="codeMirrorOptions" :language="'css'" :height="'300px'" />
        <div style="margin-top:8px;color:#888;font-size:12px;">
          你可以直接写：<br>
          <b>.{{item.name}} .ant-form-item-label &gt; label { ... }</b>
        </div>
      </a-tab-pane>
    </a-tabs>
    <div style="text-align:right;margin-top:16px;">
      <a-button type="primary" @click="save">保存</a-button>
      <a-button style="margin-left:8px;" @click="close">关闭</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from 'vue';
import CodeMirror from './codeMirror.vue';

const props = defineProps({
  formConfig: { type: Object, required: true },
  formData: { type: Array, required: true }
});
const emit = defineEmits(['close']);

const visible = ref(true);
const tab = ref('global');
const globalCss = ref(props.formConfig.css || '');
const componentCss = ref({ ...props.formConfig.componentCss });

const codeMirrorOptions = {
  theme: 'monokai',
  lineNumbers: true,
  lineWrapping: true,
  tabSize: 2,
  indentUnit: 2,
  matchBrackets: true,
  autoCloseBrackets: true,
  styleActiveLine: true
};

watch(() => props.formConfig.css, (val) => {
  globalCss.value = val || '';
});
watch(() => props.formConfig.componentCss, (val) => {
  componentCss.value = { ...val };
});

function save() {
  props.formConfig.css = globalCss.value;
  props.formConfig.componentCss = { ...componentCss.value };
  emit('close');
}
function close() {
  emit('close');
}
</script>

<style scoped>
</style> 