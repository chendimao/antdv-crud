<template>
  <a-skeleton
    :disabled="isDisabled"
    :active="item.active"
    :avatar="item.avatar"
    :loading="item.loading"
    :paragraph="item.paragraph"
    :title="item.title"
    :round="item.round"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template v-if="item.$slots?.default">
      <slot></slot>
    </template>
  </a-skeleton>
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
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  active?: boolean;
  avatar?: boolean | { size: 'large' | 'small' | 'default' | number; shape: 'circle' | 'square' };
  loading?: boolean;
  paragraph?: boolean | { rows: number; width: number | string | Array<number | string> };
  title?: boolean | { width: number | string };
  round?: boolean;
  $slots?: {
    default?: boolean;
  };
}

const props = defineProps<{
  modelValue?: any;
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const inputValue = computed({
  get: () => props.modelValue,
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
  onInput: (val: any) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
    }
  }
};
</script> 