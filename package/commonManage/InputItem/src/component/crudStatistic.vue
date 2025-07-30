<template>
  <a-statistic
    :disabled="isDisabled"
    :value="inputValue"
    :title="item.title"

    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >

    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <div v-render="() => slot(item, formState, formData,  data)"></div>
    </template>
  </a-statistic>
</template>

<script lang="ts" setup>
import {computed, onMounted} from 'vue';
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
  onChange?: (item: any, formState: any, formData: any, value: number | string) => void;
  onFinish?: (item: any, formState: any, formData: any) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  title?: string | (() => any);
  precision?: number;
  groupSeparator?: string;
  prefix?: string | (() => any);
  suffix?: string | (() => any);
  valueStyle?: object;
  formatter?: (value: number | string) => string | number;
  loading?: boolean;
  decimalSeparator?: string;
  $slots?: {
    title?: boolean;
    prefix?: boolean;
    suffix?: boolean;
  };
}

const props = defineProps<{
  modelValue?: number | string;
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | string): void;
  (e: 'change', item: InputFormItem, value: number | string): void;
}>();

const inputValue = computed({
  get: () => props.modelValue ?? 0,
  set: (val) => {
    emit('update:modelValue', val);
    eventHandlers.onInput(val);
  }
});
onMounted(() => {
  if (props.item?.$attrs?.onMounted) {
    props.item?.$attrs?.onMounted(props.item, props.formState, props.formData);
  }
});

// 事件处理函数
const eventHandlers = {
  onFocus: (e: Event) => {
    setTimeout(() => {
      if (props.item.$attrs?.onFocus) {
        props.item.$attrs.onFocus(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onBlur: (e: Event) => {
    setTimeout(() => {
      if (props.validateFun && props.item?.name) {
        props.validateFun(props.item.name, { trigger: 'blur' }).catch(() => {
          // 处理错误
        });
      }
      if (props.item.$attrs?.onBlur) {
        props.item.$attrs.onBlur(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onInput: (val: number | string) => {
    setTimeout(() => {
      if (props.item.$attrs?.onInput) {
        props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
      }
    }, 0);
  },
  onChange: (value: number | string) => {
    setTimeout(() => {
      if (props.item.$attrs?.onChange) {
        props.item.$attrs.onChange(props.item, props.formState, props.formData, value);
      }
      emit('change', props.item, value);
    }, 0);
  }
};
</script> 