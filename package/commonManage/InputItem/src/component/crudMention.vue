<template>
  <a-mentions
    :disabled="isDisabled"
    :autofocus="item.autofocus"
    :prefix="item.prefix"
    :split="item.split"
    :placement="item.placement"
    :options="item.option"
    :loading="item.loading"
    :rows="item.rows"
    :get-popup-container="item.getPopupContainer"
    v-model:value="inputValue"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >

    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <div v-render="() => slot(item, formState, formData,  data)"></div>
    </template>
  </a-mentions>
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
interface MentionOption {
  value: string;
  label?: string;
  disabled?: boolean;
}

// 定义事件处理函数接口
interface EventHandlers {
  onFocus?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onBlur?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onInput?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onChange?: (item: any, formState: any, formData: any, value: string) => void;
  onSelect?: (item: any, formState: any, formData: any, option: MentionOption) => void;
  onSearch?: (item: any, formState: any, formData: any, value: string, prefix: string) => void;
  onKeydown?: (item: any, formState: any, formData: any, event: KeyboardEvent) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  autofocus?: boolean;
  prefix?: string | string[];
  split?: string;
  placement?: 'top' | 'bottom';
  options?: MentionOption[];
  loading?: boolean;
  rows?: number;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  $slots?: {
    option?: boolean;
    notFoundContent?: boolean;
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
    props.item?.$attrs?.onMounted(props.item, props.formState, props.formData,);
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
  onSelect: (option: MentionOption) => {
    if (props.item.$attrs?.onSelect) {
      props.item.$attrs.onSelect(props.item, props.formState, props.formData, option);
    }
  },
  onSearch: (value: string, prefix: string) => {
    if (props.item.$attrs?.onSearch) {
      props.item.$attrs.onSearch(props.item, props.formState, props.formData, value, prefix);
    }
  },
  onKeydown: (e: KeyboardEvent) => {
    if (props.item.$attrs?.onKeydown) {
      props.item.$attrs.onKeydown(props.item, props.formState, props.formData, e);
    }
  }
};
</script> 