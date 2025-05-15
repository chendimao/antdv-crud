<template>
      <span class="aCardInput">
        <a-col :span="24" class="input-item" :class="item.class"  :offset="item.offset ? item.offset : 0">
       
        
 
              <div class="input-content" >

                                <component
                                      ref="inputItemRef"
                                     :is="componentMap[props.item.type]"
                                     v-if="componentMap[props.item.type]"
                                     v-model="inputValue"
                                     :item="props.item"
                                     :form-state="props.formState"
                                     :form-data="props.formData"
                                     :is-disabled="isDisabled"
                                     :validate-fun="validateFun"
                                     :id="id"
                                 />

                              <template v-else-if="item.type == 'origin'">
                                {{inputValue}}
                              </template>

                              <template v-else-if="item.type == 'slot'">
                                 <slot :name="item.name"  :data="{formState, inputValue, item, isDisabled, validateFun}"  ></slot>
                              </template>
                              <template v-else-if="item.type == 'dict'">
                                <a-crud-dict :api="item.api"
                                             ref="inputItemRef"
                                             :params="item.params"
                                             :is-disabled="isDisabled"
                                             :sizeField="item.sizeField"
                                             :tableField="item.tableField"
                                             :valueField="item.valueField"
                                             :selectField="item.selectField"
                                             :callbackFun="item.callbackFun"
                                             :pageField="item.pageField"
                                             :name="item.name"
                                             :transfer="item.transfer"
                                             :debounceTime="item.debounceTime"
                                             :showPage="item.showPage"
                                             v-model="inputValue" 
                                             :searchField="item.searchField"
                                             @change="handleDictChange"
                                             :attrs="item.$attrs"
                                />
                              </template>
                              <template v-else-if="item.type == 'table'">
                                <a-crud-table :isForm="true"
                                              v-if="formTable"
                                              ref="inputItemRef"
                                              @register="formTable.register"
                                              @change="handleTableChange"
                                >
                                  <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
                                        <div v-render="() => slot(item, formState, formData,  data)"></div>
                                      </template>
                                 <template v-for="_ in item.columns.filter(cItem => cItem.type == 'slot')" #[_.name]="{data}">

                                  <slot    :name="_.name" :data="data"></slot>
                                </template>
                                  <template #buttons="{data}" >
                                     <slot    name="buttons" :data="data"></slot>
                                  </template>
                                </a-crud-table>
                              </template>
              </div>
 

      </a-col>
      <a-col v-if="item.afterSpan" :span="item.afterSpan" />
      </span>


</template>

<script lang="ts" setup>
import {
  watch,
  ref,
  computed,
  onMounted,
  defineProps,
  getCurrentInstance,
  onUnmounted,
    useSlots,
  defineAsyncComponent
} from "vue";
import {isArray, isDate, isFunction, isNull, isNumber, isObject, isString} from "../../../utils/is";
import {PlusOutlined} from "@ant-design/icons-vue";
import {getOptionList, setObjToUrlParams, valueToName} from "../../../utils";
import type {inputFormModel} from "../../../model";
import ACrudDict from "../../aCrudDict.vue";
import ACrudTable from "../../aCrudTable.vue";
import useTable from "../../../hooks/useTable";
import { loadStyle, removeStyle } from '../../../utils/loadStyle';

// 定义全局配置接口
interface CrudGlobalConfig {
  allowClear?: boolean;
  showSearch?: boolean;
  isTrim?: boolean;
}


// 定义计算函数接口
interface ComputedFun {
  type: 'option' | 'function';
  api?: Function;
  params?: Record<string, any>;
  dynamicParams?: (formState: any) => Record<string, any>;
  relationField?: string;
  field?: string;
  childrenField?: string;
}
 
