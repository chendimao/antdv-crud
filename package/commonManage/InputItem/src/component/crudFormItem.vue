<template>
  <a-form-item
    :disabled="isDisabled"
    :name="item.name"
    :label="item.label"
    :rules="item.rules"
    :help="item.help"
    :extra="item.extra"
    :has-feedback="item.hasFeedback"
    :validate-status="item.validateStatus"
    :required="item.required"
    :no-style="item.noStyle"
    :label-col="item.labelCol"
    :wrapper-col="item.wrapperCol"
    :label-align="item.labelAlign"
    :colon="item.colon"
    :validate-trigger="item.validateTrigger"
    :validate-first="item.validateFirst"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template v-if="item.$slots?.label" #label>
      <slot name="label"></slot>
    </template>
    <template v-if="item.$slots?.extra" #extra>
      <slot name="extra"></slot>
    </template>
    <template v-if="item.$slots?.help" #help>
      <slot name="help"></slot>
    </template>
    <template v-if="item.$slots?.default">
      <slot></slot>
    </template>
  </a-form-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { ComponentCustomProperties } from 'vue';
import type { Rule } from 'ant-design-vue/es/form/interface';

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
}

interface InputFormItem {
  name?: string | string[];
  $attrs?: EventHandlers;
  label?: string | (() => any);
  rules?: Rule[];
  help?: string | (() => any);
  extra?: string | (() => any);
  hasFeedback?: boolean;
  validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating';
  required?: boolean;
  noStyle?: boolean;
  labelCol?: { span: number; offset?: number };
  wrapperCol?: { span: number; offset?: number };
  labelAlign?: 'left' | 'right';
  colon?: boolean;
  validateTrigger?: string | string[];
  validateFirst?: boolean;
  $slots?: {
    label?: boolean;
    extra?: boolean;
    help?: boolean;
    default?: boolean;
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
      props.validateFun(typeof props.item.name === 'string' ? props.item.name : props.item.name[0], { trigger: 'blur' }).catch(() => {
        // 处理错误
      });
    }
    if (props.item.$attrs?.onBlur) {
      props.item.$attrs.onBlur(props.item, props.formState, props.formData, e);
    }
  },
  onInput: (val: any) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
    }
  }
};
</script> 