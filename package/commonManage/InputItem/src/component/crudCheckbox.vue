<template>
  <a-checkbox-group
    v-model:value="inputValue"
    :disabled="isDisabled"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <a-checkbox v-for="option in item.option" :value="option.value">
      {{ option.name }}
    </a-checkbox>
  </a-checkbox-group>
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

// 定义选项接口
interface CheckboxOption {
  name: string;
  value: string | number;
  disabled?: boolean;
}

// 定义事件处理函数接口
interface EventHandlers {
  onFocus?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onBlur?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onInput?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onChange?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onClick?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onKeydown?: (item: any, formState: any, formData: any, ...args: any[]) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  option: CheckboxOption[];
  size?: 'small' | 'default' | 'large';
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
  (e: 'update:modelValue', value: (string | number)[]): void;
  (e: 'change', item: InputFormItem, value: (string | number)[]): void;
}>();

const inputValue = computed({
  get: () => props.modelValue ?? [],
  set: (val: any) => {
    if (props.item.toString !== false) {
        val = String(val).split(props.item?.toString??',');
        if (val && val[0] == '') {
            val = [];
        }
    }
    
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
  onInput: (val: (string | number)[]) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
    }
  },
  onChange: (value: (string | number)[]) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, value);
    }
    emit('change', props.item, value);
  },
  onClick: (e: Event) => {
    if (props.item.$attrs?.onClick) {
      props.item.$attrs.onClick(props.item, props.formState, props.formData, e);
    }
  },
  onKeydown: (e: KeyboardEvent) => {
    if (props.item.$attrs?.onKeydown) {
      props.item.$attrs.onKeydown(props.item, props.formState, props.formData, e);
    }
  }
};
</script> 