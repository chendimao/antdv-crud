<template>
  <a-rate
    :disabled="isDisabled"
    :allow-half="item.allowHalf"
    :allow-clear="item.allowClear"
    :character="item.character"
    :count="item.count"
    :tooltips="item.tooltips"
    :auto-focus="item.autoFocus"
    v-model:value="inputValue"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  />
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
  onChange?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onHoverChange?: (item: any, formState: any, formData: any, value: number) => void;
  onKeydown?: (item: any, formState: any, formData: any, ...args: any[]) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  allowHalf?: boolean;
  allowClear?: boolean;
  character?: string;
  count?: number;
  tooltips?: string[];
  autoFocus?: boolean;
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
  (e: 'change', item: InputFormItem, value: number): void;
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
  onChange: (value: number) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, value);
    }
    emit('change', props.item, value);
  },
  onHoverChange: (value: number) => {
    if (props.item.$attrs?.onHoverChange) {
      props.item.$attrs.onHoverChange(props.item, props.formState, props.formData, value);
    }
  },
  onKeydown: (e: KeyboardEvent) => {
    if (props.item.$attrs?.onKeydown) {
      props.item.$attrs.onKeydown(props.item, props.formState, props.formData, e);
    }
  }
};
</script> 