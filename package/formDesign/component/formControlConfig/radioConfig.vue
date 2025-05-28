<template>
  <div class="radio-config">
    <!-- RadioGroup 配置 -->
  

    <a-form-item label="禁用状态">
      <a-switch v-model:checked="modelValue.$attrs.disabled" />
    </a-form-item>
 

    <!-- 选项配置 -->
    <a-form-item label="选项配置">
      <div class="options-config">
        <div v-for="(option, index) in modelValue.$attrs.options" :key="index" class="option-item">
          <a-input v-model:value="option.label" placeholder="选项名称" style="width: 120px; margin-right: 8px;" />
          <a-select v-model:value="option.valueType" style="width: 80px; margin-right: 8px;" @change="handleValueTypeChange(index)">
            <a-select-option value="string">字符串</a-select-option>
            <a-select-option value="number">数字</a-select-option>
          </a-select>
          <a-input 
            v-if="option.valueType === 'string'"
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
          <a-switch v-model:checked="option.disabled" style="margin-right: 8px;" />
          <span style="margin-right: 8px;">禁用</span>
          <a-button type="link" danger @click="removeOption(index)">
            <delete-outlined />
          </a-button>
        </div>
        <a-button type="dashed" @click="addOption" style="width: 100%; margin-top: 8px;">
          <plus-outlined />添加选项
        </a-button>
      </div>
    </a-form-item>

    <a-form-item label="选项类型">
      <a-radio-group v-model:value="modelValue.$attrs.optionType">
        <a-radio value="default">默认</a-radio>
        <a-radio value="button">按钮</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="按钮样式">
      <a-radio-group v-model:value="modelValue.$attrs.buttonStyle">
        <a-radio value="outline">描边</a-radio>
        <a-radio value="solid">填色</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="大小">
      <a-radio-group v-model:value="modelValue.$attrs.size">
        <a-radio value="large">大</a-radio>
        <a-radio value="default">默认</a-radio>
        <a-radio value="small">小</a-radio>
      </a-radio-group>
    </a-form-item>

    <!-- Radio 配置 -->
    <a-form-item label="自动获取焦点">
      <a-switch v-model:checked="modelValue.$attrs.autofocus" />
    </a-form-item>

    <a-form-item label="选中状态">
      <a-switch v-model:checked="modelValue.$attrs.checked" />
    </a-form-item>

    <a-form-item label="默认值">
      <div class="default-value-config">
        <a-select v-model:value="modelValue.$attrs.defaultValueType" style="width: 120px; margin-right: 8px;" @change="handleDefaultValueTypeChange">
          <a-select-option value="string">字符串</a-select-option>
          <a-select-option value="number">数字</a-select-option>
        </a-select>
        <a-input 
          v-if="modelValue.$attrs.defaultValueType === 'string'"
          v-model:value="modelValue.value" 
          placeholder="请输入默认值" 
          style="width: calc(100% - 88px);" 
        />
        <a-input-number 
          v-else
          v-model:value="modelValue.value" 
          placeholder="请输入默认值" 
          style="width: calc(100% - 88px);" 
        />
      </div>
    </a-form-item>

    <!-- 事件处理 -->
    <a-form-item label="事件处理">
      <a-button @click="showEventCodeEditor" type="primary" style="margin-top:5px;">编辑事件处理</a-button>
    </a-form-item>

    <!-- 事件处理代码编辑器模态框 -->
    <a-modal
      v-model:visible="eventEditorVisible"
      title="事件处理代码编辑"
      width="100%"
      :footer="null"
      wrap-class-name="full-modal"
      :bodyStyle="{ padding: '0' }"
      :style="{ top: 0 }"
      :destroyOnClose="true"
    >
      <div style="height: calc(100vh - 130px);">
        <a-tabs v-model:activeKey="activeEventTab">
          <a-tab-pane key="onChange" tab="change 事件">
            <code-mirror
              v-model:value="eventCodeMap.onChange"
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
              :showCheckSyntax="false"
              :showSave="false"
              :showCancel="false"
              :showFooter="false"
              :language="'javascript'"
              :height="'calc(100vh - 180px)'"
              :width="'100%'"
              @update:value="(value) => handleCodeChange('onChange', value)"
            />
          </a-tab-pane>
          <a-tab-pane key="onFocus" tab="focus 事件">
            <code-mirror
              v-model:value="eventCodeMap.onFocus"
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
              :showCheckSyntax="false"
              :showSave="false"
              :showCancel="false"
              :showFooter="false"
              :language="'javascript'"
              :height="'calc(100vh - 180px)'"
              :width="'100%'"
              @update:value="(value) => handleCodeChange('onFocus', value)"
            />
          </a-tab-pane>
          <a-tab-pane key="onBlur" tab="blur 事件">
            <code-mirror
              v-model:value="eventCodeMap.onBlur"
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
              :showCheckSyntax="false"
              :showSave="false"
              :showCancel="false"
              :showFooter="false"
              :language="'javascript'"
              :height="'calc(100vh - 180px)'"
              :width="'100%'"
              @update:value="(value) => handleCodeChange('onBlur', value)"
            />
          </a-tab-pane>
        </a-tabs>
        <div class="editor-footer">
          <a-button @click="cancelEdit">取消</a-button>
          <a-button type="primary" @click="saveEventHandlers" style="margin-left: 8px;">保存</a-button>
        </div>
      </div>
    </a-modal>

    <!-- 额外样式 -->
    <a-form-item label="自定义样式">
      <code-mirror
        v-model:value="modelValue.css"
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

    
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import CodeMirror from '../codeMirror.vue';
import {message} from "ant-design-vue";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

