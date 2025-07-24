<template>
  <div class="tree-options-editor">
    <div v-if="depth === 1" style="margin-bottom: 8px;">
      <a-button size="small" @click="showImportModal">批量导入</a-button>
      <a-button size="small" style="margin-left:8px;" @click="exportJson">导出JSON</a-button>
      <a-input-group compact style="margin-left:16px;" >
        <span>字段映射：</span>
        <a-input v-model:value="modelValue.$attrs.fieldNames.label" placeholder="label字段" style="width:80px;" />
        <a-input v-model:value="modelValue.$attrs.fieldNames.value" placeholder="value字段" style="width:80px; margin-left:4px;" />
        <a-input v-model:value="modelValue.$attrs.fieldNames.children" placeholder="children字段" style="width:90px; margin-left:4px;" />
      </a-input-group>
    </div>
    <draggable
      :list="option"
      :group="'tree-options'"
      :move="onMove"
      :item-key="'_uid'"
      :clone="cloneNode"
      :animation="180"
      :fallbackOnBody="true"
      :forceFallback="true"
      handle=".drag-handle"
    >
      <template #item="{element, index}">
        <div>
          <div class="tree-option-item" :class="{error: element._error}">
            <span class="drag-handle" style="cursor:move;margin-right:4px;">☰</span>
            <a-input v-model:value="element[modelValue.$attrs.fieldNames.label]" placeholder="节点名称" style="width: 100px; margin-right: 4px;" :status="element._labelError ? 'error' : ''" />
            <a-input v-if="valueType === 'string'" v-model:value="element[modelValue.$attrs.fieldNames.value]" placeholder="节点值" style="width: 80px; margin-right: 4px;" :status="element._valueError ? 'error' : ''" />
            <a-input-number v-else v-model:value="element[modelValue.$attrs.fieldNames.value]" placeholder="节点值" style="width: 80px; margin-right: 4px;" :status="element._valueError ? 'error' : ''" />
            
            <a-button size="small" @click="toggleExpand(element)">{{ element._expanded ? '收起' : '展开' }}</a-button>
            <a-button size="small" @click="addChild(index)" :disabled="maxDepth && depth >= maxDepth">子节点</a-button>
            <a-button size="small" danger @click="removeOption(index)">删除</a-button> 
          </div>
          <div v-if="element._expanded && element[modelValue.$attrs.fieldNames.children] && element[modelValue.$attrs.fieldNames.children].length" style="margin-left: 32px; margin-top: 4px;">
            <tree-options-editor
              :option="element[modelValue.$attrs.fieldNames.children]"
              :modelValue="modelValue"
              :valueType="valueType"
              :depth="depth + 1"
              :maxDepth="maxDepth"
              :maxChildren="maxChildren"
              @update:option="syncOption"
            />
          </div>
        </div>
      </template>
    </draggable>
    <a-button type="dashed" @click="addOption" style="width: 100%; margin-top: 8px;">添加节点</a-button>
    <a-modal v-if="depth === 1" v-model:visible="importModal.value" title="批量导入JSON" @ok="handleImport" @cancel="importModal.value=false">
      <a-textarea v-model:value="importJson.value" :rows="8" placeholder="粘贴JSON数组，如[{title:'A',value:1}]" />
    </a-modal>
  </div>
</template>
<script setup>
import { watch, defineProps, defineEmits, defineOptions } from 'vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import draggable from 'vuedraggable';
defineOptions({ name: 'TreeOptionsEditor' });
const props = defineProps({
  option: { type: Array, required: true },
  modelValue: { type: Object, required: true },
  valueType: { type: String, default: 'string' },
  depth: { type: Number, default: 1 },
  maxDepth: { type: Number, default: 0 },
  maxChildren: { type: Number, default: 0 }
});
const emit = defineEmits(['update:option']);

