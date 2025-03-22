<template>
  <a-auto-complete
    :disabled="isDisabled"
    :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
    :autofocus="item.autofocus"
    :backfill="item.backfill"
    :default-active-first-option="item.defaultActiveFirstOption"
    :default-open="item.defaultOpen"
    :dropdown-match-select-width="item.dropdownMatchSelectWidth"
    :filter-option="item.filterOption"
    :options="item.options"
    :placeholder="item.placeholder"
    :size="item.size"
    v-model:value="inputValue"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template v-if="item.$slots?.default" #default>
      <slot></slot>
    </template>
    <template v-if="item.$slots?.option" #option="{ value, label }">
      <slot name="option" :value="value" :label="label"></slot>
    </template>
  </a-auto-complete>
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
interface AutoCompleteOption {
  value: string;
  label?: string;
  disabled?: boolean;
  key?: string;
}

// 定义事件处理函数接口
interface EventHandlers {
  onFocus?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onBlur?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onInput?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onChange?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onSelect?: (item: any, formState: any, formData: any, value: string, option: AutoCompleteOption) => void;
  onSearch?: (item: any, formState: any, formData: any, value: string) => void;
  onDropdownVisibleChange?: (item: any, formState: any, formData: any, open: boolean) => void;
  onClear?: (item: any, formState: any, formData: any) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  allowClear?: boolean;
  autofocus?: boolean;
  backfill?: boolean;
  defaultActiveFirstOption?: boolean;
  defaultOpen?: boolean;
  dropdownMatchSelectWidth?: boolean | number;
  filterOption?: boolean | ((inputValue: string, option: AutoCompleteOption) => boolean);
  options?: AutoCompleteOption[];
  placeholder?: string;
  size?: 'small' | 'default' | 'large';
  $slots?: {
    default?: boolean;
    option?: boolean;
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
  onSelect: (value: string, option: AutoCompleteOption) => {
    if (props.item.$attrs?.onSelect) {
      props.item.$attrs.onSelect(props.item, props.formState, props.formData, value, option);
    }
  },
  onSearch: (value: string) => {
    if (props.item.$attrs?.onSearch) {
      props.item.$attrs.onSearch(props.item, props.formState, props.formData, value);
    }
  },
  onDropdownVisibleChange: (open: boolean) => {
    if (props.item.$attrs?.onDropdownVisibleChange) {
      props.item.$attrs.onDropdownVisibleChange(props.item, props.formState, props.formData, open);
    }
  },
  onClear: () => {
    if (props.item.$attrs?.onClear) {
      props.item.$attrs.onClear(props.item, props.formState, props.formData);
    }
  }
};
</script> 