// 初始化配置
const initConfig = () => {
  // 确保 $attrs 存在
  if (!props.modelValue.$attrs) {
    props.modelValue.$attrs = {};
  }

  // 处理 options 优先级
  const options = props.modelValue.$attrs.options || props.modelValue.options || [
    { label: '选项1', value: 1, valueType: 'number', disabled: false },
    { label: '选项2', value: 2, valueType: 'number', disabled: false }
  ];

  // 确保每个选项都有 valueType
  options.forEach(option => {
    if (!option.valueType) {
      option.valueType = typeof option.value === 'number' ? 'number' : 'string';
    }
  });

  // 初始化所有配置项
  const defaultConfig = {
    // RadioGroup 配置
    buttonStyle: props.modelValue.$attrs.buttonStyle || 'outline',
    disabled: props.modelValue.$attrs.disabled || false,
    name: props.modelValue.$attrs.name || '',
    options: options,
    optionType: props.modelValue.$attrs.optionType || 'default',
    size: props.modelValue.$attrs.size || 'default',
    value: props.modelValue.value || '',
    defaultValueType: props.modelValue.$attrs.defaultValueType || (typeof props.modelValue.value === 'number' ? 'number' : 'string'),

    // Radio 配置
    autofocus: props.modelValue.$attrs.autofocus || false,
    checked: props.modelValue.$attrs.checked || false,

    // 事件处理
    onChange: props.modelValue.$attrs.onChange || (() => {})
  };

  // 更新配置
  Object.assign(props.modelValue.$attrs, defaultConfig);
  
  // 确保 options 同步到 modelValue
  props.modelValue.options = options;

  // 初始化 css 属性
  if (!props.modelValue.css) {
    props.modelValue.css = '';
  }
};

// 监听 modelValue 变化，初始化配置
watch(() => props.modelValue, () => {
  initConfig();
}, { immediate: true, deep: true });

// 处理选项值类型变化
const handleValueTypeChange = (index) => {
  const option = props.modelValue.$attrs.options[index];
  if (option.valueType === 'number') {
    option.value = option.value ? Number(option.value) : 0;
  } else {
    option.value = option.value ? String(option.value) : '';
  }
};

// 添加选项
const addOption = () => {
  const options = props.modelValue.$attrs.options || props.modelValue.options || [];
  const newOption = {
    label: `选项${options.length + 1}`,
    value: options.length + 1,
    valueType: 'number',
    disabled: false
  };
  
  // 同时更新两个位置
  if (!props.modelValue.$attrs.options) {
    props.modelValue.$attrs.options = [];
  }
  props.modelValue.$attrs.options.push(newOption);
  props.modelValue.options = props.modelValue.$attrs.options;
};

