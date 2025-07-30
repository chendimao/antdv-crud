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
  >

    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <div v-render="() => slot(item, formState, formData,  data)"></div>
    </template>
  </a-color-picker>
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
  onInput: (val: string) => {
    setTimeout(() => {
      if (props.item.$attrs?.onInput) {
        props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
      }
    }, 0);
  },
  onChange: (value: string) => {
    setTimeout(() => {
      if (props.item.$attrs?.onChange) {
        props.item.$attrs.onChange(props.item, props.formState, props.formData, value);
      }
      emit('change', props.item, value);
    }, 0);
  },
  onClear: () => {
    setTimeout(() => {
      if (props.item.$attrs?.onClear) {
        props.item.$attrs.onClear(props.item, props.formState, props.formData);
      }
    }, 0);
  }
};
</script> 