// 扩展 inputFormModel 接口
interface ExtendedInputFormModel extends Omit<inputFormModel, 'computedFun'> {
  $attrs?: EventHandlers & AntdvEventHandlers;
  computedFun?: ComputedFun[];
  uploadField?: {
    url: string;
    maxCount?: number;
    initCallback: (formState: any) => any;
  };
  newData?: Record<string, any>;
  primaryKey?: string;
  beforeXa0?: number;
  option?: Array<{
    value: string | number;
    name: string;
  }>;
  listField?: Array<{
    key: string;
    label: string;
    type: string;
  }>;
  api?: string;
  params?: Record<string, any>;
  sizeField?: string;
  tableField?: string;
  callbackFun?: Function;
  pageField?: string;
  name?: string;
  debounceTime?: number;
  showPage?: boolean;
  searchField?: string;
}

const { proxy } = getCurrentInstance()!;

// 声明全局配置
declare global {
  interface ComponentCustomProperties {
    $crudGlobalInputConfig: CrudGlobalConfig;
  }
}

const props = defineProps<{
  value?: any;
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: ExtendedInputFormModel;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'change', item: ExtendedInputFormModel, value: any, ...args: any[]): void;
  (e: 'value', value: any): void;
  (e: 'update:item', item: ExtendedInputFormModel): void;
}>();

const inputValue = ref<any>();
  const listKey = ref(['select', 'treeSelect', 'dict']);
const inputItem = ref<ExtendedInputFormModel>(props.item);
 
const radioStyle = ref({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});

const formTable = ref();
const inputItemRef = ref();


const componentMap = {
  // 基础输入组件
  text: defineAsyncComponent(() => import('./component/crudInput.vue')),
  number: defineAsyncComponent(() => import('./component/crudInputNumber.vue')),
  textarea: defineAsyncComponent(() => import('./component/crudTextarea.vue')),

  // 选择类组件
  select: defineAsyncComponent(() => import('./component/crudSelect.vue')),
  treeSelect: defineAsyncComponent(() => import('./component/crudTreeSelect.vue')),
  cascader: defineAsyncComponent(() => import('./component/crudCascader.vue')),
  autoComplete: defineAsyncComponent(() => import('./component/crudAutoComplete.vue')),
  radio: defineAsyncComponent(() => import('./component/crudRadio.vue')),
  checkbox: defineAsyncComponent(() => import('./component/crudCheckbox.vue')),
  switch: defineAsyncComponent(() => import('./component/crudSwitch.vue')),
  mention: defineAsyncComponent(() => import('./component/crudMention.vue')),

  // 日期时间类
  date: defineAsyncComponent(() => import('./component/crudDatePicker.vue')),
  datetime: defineAsyncComponent(() => import('./component/crudDatePicker.vue')),
  year: defineAsyncComponent(() => import('./component/crudDatePicker.vue')),
  month: defineAsyncComponent(() => import('./component/crudDatePicker.vue')),
  daterange: defineAsyncComponent(() => import('./component/crudDateRangePicker.vue')),
  time: defineAsyncComponent(() => import('./component/crudTimePicker.vue')),
  calendar: defineAsyncComponent(() => import('./component/crudCalendar.vue')),

  // 上传展示类
  upload: defineAsyncComponent(() => import('./component/crudUpload.vue')),
  rate: defineAsyncComponent(() => import('./component/crudRate.vue')),
  slider: defineAsyncComponent(() => import('./component/crudSlider.vue')),
  colorPicker: defineAsyncComponent(() => import('./component/crudColorPicker.vue')),

  // 数据展示类
  tabs: defineAsyncComponent(() => import('./component/crudTabs.vue')),
  steps: defineAsyncComponent(() => import('./component/crudSteps.vue')),
  progress: defineAsyncComponent(() => import('./component/crudProgress.vue')),
  badge: defineAsyncComponent(() => import('./component/crudBadge.vue')),
  avatar: defineAsyncComponent(() => import('./component/crudAvatar.vue')),
  descriptions: defineAsyncComponent(() => import('./component/crudDescriptions.vue')),
  statistic: defineAsyncComponent(() => import('./component/crudStatistic.vue')),
  tag: defineAsyncComponent(() => import('./component/crudTag.vue')),

  // 反馈类
  tooltip: defineAsyncComponent(() => import('./component/crudTooltip.vue')),

  // 数据传输类
  transfer: defineAsyncComponent(() => import('./component/crudTransfer.vue')),

};

