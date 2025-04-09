<template>
  <div>
    <a-upload
    style="width: 100%;"
    v-model:file-list="inputValue"
    :disabled="isDisabled"
    list-type="picture-card" 
    v-bind="{
      ...item.$attrs,
      ...eventHandlers,
    }"
  >
  <div  >
    <plus-outlined />
    <div style="margin-top: 8px">上传</div>
    </div>
      <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
        <div v-render="() => slot(item, formState, formData,  data)"></div>
      </template>
  </a-upload> 
  </div>
</template>

<script lang="ts" setup>
import { computed ,watch, ref, onMounted } from 'vue';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons-vue';
import type { ComponentCustomProperties } from 'vue';

// 定义全局配置接口
interface CrudGlobalConfig {
  allowClear?: boolean;
  showSearch?: boolean;
  isTrim?: boolean;
}

// 扩展全局属性
declare module 'vue' {
  interface ComponentCustomProperties {
    $crudGlobalInputConfig: CrudGlobalConfig;
  }
}

// 定义事件处理函数接口
interface EventHandlers {
  onFocus?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onBlur?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onInput?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onChange?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onPreview?: (file: any) => void;
  onRemove?: (file: any) => void;
  onDownload?: (file: any) => void;
  onSuccess?: (response: any, file: any) => void;
  onError?: (error: Error, file: any) => void;
  onProgress?: (event: any, file: any) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  allowClear?: boolean;
  action?: string;
  accept?: string;
  directory?: boolean;
  multiple?: boolean;
  uploadField?: object;
  listType?: 'text' | 'picture' | 'picture-card';
  maxCount?: number;
  showUploadList?: boolean | { showPreviewIcon?: boolean; showRemoveIcon?: boolean; showDownloadIcon?: boolean };
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<File>;
  customRequest?: (options: any) => void;
  data?: object | ((file: any) => object);
  headers?: object;
  withCredentials?: boolean;
  buttonText?: string;
}
const fileList = ref([]);
const props = defineProps<{
  modelValue?: any[];
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void;
  (e: 'change', item: InputFormItem, info: any): void;
}>();

const inputValue = computed({
  get: () => props.modelValue || [],
  set: (val) => { 
    emit('update:modelValue', val);
    //eventHandlers.onInput(val);
  }
});
 

onMounted(() => {
  if ( props.item?.initFun) {
  inputValue.value =  props.item.initFun(props.formState);
      console.log( props.item, inputValue.value, 123);
    }

    if (props.item?.$attrs?.onMounted) {
      props.item?.$attrs?.onMounted(props.item, props.formState, props.formData,);
    }

})
// 事件处理函数
const eventHandlers = {
  
  onChange: (info: any) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, info);
    }
    emit('change', props.item, info);
  },
  onPreview: (file: any) => {
    console.log(file, 114);
    if (props.item.$attrs?.onPreview) {
      props.item.$attrs.onPreview(file);
    }
  },
  onRemove: (file: any) => { 
    if (props.item.$attrs?.onRemove) {
      props.item.$attrs.onRemove(file);
    }
  },
  onDownload: (file: any) => {
    console.log(file, 126);
    if (props.item.$attrs?.onDownload) {
      props.item.$attrs.onDownload(file);
    }
  },
  
};
</script> 