const genUid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
// 校验函数
const validateOptions = (arr) => {
  const allValues = new Set();
  const check = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach(opt => {
      opt._labelError = !opt[props.modelValue.$attrs.fieldNames.label];
      opt._valueError = !(props.modelValue.$attrs.fieldNames.value in opt) || opt[props.modelValue.$attrs.fieldNames.value] === '' || allValues.has(opt[props.modelValue.$attrs.fieldNames.value]);
      opt._error = opt._labelError || opt._valueError;
      if (!opt._valueError) allValues.add(opt[props.modelValue.$attrs.fieldNames.value]);
      if (opt[props.modelValue.$attrs.fieldNames.children]) check(opt[props.modelValue.$attrs.fieldNames.children]);
    });
  };
  check(arr);
};
// 在用户操作时手动调用
const addOption = () => {
  if (props.maxChildren && props.option.length >= props.maxChildren) return;
  const node = {};
  node[props.modelValue.$attrs.fieldNames.label] = `节点${props.option.length + 1}`;
  node[props.modelValue.$attrs.fieldNames.value] = '';
  node.icon = '';
  node.color = '';
  node.desc = '';
  node.disabled = false;
  node.visible = true;
  node[props.modelValue.$attrs.fieldNames.children] = [];
  node._expanded = true;
  node._uid = genUid();
  props.option.push(node);
  emit('update:option', props.option);
  validateOptions(props.option);
};
const removeOption = (idx) => {
  props.option.splice(idx, 1);
  emit('update:option', props.option);
  validateOptions(props.option);
};
const addChild = (idx) => {
  if (props.maxDepth && props.depth >= props.maxDepth) return;
  const childrenKey = props.modelValue.$attrs.fieldNames.children;
  if (!Array.isArray(props.option[idx][childrenKey])) props.option[idx][childrenKey] = [];
  if (props.maxChildren && props.option[idx][childrenKey].length >= props.maxChildren) return;
  const node = {};
  node[props.modelValue.$attrs.fieldNames.label] = `子节点${props.option[idx][childrenKey].length + 1}`;
  node[props.modelValue.$attrs.fieldNames.value] = '';
  node.icon = '';
  node.color = '';
  node.desc = '';
  node.disabled = false;
  node.visible = true;
  node[childrenKey] = [];
  node._expanded = true;
  node._uid = genUid();
  props.option[idx][childrenKey].push(node);
  props.option[idx]._expanded = true;
  emit('update:option', props.option);
  validateOptions(props.option);
};
const toggleExpand = (node) => node._expanded = !node._expanded;
const clipboard = { value: null };
const copyNode = (node) => clipboard.value = JSON.parse(JSON.stringify(node));
const cutNode = (node) => { clipboard.value = JSON.parse(JSON.stringify(node)); removeNode(node, props.option); };
const pasteNode = (idx) => {
  if (!clipboard.value) return;
  props.option.splice(idx + 1, 0, JSON.parse(JSON.stringify(clipboard.value)));
  emit('update:option', props.option);
};
const removeNode = (node, arr) => {
  const idx = arr.indexOf(node);
  if (idx !== -1) arr.splice(idx, 1);
  else arr.forEach(child => child[props.modelValue.$attrs.fieldNames.children] && removeNode(node, child[props.modelValue.$attrs.fieldNames.children]));
};
const onMove = (evt) => {
  if (props.maxChildren && evt.relatedContext.list.length >= props.maxChildren) return false;
  return true;
};
// input change时手动校验
const onInputChange = () => {
  validateOptions(props.option);
};
const importModal = { value: false };
const importJson = { value: '' };
const showImportModal = () => { importModal.value = true; importJson.value = JSON.stringify(props.option, null, 2); };
const handleImport = () => {
  try {
    const arr = JSON.parse(importJson.value);
    if (!Array.isArray(arr)) throw new Error('必须为数组');
    props.option.splice(0, props.option.length, ...arr);
    importModal.value = false;
    emit('update:option', props.option);
  } catch(e) { alert('JSON格式错误: ' + e.message); }
};
const exportJson = () => {
  const str = JSON.stringify(props.option, null, 2);
  navigator.clipboard.writeText(str);
  alert('已复制到剪贴板');
};
const syncOption = (val) => emit('update:option', val);
const cloneNode = (node) => JSON.parse(JSON.stringify(node));
</script>
<style scoped>
.tree-option-item { margin-bottom: 8px; display: flex; align-items: center; }
.tree-option-item.error { background: #fff1f0; }
.drag-handle { cursor: move; color: #888; }
</style> 