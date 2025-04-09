<template>
  <a-transfer
    :disabled="isDisabled"
    :data-source="item.dataSource"
    :filter-option="item.filterOption"
    :show-search="item.showSearch??$crudGlobalInputConfig?.showSearch"
    :show-select-all="item.showSelectAll"
    :titles="item.titles"
    :target-keys="inputValue"
    :selected-keys="item.selectedKeys"
    :render="item.render"
    :list-style="item.listStyle"
    :locale="item.locale"
    :pagination="item.pagination"
    :show-search-clear="item.showSearchClear"
    :footer="item.footer"
    :children="item.children"
    :one-way="item.oneWay"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <div v-render="() => slot(item, formState, formData,  data)"></div>
    </template>
  </a-transfer>
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

// 定义数据源接口
interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

// 定义事件处理函数接口
interface EventHandlers {
  onFocus?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onBlur?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onInput?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onChange?: (item: any, formState: any, formData: any, targetKeys: string[], direction: string, moveKeys: string[]) => void;
  onScroll?: (item: any, formState: any, formData: any, direction: string, e: Event) => void;
  onSearch?: (item: any, formState: any, formData: any, direction: string, value: string) => void;
  onSelectChange?: (item: any, formState: any, formData: any, sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  dataSource: TransferItem[];
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  showSearch?: boolean;
  showSelectAll?: boolean;
  titles?: [string, string];
  selectedKeys?: string[];
  render?: (item: TransferItem) => any;
  listStyle?: object | ((style: { direction: string }) => object);
  locale?: { itemUnit: string; itemsUnit: string; searchPlaceholder: string; notFoundContent: string };
  pagination?: boolean | { pageSize: number };
  showSearchClear?: boolean;
  footer?: (props: { direction: string }) => any;
  children?: (props: { direction: string; filteredItems: TransferItem[]; selectedKeys: string[]; disabled: boolean }) => any;
  oneWay?: boolean;
  $slots?: {
    children?: boolean;
    footer?: boolean;
  };
}

const props = defineProps<{
  modelValue?: string[];
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'change', item: InputFormItem, targetKeys: string[], direction: string, moveKeys: string[]): void;
}>();

const inputValue = computed({
  get: () => props.modelValue ?? [],
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
  onInput: (val: string[]) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
    }
  },
  onChange: (targetKeys: string[], direction: string, moveKeys: string[]) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, targetKeys, direction, moveKeys);
    }
    emit('change', props.item, targetKeys, direction, moveKeys);
  },
  onScroll: (direction: string, e: Event) => {
    if (props.item.$attrs?.onScroll) {
      props.item.$attrs.onScroll(props.item, props.formState, props.formData, direction, e);
    }
  },
  onSearch: (direction: string, value: string) => {
    if (props.item.$attrs?.onSearch) {
      props.item.$attrs.onSearch(props.item, props.formState, props.formData, direction, value);
    }
  },
  onSelectChange: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    if (props.item.$attrs?.onSelectChange) {
      props.item.$attrs.onSelectChange(props.item, props.formState, props.formData, sourceSelectedKeys, targetSelectedKeys);
    }
  }
};
</script> 