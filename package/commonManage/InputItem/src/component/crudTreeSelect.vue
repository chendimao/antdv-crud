<template>
  <div>
    <a-tree-select
    style="width: 100%;"
    :disabled="isDisabled"
    :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
    :show-search="$crudGlobalInputConfig?.showSearch"
    :tree-data="item.option"
    :field-names="item.fieldNames??{
      label: 'name',
      value: 'value',
      children: 'children'
    }"
    :tree-default-expand-all="item.treeDefaultExpandAll"
    :multiple="item.multiple"
    :tree-checkable="item.treeCheckable"
    :tree-default-expanded-keys="item.treeDefaultExpandedKeys"
    :tree-default-selected-keys="item.treeDefaultSelectedKeys"
    :tree-checked-strategy="item.treeCheckedStrategy"
    v-model:value="inputValue"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >

      <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
        <div v-render="() => slot(item, formState, formData,  data)"></div>
      </template>
  </a-tree-select>

  </div>
</template>

<script lang="ts" setup>
import {computed, render, getCurrentInstance, onMounted} from 'vue';
import type { ComponentCustomProperties } from 'vue';

const app = getCurrentInstance()?.appContext.app;

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
  onSubmit?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onReset?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onKeydown?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onKeypress?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onKeyup?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onClick?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDblclick?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onMousedown?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onMouseup?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onMousemove?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onMouseover?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onMouseout?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onCopy?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onCut?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onPaste?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDrag?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDragstart?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDragend?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDragenter?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDragover?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDragleave?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onDrop?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onSearch?: (value: string) => void;
  onSelect?: (value: any, node: any, extra: any) => void;
  onTreeExpand?: (expandedKeys: string[]) => void;
  onClear?: () => void;
  onDropdownVisibleChange?: (visible: boolean) => void;
  onLoad?: (loadedKeys: string[], info: any) => void;
}

interface TreeNode {
  value: string | number;
  name: string;
  children?: TreeNode[];
  disabled?: boolean;
  disableCheckbox?: boolean;
  selectable?: boolean;
  checkable?: boolean;
  isLeaf?: boolean;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  allowClear?: boolean;
  afterText?: string;
  treeData?: TreeNode[];
  treeDefaultExpandAll?: boolean;
  multiple?: boolean;
  treeCheckable?: boolean;
  treeDefaultExpandedKeys?: string[];
  treeDefaultSelectedKeys?: string[];
  treeCheckedStrategy?: 'SHOW_ALL' | 'SHOW_PARENT' | 'SHOW_CHILD';
  h?: (formState: any) => any;
  option?: TreeNode[];
  fieldNames?: {
    label: string;
    value: string;
    children: string;
  };
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
  (e: 'update:modelValue', value: any): void;
  (e: 'change', item, value: any, ...args: any[]): void;
}>();

const inputValue = computed({
  get: () => props.modelValue,
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
  onInput: (val: any) => {
    setTimeout(() => {
      if (props.item.$attrs?.onInput) {
        props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
      }
    }, 0);
  },
  onChange: (value: any, labelList: any, extra: any) => {
    setTimeout(() => {
      if (props.item.$attrs?.onChange) {
        props.item.$attrs.onChange(props.item, props.formState, props.formData, value, labelList, extra);
      }
      emit('change', props.item, value, labelList, extra);
    }, 0);
  },
  onSelect: (value: any, node: any) => {
    setTimeout(() => {
      if (props.item.$attrs?.onSelect) {
        props.item.$attrs.onSelect(props.item, props.formState, props.formData, value, node);
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
  onTreeExpand: (expandedKeys: string[]) => {
    setTimeout(() => {
      if (props.item.$attrs?.onTreeExpand) {
        props.item.$attrs.onTreeExpand(props.item, props.formState, props.formData, expandedKeys);
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