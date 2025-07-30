<template>
 <div> 
  <a-radio-group
    :disabled="isDisabled"
    :button-style="item.buttonStyle"
    :size="item.size"
    :name="item.name"
    v-model:value="inputValue"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  > 
  <template v-if="item.option && item.option.length">
    <a-radio
      v-for="opt in item.option"
      :key="opt.value"
      :value="opt.value"
      :disabled="opt.disabled"
    >
      {{ opt.label }}
    </a-radio>
  </template>
  </a-radio-group>
 </div>
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

// 定义选项接口
interface RadioOption {
  label: string;
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
  onMounted?: (item: any, formState: any, formData: any, ...args: any[]) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  $slots?: Record<string, any>;
  option: RadioOption[];
  optionType?: 'default' | 'button';
  buttonStyle?: 'outline' | 'solid';
  size?: 'small' | 'default' | 'large';
}

const props = defineProps<{
  modelValue?: string | number;
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', item: InputFormItem, value: string | number): void;
}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    if (val !== undefined) {
      emit('update:modelValue', val);
      eventHandlers.onInput(val);
    }
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
  onInput: (val: string | number) => {
    setTimeout(() => {
      if (props.item.$attrs?.onInput) {
        props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
      }
    }, 0);
  },
  onChange: (value: string | number) => {
    setTimeout(() => {
      if (props.item.$attrs?.onChange) {
        props.item.$attrs.onChange(props.item, props.formState, props.formData, value);
      }
      
    }, 0);
    emit('change', props.item, value);
  },
  onClick: (e: Event) => {
    setTimeout(() => {
      if (props.item.$attrs?.onClick) {
        props.item.$attrs.onClick(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onKeydown: (e: KeyboardEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onKeydown) {
        props.item.$attrs.onKeydown(props.item, props.formState, props.formData, e);
      }
    }, 0);
  }
};
</script> 