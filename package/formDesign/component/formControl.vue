<template>
 <div  >
   <a-form :model="config" v-if="current?.name"   layout="vertical" :labelAlign="'left'" :label-col="{style: {width: '100px'}}" name="basic"   autocomplete="off">
     <a-form-item label="控件" v-if="current?.type != 'grid'">
       <a-select v-model:value="current.type" @change="handleChangeCom" >
         <a-select-option v-for="(item, index) in component" :key="index" :value="item.type" >
           {{item.text}}
         </a-select-option>
       </a-select>
     </a-form-item>
     <a-form-item label="字段标识">
       <a-input :disabled="true"  v-model:value="current.id"/>
     </a-form-item>
     <a-form-item label="字段name">
       <a-input  v-model:value="current.name"/>
     </a-form-item>
     <a-form-item label="标签名称" v-if="current?.type != 'grid'">
       <a-input  v-model:value="current.text"/>
     </a-form-item>
     <!-- <a-form-item label="栅格数量" v-else> 
      <a-slider  v-model:value="gridLength" @change="changeGridLength"  :max="10" :min="1" /> 
     </a-form-item> -->

     <a-form-item label="标签对齐方式">
       <a-radio-group  v-model:value="current.labelAlign">
         <a-radio value="left">左对齐</a-radio>
         <a-radio value="right">左对齐</a-radio>
       </a-radio-group>
     </a-form-item>
     <a-form-item label="是否必填">
       <a-switch  v-model:checked="current.isRequired"   @change="handleChangeRequire">
       </a-switch>
     </a-form-item>
     <a-form-item label="必填提示信息" v-if="current.isRequired">
       <a-input v-model:value="requireItem.message" />
     </a-form-item>

     <!-- 组件特定配置 -->
     <radio-config v-if="current?.type === 'radio'" v-model="current" />

     <a-button @click="showCodeEditor" type="primary" style="margin-top:5px;">代码编辑器</a-button>
   </a-form>
   <a-empty v-else description="未选择控件">
   </a-empty>

   <codeMirror
     ref="codeEditorRef"
     v-model:value="editorValue"
     :showType="'modal'"
     :visible="codeEditorVisible"
     :language="'javascript'"
     @update:value="handleCodeEditorChange"
     @update:visible="handleEditorVisibleChange"
   />
 </div>
</template>


<script setup>
import {defineProps, defineEmits, ref,unref, watch} from 'vue';
import {isArray} from "../../utils/is";
import { message } from 'ant-design-vue';
import codeMirror from './codeMirror.vue';
import radioConfig from './formControlConfig/radioConfig.vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { stringify, parse, safeStringify, safeParse } from '../../utils/serialization';

const props = defineProps({
  component: {},
  formConfig:{},
  currentItem:{},
})
const config = ref();
const current = ref();
const editorValue = ref('');
const requireItem = ref();
const requireIndex = ref();
const gridLength = ref(2);
const $attrs = ref();
const emits = defineEmits(['update:formConfig', 'update:currentItem'  ]);

const codeEditorRef = ref();
const codeEditorVisible = ref(false);

const FUNCTION_FLAG = 'FUNCTION_FLAG';

// 将对象转换为可编辑的字符串（函数转换为 FUNCTION_FLAG 字符串）
const convertToEditableString = (obj) => {
  try {
    // 使用自定义的 replacer 函数来处理 JSON.stringify
    return JSON.stringify(obj, (key, value) => {
      // 如果是函数，转换为 FUNCTION_FLAG 字符串
      if (typeof value === 'function') {
        const funcStr = value.toString();
        return `${FUNCTION_FLAG}${funcStr}`;
      }
      // 如果已经是 FUNCTION_FLAG 字符串，保持原样
      if (typeof value === 'string' && value.startsWith(FUNCTION_FLAG)) {
        return value;
      }
      return value;
    }, 2);
  } catch (error) {
    console.error('转换为可编辑字符串失败:', error);
    throw new Error('转换为可编辑字符串失败');
  }
};

// 将可编辑的字符串转换回对象（FUNCTION_FLAG 字符串转换为函数）
const convertFromEditableString = (str) => {
  try {
    const parsed = JSON.parse(str);
    
    const processValue = (value) => {
      if (typeof value === 'string' && value.startsWith(FUNCTION_FLAG)) {
        try {
          const funcStr = value.slice(FUNCTION_FLAG.length);
          // 如果函数字符串以 "function" 开头，直接使用
          // 否则，假设是箭头函数，需要包装一下
          const wrappedFuncStr = funcStr.trim().startsWith('function') 
            ? funcStr 
            : `${funcStr}`;
          return new Function(`return ${wrappedFuncStr}`)();
        } catch (e) {
          console.warn('函数解析失败:', e);
          return value;
        }
      }
      if (value && typeof value === 'object') {
        if (Array.isArray(value)) {
          return value.map(processValue);
        }
        const result = {};
        for (const key in value) {
          result[key] = processValue(value[key]);
        }
        return result;
      }
      return value;
    };

    return processValue(parsed);
  } catch (error) {
    console.error('从可编辑字符串转换失败:', error);
    throw new Error('从可编辑字符串转换失败');
  }
};

watch(() => props.formConfig, (data) => {
  config.value = data;
},{deep: true} )

