<template>
  <a-switch
    :disabled="isDisabled"
    :checked-children="item.checkedChildren"
    :un-checked-children="item.unCheckedChildren"
    :checked-value="item.checkedValue"
    :un-checked-value="item.unCheckedValue"
    :loading="item.loading"
    :size="item.size"
    v-model:checked="inputValue"
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
  onClick?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onKeydown?: (item: any, formState: any, formData: any, ...args: any[]) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  checkedChildren?: string | number;
  unCheckedChildren?: string | number;
  checkedValue?: any;
  unCheckedValue?: any;
  loading?: boolean;
  size?: 'small' | 'default';
}

const props = defineProps<{
  modelValue?: boolean;
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', item: InputFormItem, checked: boolean): void;
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
  onInput: (val: boolean) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
    }
  },
  onChange: (checked: boolean) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, checked);
    }
    emit('change', props.item, checked);
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