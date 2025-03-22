<template>
  <a-popconfirm
    :disabled="isDisabled"
    :title="item.title"
    :description="item.description"
    :ok-text="item.okText"
    :cancel-text="item.cancelText"
    :ok-type="item.okType"
    :ok-button-props="item.okButtonProps"
    :cancel-button-props="item.cancelButtonProps"
    :arrow-point-at-center="item.arrowPointAtCenter"
    :auto-adjust-overflow="item.autoAdjustOverflow"
    :mouse-enter-delay="item.mouseEnterDelay"
    :mouse-leave-delay="item.mouseLeaveDelay"
    :overlay-class-name="item.overlayClassName"
    :overlay-style="item.overlayStyle"
    :placement="item.placement"
    :trigger="item.trigger"
    :open="inputValue"
    :icon="item.icon"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template v-if="item.$slots?.title" #title>
      <slot name="title"></slot>
    </template>
    <template v-if="item.$slots?.description" #description>
      <slot name="description"></slot>
    </template>
    <template v-if="item.$slots?.icon" #icon>
      <slot name="icon"></slot>
    </template>
    <template v-if="item.$slots?.default">
      <slot></slot>
    </template>
  </a-popconfirm>
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
  onChange?: (item: any, formState: any, formData: any, visible: boolean) => void;
  onConfirm?: (item: any, formState: any, formData: any, e?: MouseEvent) => void;
  onCancel?: (item: any, formState: any, formData: any, e?: MouseEvent) => void;
  onOpenChange?: (item: any, formState: any, formData: any, visible: boolean) => void;
  onVisibleChange?: (item: any, formState: any, formData: any, visible: boolean) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  title?: string | (() => any);
  description?: string | (() => any);
  okText?: string;
  cancelText?: string;
  okType?: 'primary' | 'ghost' | 'dashed' | 'danger' | 'link' | 'text' | 'default';
  okButtonProps?: object;
  cancelButtonProps?: object;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  overlayClassName?: string;
  overlayStyle?: object;
  placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  trigger?: 'hover' | 'focus' | 'click' | 'contextmenu';
  icon?: any;
  $slots?: {
    title?: boolean;
    description?: boolean;
    icon?: boolean;
    default?: boolean;
  };
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
  (e: 'change', item: InputFormItem, visible: boolean): void;
}>();

const inputValue = computed({
  get: () => props.modelValue ?? false,
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
  onChange: (visible: boolean) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, visible);
    }
    emit('change', props.item, visible);
  },
  onConfirm: (e?: MouseEvent) => {
    if (props.item.$attrs?.onConfirm) {
      props.item.$attrs.onConfirm(props.item, props.formState, props.formData, e);
    }
    inputValue.value = false;
  },
  onCancel: (e?: MouseEvent) => {
    if (props.item.$attrs?.onCancel) {
      props.item.$attrs.onCancel(props.item, props.formState, props.formData, e);
    }
    inputValue.value = false;
  },
  onOpenChange: (visible: boolean) => {
    if (props.item.$attrs?.onOpenChange) {
      props.item.$attrs.onOpenChange(props.item, props.formState, props.formData, visible);
    }
    inputValue.value = visible;
  },
  onVisibleChange: (visible: boolean) => {
    if (props.item.$attrs?.onVisibleChange) {
      props.item.$attrs.onVisibleChange(props.item, props.formState, props.formData, visible);
    }
    inputValue.value = visible;
  }
};
</script> 