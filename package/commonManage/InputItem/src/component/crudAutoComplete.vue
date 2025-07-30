<template>
  <a-auto-complete
    :disabled="isDisabled"
    :autofocus="item.autofocus"
    :backfill="item.backfill"
    :default-active-first-option="item.defaultActiveFirstOption"
    :default-open="item.defaultOpen"
    :dropdown-match-select-width="item.dropdownMatchSelectWidth"
    :filter-option="item.filterOption"
    :options="item?.$attrs?.options??item?.option"
    :placeholder="item?.placeholder"
    :size="item.size"
    v-model:value="inputValue"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >

    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <span v-render="() => slot(item, formState, formData,  data)"></span>
    </template>

  </a-auto-complete>
</template>

<script lang="ts" setup>
import {computed, onMounted, render} from 'vue';
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
  onMounted?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  options?: AutoCompleteOption[];
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
  option?: AutoCompleteOption[];
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
  onSelect: (value: string, option: AutoCompleteOption) => {
    setTimeout(() => {
      if (props.item.$attrs?.onSelect) {
        props.item.$attrs.onSelect(props.item, props.formState, props.formData, value, option);
      }
    }, 0);
  },
  onSearch: (value: string) => {
    setTimeout(() => {
      if (props.item.$attrs?.onSearch) {
        props.item.$attrs.onSearch(props.item, props.formState, props.formData, value);
      }
    }, 0);
  },
  onDropdownVisibleChange: (open: boolean) => {
    setTimeout(() => {
      if (props.item.$attrs?.onDropdownVisibleChange) {
        props.item.$attrs.onDropdownVisibleChange(props.item, props.formState, props.formData, open);
      }
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