watch(() => current, (data) => {
  console.log(data);
  emits('update:currentItem', data);
  
},{deep: true} )

watch(() => props.currentItem, (data) => {
  current.value = data;
  $attrs.value = safeStringify(current.value.$attrs);
 // gridLength.value = current.value.column.length;
  let isRequireTag = false;
console.log(current.value, props.currentItem)
  if (!isArray(current.value.rules)) {
    current.value.rules = [];
  }
 

  current.value.rules.some((item, index) => {
    if (item?.required === true) {
      isRequireTag = true;
      requireItem.value = item;
      requireIndex.value = index;
      return true;
    }
  })

  current.value.isRequired = isRequireTag;
} ,{deep: true })

watch(() => config, (data) => {
  emits('update:formConfig', data.value);
} )

function handleChangeCom(value, option) {
  emits('changeCom', value, option);
}

function handleChangeAttrs() {
  try {
    // 使用Function构造函数安全地解析字符串
    const parseObject = new Function('return ' + $attrs.value)();
    current.value.$attrs = parseObject;
    console.log('解析后的对象:', current.value.$attrs,  props.currentItem, $attrs.value);
    emits('update:currentItem', current.value);
  } catch (error) {
    console.error('解析对象失败:', error);
    message.error('解析对象失败，请检查语法是否正确');
  
  }
}

// 更改栅格数量
// function changeGridLength(value) {
//   if(current.value?.column?.length > value) {
//     current.value?.column?.splice(value, current.value?.column?.length - value);
//   } else {
//     console.log(value, current.value.column[0].span = 8);
//       current.value?.column.map(item => {
//         item.span =   Math.floor(24 / value);
//         console.log(item.span);
//         return item;
//       }); 
//       current.value?.column?.push({
//          span: 24 / value,
//          children: []
//        })
  
//   }
// }

/// 是否必填
function handleChangeRequire(ev) {
  console.log(ev);
  if (ev) {

    let isRequireTag = false;
    current.value.rules.some((item, index) => {
      if (item?.required === true) {
        isRequireTag = true;
        requireItem.value = item;
        requireIndex.value = index;
        return true;
      }
    })
    if (!isRequireTag) {
       requireItem.value = {
         required: true,
         message: `${current.value.text}不能为空`

       };
      current.value.rules.push(requireItem.value);
      requireIndex.value = current.value.rules.length - 1;
    }
  }
}

// 处理编辑器可见性变化
const handleEditorVisibleChange = (visible) => {
  codeEditorVisible.value = visible;
  if (!visible) {
    // 编辑器关闭时，尝试将字符串转回对象
    try {
      if (typeof editorValue.value === 'string') {
        const parsedValue = convertFromEditableString(editorValue.value);
        
        // 验证解析后的值是否为对象
        if (typeof parsedValue !== 'object' || parsedValue === null) {
          throw new Error('解析结果必须是对象');
        }

        // 确保必要的属性存在
        if (!parsedValue.$attrs) {
          parsedValue.$attrs = {};
        }
        if (!Array.isArray(parsedValue.rules)) {
          parsedValue.rules = [];
        }

        // 处理函数属性
        const processFunctions = (obj) => {
          if (obj && typeof obj === 'object') {
            for (const key in obj) {
              const value = obj[key];
              if (typeof value === 'string' && value.startsWith(FUNCTION_FLAG)) {
                try {
                  const funcStr = value.slice(FUNCTION_FLAG.length);
                  obj[key] = new Function(`return ${funcStr}`)();
                } catch (e) {
                  console.warn(`解析 ${key} 函数失败:`, e);
                }
              } else if (value && typeof value === 'object') {
                processFunctions(value);
              }
            }
          }
        };

        processFunctions(parsedValue);
        current.value = parsedValue;
        console.log(current.value);
        emits('update:currentItem', current.value);
      }
    } catch (error) {
      console.error('解析代码编辑器内容失败:', error);
      message.error(error.message || '解析失败，请检查代码格式是否正确');
    }
  }
};

// 处理代码编辑器值变化
const handleCodeEditorChange = (value) => {
  editorValue.value = value;
};

// 修改 showCodeEditor 方法
function showCodeEditor() {
  if (codeEditorRef.value) {
    try {
      // 直接使用 convertToEditableString，保持 FUNCTION_FLAG 字符串
      editorValue.value = convertToEditableString(current.value);
      console.log('编辑器内容:', editorValue.value);
      codeEditorRef.value.show();
    } catch (error) {
      console.error('准备编辑器内容失败:', error);
      message.error('准备编辑器内容失败，请检查数据格式');
    }
  }
}

// 修改 customStringify 方法
function customStringify(obj) {
  try {
    return convertToEditableString(obj);
  } catch (error) {
    console.error('序列化失败:', error);
    return '{}';
  }
}

// 添加选项
const addOption = () => {
  if (!current.value.$attrs.options) {
    current.value.$attrs.options = [];
  }
  current.value.$attrs.options.push({
    name: `选项${current.value.$attrs.options.length + 1}`,
    value: current.value.$attrs.options.length + 1
  });
};

// 删除选项
const removeOption = (index) => {
  current.value.$attrs.options.splice(index, 1);
};

</script>
<style scoped lang="less">
.options-config {
  .option-item {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
}
</style>