<template>
  <a-avatar
    :disabled="isDisabled"
    :src="inputValue"
    :alt="item.alt"
    :gap="item.gap"
    :size="item.size"
    :shape="item.shape"
    :draggable="item.draggable"
    :crossorigin="item.crossorigin"
    :loading="item.loading"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template v-if="item.$slots?.default">
      <slot></slot>
    </template>
  </a-avatar>
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
  onChange?: (item: any, formState: any, formData: any, src: string) => void;
  onError?: (item: any, formState: any, formData: any, e: Event) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  alt?: string;
  gap?: number;
  size?: number | 'large' | 'small' | 'default' | [number, number];
  shape?: 'circle' | 'square';
  draggable?: boolean;
  crossorigin?: 'anonymous' | 'use-credentials' | '';
  loading?: boolean;
  $slots?: {
    default?: boolean;
  };
}

const props = defineProps<{
  modelValue?: string;
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', item: InputFormItem, src: string): void;
}>();

const inputValue = computed({
  get: () => props.modelValue ?? '',
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
  onInput: (val: string) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
    }
  },
  onChange: (src: string) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, src);
    }
    emit('change', props.item, src);
  },
  onError: (e: Event) => {
    if (props.item.$attrs?.onError) {
      props.item.$attrs.onError(props.item, props.formState, props.formData, e);
    }
  }
};
</script> 