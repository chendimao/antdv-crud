<template>
  <a-color-picker
    :disabled="isDisabled"
    :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
    :defaultValue="item.defaultValue"
    :format="item.format"
    :showText="item.showText"
    :size="item.size"
    :trigger="item.trigger"
    :presets="item.presets"
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
  onOpenChange?: (item: any, formState: any, formData: any, open: boolean) => void;
  onClear?: (item: any, formState: any, formData: any) => void;
}

interface ColorPreset {
  label: string;
  colors: string[];
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  allowClear?: boolean;
  defaultValue?: string;
  format?: 'hex' | 'rgb' | 'hsb';
  showText?: boolean;
  size?: 'small' | 'default' | 'large';
  trigger?: 'hover' | 'click';
  presets?: ColorPreset[];
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
  (e: 'change', item: InputFormItem, value: string): void;
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
  onChange: (value: string) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, value);
    }
    emit('change', props.item, value);
  },
  onOpenChange: (open: boolean) => {
    if (props.item.$attrs?.onOpenChange) {
      props.item.$attrs.onOpenChange(props.item, props.formState, props.formData, open);
    }
  },
  onClear: () => {
    if (props.item.$attrs?.onClear) {
      props.item.$attrs.onClear(props.item, props.formState, props.formData);
    }
  }
};
</script> 