const slots = useSlots();

// 加载自定义css
const handleLoadStyle = () => {
 
  const css = ` .aCardFormItem .${inputItem.value.name} {
    ${inputItem.value.css}
  }`;
  loadStyle(css, inputItem.value.cssId??inputItem.value.name, true);
}



watch(() => props.item, async (data) => {
  inputItem.value = data;
  // 如果是table
  if (inputItem.value.type === 'table') {
    const isFormParams = inputItem.value.isForm === true ? { isToolBox: true,
          toolBox: {showExport: false,showPrint: false,showRefresh: false,showSetting: false},
          isForm: true,
          pagination: {isPagination: false } } : {};
        formTable.value = new useTable({
        ...inputItem.value,
        ...isFormParams
      });
  }


  // 执行额外的函数
  if (inputItem.value?.computedFun?.length > 0) {
    for (const item of inputItem.value.computedFun) {
      if (item.type == 'option') {
        let params = item.params ?? {};
        if(item.dynamicParams) {
          params = {...params, ...item.dynamicParams(props.formState)};
        }
        if(item.api && (item.field || item.relationField)) {
          inputItem.value.option = await getOptionList(item.api, params, item.field??item.relationField??{   label: 'label', value: 'value' }, item.childrenField);
        }
      } else if (item.type == 'function') {
        // 处理函数类型
      }
    }
  }


  // 执行自定义css
  handleLoadStyle();



}, {immediate: true})



 


// 显示空格
const itemXa0 = computed(() => {
  let html = '';
  const beforeXa0 = inputItem.value?.beforeXa0 ?? 0;
  for (let i = 0; i < beforeXa0; i++) {
    html += '\xa0';
  }
  return html;
});
watch(() => props.value, async (data) => {
  inputValue.value = (isNull(data) && inputItem.value?.type != 'checkbox' ? '' : data);

  if (inputItem.value?.type == 'checkbox') {
    inputValue.value = String(inputValue.value).split(',');
    if (inputValue.value && inputValue.value[0] == '') {
      inputValue.value = [];
    }
  } 
  // else if (inputItem.value?.type == 'upload' && inputItem.value?.uploadField?.initCallback) {
  //   inputValue.value = inputItem.value.uploadField.initCallback(props.formState);
  // } 
}, {immediate: true});

watch(() => inputValue.value, (ev) => {

  if (!inputItem.value && listKey.value.includes(inputItem.value.type)) return;
  if (proxy.$crudGlobalInputConfig?.isTrim === true) {
    inputValue.value = ev?.trim ? ev.trim() : ev ;
  } 

inputChange(ev);
})
 

const inputChange = async (ev) => { 
  emit('change', inputItem.value, ev);
};
 
 
const handleDictChange = (value, data) => {
  console.log(value, data, 'dictchange')

    emit('change', inputItem.value, value,  data);
    return;

}

const handleTableChange = (value) => {
  emit('change', inputItem.value, value);
}





onUnmounted(() => {
  if (inputItem.value.css) {
    removeStyle(inputItem.value.cssId??inputItem.value.name);
  }

})



defineExpose({inputItemRef})


</script>
<script lang="ts">
export default {
  name: 'aCrudFormItem',
};
</script>
<style scoped lang="less">
.ant-input[disabled], .ant-picker-input > input[disabled], span.ant-select-selection-item {
  color:#000;
}

.ant-select-multiple .ant-select-selection-item-content {
  color:#000;
}





</style>
