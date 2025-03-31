<template>
  <a-tabs
    :disabled="isDisabled"
    :active-key="inputValue"
    :animated="item.animated"
    :centered="item.centered"
    :hide-add="item.hideAdd"
    :size="item.size"
    :tab-position="item.tabPosition"
    :type="item.type"
    :tab-bar-gutter="item.tabBarGutter"
    :destroy-inactive-tabs="item.destroyInactiveTabs"
    :hide-remove="item.hideRemove"
    :items="item.items"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <div v-render="() => slot(item, formState, formData,  data)"></div>
    </template>
  </a-tabs>
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

// 定义标签项接口
interface TabItem {
  key: string;
  tab: string | (() => any);
  disabled?: boolean;
  closable?: boolean;
  forceRender?: boolean;
  children?: any;
}

// 定义事件处理函数接口
interface EventHandlers {
  onFocus?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onBlur?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onInput?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onChange?: (item: any, formState: any, formData: any, activeKey: string) => void;
  onTabClick?: (item: any, formState: any, formData: any, key: string, event: Event) => void;
  onEdit?: (item: any, formState: any, formData: any, targetKey: string | MouseEvent, action: 'add' | 'remove') => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  animated?: boolean | { inkBar: boolean; tabPane: boolean };
  centered?: boolean;
  hideAdd?: boolean;
  size?: 'large' | 'default' | 'small';
  tabPosition?: 'top' | 'right' | 'bottom' | 'left';
  type?: 'line' | 'card' | 'editable-card';
  tabBarGutter?: number;
  destroyInactiveTabs?: boolean;
  hideRemove?: boolean;
  items?: TabItem[];
  $slots?: {
    tabBarExtraContent?: boolean;
    addIcon?: boolean;
    removeIcon?: boolean;
    moreIcon?: boolean;
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
  (e: 'change', item: InputFormItem, activeKey: string): void;
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
  onChange: (activeKey: string) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, activeKey);
    }
    emit('change', props.item, activeKey);
  },
  onTabClick: (key: string, event: Event) => {
    if (props.item.$attrs?.onTabClick) {
      props.item.$attrs.onTabClick(props.item, props.formState, props.formData, key, event);
    }
  },
  onEdit: (targetKey: string | MouseEvent, action: 'add' | 'remove') => {
    if (props.item.$attrs?.onEdit) {
      props.item.$attrs.onEdit(props.item, props.formState, props.formData, targetKey, action);
    }
  }
};
</script> 