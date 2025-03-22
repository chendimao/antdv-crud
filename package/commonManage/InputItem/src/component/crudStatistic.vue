<template>
  <a-statistic
    :disabled="isDisabled"
    :value="inputValue"
    :title="item.title"
    :precision="item.precision"
    :group-separator="item.groupSeparator"
    :prefix="item.prefix"
    :suffix="item.suffix"
    :value-style="item.valueStyle"
    :formatter="item.formatter"
    :loading="item.loading"
    :decimalSeparator="item.decimalSeparator"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template v-if="item.$slots?.title" #title>
      <slot name="title"></slot>
    </template>
    <template v-if="item.$slots?.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="item.$slots?.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
  </a-statistic>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
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

// 事件处理函数
const eventHandlers = {
  onFocus: (e: Event) => {
    if (props.item.$attrs?.onFocus) {
      props.item.$attrs.onFocus(props.item, props.formState, props.formData, e);
    }
  },
  onBlur: (e: Event) => {
    if (props.validateFun && props.item?.name) {
      props.validateFun(props.item.name, { trigger: 'blur' }).catch(() => {
        // 处理错误
      });
    }
    if (props.item.$attrs?.onBlur) {
      props.item.$attrs.onBlur(props.item, props.formState, props.formData, e);
    }
  },
  onInput: (val: number | string) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
    }
  },
  onChange: (value: number | string) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, value);
    }
    emit('change', props.item, value);
  },
  onFinish: () => {
    if (props.item.$attrs?.onFinish) {
      props.item.$attrs.onFinish(props.item, props.formState, props.formData);
    }
  }
};
</script> 