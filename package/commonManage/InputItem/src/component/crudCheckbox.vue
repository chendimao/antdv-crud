<template>
  <a-checkbox-group
    v-model:value="inputValue"
    :disabled="isDisabled"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <a-checkbox v-for="option in item?.$attrs?.options??item?.option" :value="option.value">
      {{ option.label }}
    </a-checkbox>

    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <div v-render="() => slot(item, formState, formData,  data)"></div>
    </template>
  </a-checkbox-group>
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
  onMounted?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  options?: CheckboxOption[];
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  $slots?: Record<string, any>;
  option: CheckboxOption[];
  size?: 'small' | 'default' | 'large';
  toStringField?: boolean | string;
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
    if (props.item.toStringField !== false) {
        val = String(val).split(props.item?.toStringField ?? ',');
        if (val && val[0] == '') {
            val = [];
        }
    }
    
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
  onInput: (val: (string | number)[]) => {
    setTimeout(() => {
      if (props.item.$attrs?.onInput) {
        props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
      }
    }, 0);
  },
  onChange: (value: (string | number)[]) => {
    setTimeout(() => {
      if (props.item.$attrs?.onChange) {
        props.item.$attrs.onChange(props.item, props.formState, props.formData, value);
      }
      emit('change', props.item, value);
    }, 0);
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