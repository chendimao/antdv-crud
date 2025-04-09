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
    props.item?.$attrs?.onMounted(props.item, props.formState, props.formData,);
  }

});

// 原生事件处理函数
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
  onInput: (e: Event) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, e);
    }
  },
  onChange: (value: any, label: any, extra: any) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, value, label, extra);
    }
    emit('change', props.item, value, label, extra);
  },
  onSearch: (value: string) => {
    if (props.item.$attrs?.onSearch) {
      props.item.$attrs.onSearch(value);
    }
  },
  onSelect: (value: any, node: any, extra: any) => {
    if (props.item.$attrs?.onSelect) {
      props.item.$attrs.onSelect(props.item, props.formState, props.formData, value, node, extra);
    }
  },
  onTreeExpand: (expandedKeys: string[]) => {
    if (props.item.$attrs?.onTreeExpand) {
      props.item.$attrs.onTreeExpand(expandedKeys);
    }
  },
  onClear: () => {
    if (props.item.$attrs?.onClear) {
      props.item.$attrs.onClear();
    }
  },
  onDropdownVisibleChange: (visible: boolean) => {
    if (props.item.$attrs?.onDropdownVisibleChange) {
      props.item.$attrs.onDropdownVisibleChange(visible);
    }
  },
  onLoad: (loadedKeys: string[], info: any) => {
    if (props.item.$attrs?.onLoad) {
      props.item.$attrs.onLoad(loadedKeys, info);
    }
  },
  onSubmit: (e: Event) => {
    if (props.item.$attrs?.onSubmit) {
      props.item.$attrs.onSubmit(props.item, props.formState, props.formData, e);
    }
    e.preventDefault();
  },
  onReset: (e: Event) => {
    if (props.item.$attrs?.onReset) {
      props.item.$attrs.onReset(props.item, props.formState, props.formData, e);
    }
    e.preventDefault();
  },
  onKeydown: (e: KeyboardEvent) => {
    if (props.item.$attrs?.onKeydown) {
      props.item.$attrs.onKeydown(props.item, props.formState, props.formData, e);
    }
  },
  onKeypress: (e: KeyboardEvent) => {
    if (props.item.$attrs?.onKeypress) {
      props.item.$attrs.onKeypress(props.item, props.formState, props.formData, e);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  },
  onKeyup: (e: KeyboardEvent) => {
    if (props.item.$attrs?.onKeyup) {
      props.item.$attrs.onKeyup(props.item, props.formState, props.formData, e);
    }
  },
  onClick: (e: MouseEvent) => {
    if (props.item.$attrs?.onClick) {
      props.item.$attrs.onClick(props.item, props.formState, props.formData, e);
    }
  },
  onDblclick: (e: MouseEvent) => {
    if (props.item.$attrs?.onDblclick) {
      props.item.$attrs.onDblclick(props.item, props.formState, props.formData, e);
    }
  },
  onMousedown: (e: MouseEvent) => {
    if (props.item.$attrs?.onMousedown) {
      props.item.$attrs.onMousedown(props.item, props.formState, props.formData, e);
    }
  },
  onMouseup: (e: MouseEvent) => {
    if (props.item.$attrs?.onMouseup) {
      props.item.$attrs.onMouseup(props.item, props.formState, props.formData, e);
    }
  },
  onMousemove: (e: MouseEvent) => {
    if (props.item.$attrs?.onMousemove) {
      props.item.$attrs.onMousemove(props.item, props.formState, props.formData, e);
    }
  },
  onMouseover: (e: MouseEvent) => {
    if (props.item.$attrs?.onMouseover) {
      props.item.$attrs.onMouseover(props.item, props.formState, props.formData, e);
    }
  },
  onMouseout: (e: MouseEvent) => {
    if (props.item.$attrs?.onMouseout) {
      props.item.$attrs.onMouseout(props.item, props.formState, props.formData, e);
    }
  },
  onCopy: (e: ClipboardEvent) => {
    if (props.item.$attrs?.onCopy) {
      props.item.$attrs.onCopy(props.item, props.formState, props.formData, e);
    }
  },
  onCut: (e: ClipboardEvent) => {
    if (props.item.$attrs?.onCut) {
      props.item.$attrs.onCut(props.item, props.formState, props.formData, e);
    }
  },
  onPaste: (e: ClipboardEvent) => {
    if (props.item.$attrs?.onPaste) {
      props.item.$attrs.onPaste(props.item, props.formState, props.formData, e);
    }
  },
  onDrag: (e: DragEvent) => {
    if (props.item.$attrs?.onDrag) {
      props.item.$attrs.onDrag(props.item, props.formState, props.formData, e);
    }
  },
  onDragstart: (e: DragEvent) => {
    if (props.item.$attrs?.onDragstart) {
      props.item.$attrs.onDragstart(props.item, props.formState, props.formData, e);
    }
  },
  onDragend: (e: DragEvent) => {
    if (props.item.$attrs?.onDragend) {
      props.item.$attrs.onDragend(props.item, props.formState, props.formData, e);
    }
  },
  onDragenter: (e: DragEvent) => {
    if (props.item.$attrs?.onDragenter) {
      props.item.$attrs.onDragenter(props.item, props.formState, props.formData, e);
    }
  },
  onDragover: (e: DragEvent) => {
    if (props.item.$attrs?.onDragover) {
      props.item.$attrs.onDragover(props.item, props.formState, props.formData, e);
    }
  },
  onDragleave: (e: DragEvent) => {
    if (props.item.$attrs?.onDragleave) {
      props.item.$attrs.onDragleave(props.item, props.formState, props.formData, e);
    }
  },
  onDrop: (e: DragEvent) => {
    if (props.item.$attrs?.onDrop) {
      props.item.$attrs.onDrop(props.item, props.formState, props.formData, e);
    }
  }
};
</script> 