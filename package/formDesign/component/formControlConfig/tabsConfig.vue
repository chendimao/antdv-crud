<template>
  <div>
    <a-form-item label="控件名称">
      <a-input v-model:value="modelValue.text" placeholder="如：tabs" />
    </a-form-item>
    <a-form-item label="字段名">
      <a-input v-model:value="modelValue.name" placeholder="如：tabs" />
    </a-form-item>
    <a-form-item label="类型">
      <a-input v-model:value="modelValue.type" disabled />
    </a-form-item>
    <a-form-item label="标签页配置">
      <div>
        <a-button type="dashed" @click="addTab" style="margin-bottom:8px;">添加标签页</a-button>
        <div v-for="(tab, idx) in modelValue.columns" :key="tab.key" style="border:1px solid #eee; margin-bottom:8px; padding:8px; border-radius:4px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <a-input v-model:value="tab.title" placeholder="标签标题" style="width:120px;" />
            <a-input v-model:value="tab.key" placeholder="唯一key" style="width:80px;" />
            <a-button size="small" danger @click="removeTab(idx)">删除</a-button>
          </div>
          <div style="margin-top:8px;">
            <span style="font-weight:600;">子表单项配置：</span>
            <template v-for="(child, cidx) in tab.children" :key="cidx">
              <component
            
              :key="cidx"
              v-if="child && child.type && configComponentMap[child.type]"
              :is="configComponentMap[child.type]"
              v-model="tab.children[cidx]"
            />
            </template>
            
            <a-button type="dashed" size="small" @click="addChild(tab)">添加子项</a-button>
          </div>
        </div>
      </div>
    </a-form-item>
    <a-divider>Tabs属性</a-divider>
    <a-form-item label="类型">
      <a-select v-model:value="modelValue.$attrs.type">
        <a-select-option value="line">线型</a-select-option>
        <a-select-option value="card">卡片</a-select-option>
        <a-select-option value="editable-card">可编辑卡片</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="居中">
      <a-switch v-model:checked="modelValue.$attrs.centered" />
    </a-form-item>
    <a-form-item label="动画切换">
      <a-switch v-model:checked="modelValue.$attrs.animated" />
    </a-form-item>
    <a-form-item label="标签位置">
      <a-select v-model:value="modelValue.$attrs.tabPosition">
        <a-select-option value="top">顶部</a-select-option>
        <a-select-option value="right">右侧</a-select-option>
        <a-select-option value="bottom">底部</a-select-option>
        <a-select-option value="left">左侧</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="尺寸">
      <a-select v-model:value="modelValue.$attrs.size">
        <a-select-option value="default">默认</a-select-option>
        <a-select-option value="middle">中等</a-select-option>
        <a-select-option value="small">小</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="销毁隐藏面板">
      <a-switch v-model:checked="modelValue.$attrs.destroyInactiveTabPane" />
    </a-form-item>
    <a-form-item label="标签间距">
      <a-input-number v-model:value="modelValue.$attrs.tabBarGutter" :min="0" />
    </a-form-item>
    <a-form-item label="隐藏添加按钮">
      <a-switch v-model:checked="modelValue.$attrs.hideAdd" />
    </a-form-item>
    <a-form-item label="隐藏删除按钮">
      <a-switch v-model:checked="modelValue.$attrs.hideRemove" />
    </a-form-item>
  </div>
</template>
<script setup>
import { ref, reactive, watch } from 'vue';
import { message } from 'ant-design-vue';
import inputConfig from './inputConfig.vue';
import selectConfig from './selectConfig.vue';
import radioConfig from './radioConfig.vue';
import numberConfig from './numberConfig.vue';
import textareaConfig from './textareaConfig.vue';
import dateConfig from './dateConfig.vue';
import statisticConfig from './statisticConfig.vue';
import sliderConfig from './sliderConfig.vue';
// ...如有其他表单项类型可继续引入

const configComponentMap = {
  text: inputConfig,
  select: selectConfig,
  radio: radioConfig,
  number: numberConfig,
  textarea: textareaConfig,
  date: dateConfig,
  statistic: statisticConfig,
  slider: sliderConfig,
  // ...如有其他类型继续补充
};

const props = defineProps({
  modelValue: { type: Object, required: true }
});

if (!props.modelValue.columns) {
  props.modelValue.columns = [];
}
// 修正历史/外部数据，保证 children 为数组且 child 有 type
props.modelValue.columns.forEach(tab => {
  if (!Array.isArray(tab.children)) tab.children = [];
  tab.children = tab.children.filter(child => child && typeof child === 'object' && child.type);
});
if (!props.modelValue.text) {
  props.modelValue.text = '标签页';
}
if (!props.modelValue.type) {
  props.modelValue.type = 'tabs';
}
if (!props.modelValue.name) {
  props.modelValue.name = 'tabs';
}

const addTab = () => {
  const idx = props.modelValue.columns.length + 1;
  props.modelValue.columns.push({
    title: `标题${idx}`,
    key: String(idx),
    children: []
  });
};
const removeTab = (idx) => {
  props.modelValue.columns.splice(idx, 1);
};
const addChild = (tab) => {
  // 默认添加一个输入框子项
  tab.children.push({
    text: '输入框',
    type: 'text',
    name: `input${tab.children.length + 1}`,
    value: '',
    span: 6,
    $attrs: {},
    rules: [],
    labelCol: { style: { width: '100px' } },
  });
};
</script> 