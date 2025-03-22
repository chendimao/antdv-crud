<template>
  <a-progress
    :disabled="isDisabled"
    :percent="inputValue"
    :format="item.format"
    :status="item.status"
    :stroke-linecap="item.strokeLinecap"
    :stroke-color="item.strokeColor"
    :success-percent="item.successPercent"
    :type="item.type"
    :show-info="item.showInfo"
    :steps="item.steps"
    :stroke-width="item.strokeWidth"
    :width="item.width"
    :gap-degree="item.gapDegree"
    :gap-position="item.gapPosition"
    :size="item.size"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template v-if="item.$slots?.format" #format="{ percent, successPercent }">
      <slot name="format" :percent="percent" :success-percent="successPercent"></slot>
    </template>
  </a-progress>
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
  onChange?: (item: any, formState: any, formData: any, percent: number) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  format?: (percent?: number, successPercent?: number) => string | number;
  status?: 'success' | 'exception' | 'normal' | 'active';
  strokeLinecap?: 'round' | 'square';
  strokeColor?: string | { from: string; to: string } | string[];
  successPercent?: number;
  type?: 'line' | 'circle' | 'dashboard';
  showInfo?: boolean;
  steps?: number;
  strokeWidth?: number;
  width?: number;
  gapDegree?: number;
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'default' | 'small';
  $slots?: {
    format?: boolean;
  };
}

const props = defineProps<{
  modelValue?: number;
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', item: InputFormItem, percent: number): void;
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
  onInput: (val: number) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
    }
  },
  onChange: (percent: number) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, percent);
    }
    emit('change', props.item, percent);
  }
};
</script> 