<template>
  <a-descriptions
    :disabled="isDisabled"
    :title="item.title"
    :bordered="item.bordered"
    :column="item.column"
    :size="item.size"
    :layout="item.layout"
    :colon="item.colon"
    :extra="item.extra"
    :items="inputValue"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template v-if="item.$slots?.title" #title>
      <slot name="title"></slot>
    </template>
    <template v-if="item.$slots?.extra" #extra>
      <slot name="extra"></slot>
    </template>
    <template v-if="item.$slots?.label" #label="{ item }">
      <slot name="label" :item="item"></slot>
    </template>
  </a-descriptions>
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

// 定义描述项接口
interface DescriptionItem {
  key: string;
  label: string | (() => any);
  children?: any;
  span?: number;
  labelStyle?: object;
  contentStyle?: object;
}

// 定义事件处理函数接口
interface EventHandlers {
  onFocus?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onBlur?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onInput?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onChange?: (item: any, formState: any, formData: any, items: DescriptionItem[]) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  title?: string | (() => any);
  bordered?: boolean;
  column?: number | { xxl: number; xl: number; lg: number; md: number; sm: number; xs: number };
  size?: 'default' | 'middle' | 'small';
  layout?: 'horizontal' | 'vertical';
  colon?: boolean;
  extra?: string | (() => any);
  $slots?: {
    title?: boolean;
    extra?: boolean;
    label?: boolean;
  };
}

const props = defineProps<{
  modelValue?: DescriptionItem[];
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: DescriptionItem[]): void;
  (e: 'change', item: InputFormItem, items: DescriptionItem[]): void;
}>();

const inputValue = computed({
  get: () => props.modelValue ?? [],
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
  onInput: (val: DescriptionItem[]) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
    }
  },
  onChange: (items: DescriptionItem[]) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, items);
    }
    emit('change', props.item, items);
  }
};
</script> 