// 删除选项
const removeOption = (index) => {
  if (props.modelValue.$attrs.options) {
    props.modelValue.$attrs.options.splice(index, 1);
    props.modelValue.options = props.modelValue.$attrs.options;
  } else if (props.modelValue.options) {
    props.modelValue.options.splice(index, 1);
  }
};

// 方法
const handleFocus = () => {
  // 实现 focus 方法
  console.log('focus');
};

const handleBlur = () => {
  // 实现 blur 方法
  console.log('blur');
};

// 处理默认值类型变化
const handleDefaultValueTypeChange = () => {
  if (props.modelValue.$attrs.defaultValueType === 'number') {
    props.modelValue.value = props.modelValue.value ? Number(props.modelValue.value) : 0;
  } else {
    props.modelValue.value = props.modelValue.value ? String(props.modelValue.value) : '';
  }
};

// 事件编辑器相关
const eventEditorVisible = ref(false);
const activeEventTab = ref('onChange');
const eventCodeMap = ref({
  onChange: '',
  onFocus: '',
  onBlur: ''
});
const originalEventCodeMap = ref({
  onChange: '',
  onFocus: '',
  onBlur: ''
});

// 显示事件编辑器
const showEventCodeEditor = () => {
  // 将函数转换为字符串
  eventCodeMap.value.onChange = typeof props.modelValue.$attrs.onChange === 'function' 
    ? props.modelValue.$attrs.onChange.toString().replace(/^function\s*\(/, 'function(') 
    : (props.modelValue.$attrs.onChange || '');
  eventCodeMap.value.onFocus = typeof props.modelValue.$attrs.onFocus === 'function' 
    ? props.modelValue.$attrs.onFocus.toString().replace(/^function\s*\(/, 'function(') 
    : (props.modelValue.$attrs.onFocus || '');
  eventCodeMap.value.onBlur = typeof props.modelValue.$attrs.onBlur === 'function' 
    ? props.modelValue.$attrs.onBlur.toString().replace(/^function\s*\(/, 'function(') 
    : (props.modelValue.$attrs.onBlur || '');
  
  // 保存原始值
  originalEventCodeMap.value = JSON.parse(JSON.stringify(eventCodeMap.value));
  
  eventEditorVisible.value = true;
};

// 处理代码变化
const handleCodeChange = (eventName, value) => {
  eventCodeMap.value[eventName] = value || '';
};

// 保存事件处理函数
const saveEventHandlers = () => {
  try {
    // 验证并转换代码为函数
    const convertToFunction = (code) => {
      if (!code.trim()) return null;
      try {
        // 尝试将代码转换为函数
        const funcStr = code.trim();
        // 如果代码不是以 function 开头，包装成函数
        // const wrappedCode = funcStr.startsWith('function') 
        //   ? funcStr 
        //   : `function(e) { ${funcStr} }`;
        return new Function('return ' + funcStr)();
      } catch (e) {
        throw new Error(`函数转换失败: ${e.message}`);
      }
    };

    // 转换并保存事件处理函数
    props.modelValue.$attrs.onChange = convertToFunction(eventCodeMap.value.onChange);
    props.modelValue.$attrs.onFocus = convertToFunction(eventCodeMap.value.onFocus);
    props.modelValue.$attrs.onBlur = convertToFunction(eventCodeMap.value.onBlur);
    console.log(props.modelValue, eventCodeMap.value.onChange)
    // 触发更新
    emit('update:modelValue', props.modelValue);
    
    eventEditorVisible.value = false;
    message.success('事件处理函数保存成功');
  } catch (e) {
    console.error('事件处理函数解析错误:', e);
    message.error(e.message || '事件处理函数语法错误，请检查代码');
  }
};

// 取消编辑
const cancelEdit = () => {
  // 恢复原始值
  eventCodeMap.value = JSON.parse(JSON.stringify(originalEventCodeMap.value));
  eventEditorVisible.value = false;
};
</script>

<style scoped lang="less">
.radio-config {
  .options-config {
    .option-item {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
  }
  .default-value-config {
    display: flex;
    align-items: center;
  }
}

:deep(.full-modal) {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .ant-modal-body {
    flex: 1;
  }
}

.editor-footer {
  padding: 10px;
  text-align: right;
  border-top: 1px solid #f0f0f0;
}
</style> 