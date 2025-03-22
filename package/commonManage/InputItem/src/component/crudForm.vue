<template>
  <a-form
    :disabled="isDisabled"
    :model="formState"
    :rules="item.rules"
    :hide-required-mark="item.hideRequiredMark"
    :colon="item.colon"
    :label-align="item.labelAlign"
    :label-col="item.labelCol"
    :wrapper-col="item.wrapperCol"
    :label-wrap="item.labelWrap"
    :layout="item.layout"
    :name="item.name"
    :scroll-to-first-error="item.scrollToFirstError"
    :size="item.size"
    :validate-on-rule-change="item.validateOnRuleChange"
    :validate-trigger="item.validateTrigger"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >
    <template v-if="item.$slots?.default">
      <slot></slot>
    </template>
  </a-form>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { ComponentCustomProperties } from 'vue';
import type { Rule, ValidateMessages } from 'ant-design-vue/es/form/interface';
import type { FormInstance } from 'ant-design-vue';

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
  onFinish?: (item: any, formState: any, formData: any, values: any) => void;
  onFinishFailed?: (item: any, formState: any, formData: any, errorInfo: any) => void;
  onValidate?: (item: any, formState: any, formData: any, name: string | string[], status: boolean, errorMsgs: string[]) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  rules?: Record<string, Rule[]>;
  hideRequiredMark?: boolean;
  colon?: boolean;
  labelAlign?: 'left' | 'right';
  labelCol?: { span: number; offset?: number };
  wrapperCol?: { span: number; offset?: number };
  labelWrap?: boolean;
  layout?: 'horizontal' | 'vertical' | 'inline';
  scrollToFirstError?: boolean | { block?: 'start' | 'center' | 'end' | 'nearest'; behavior?: 'auto' | 'smooth' };
  size?: 'small' | 'default' | 'large';
  validateOnRuleChange?: boolean;
  validateTrigger?: string | string[];
  validateMessages?: ValidateMessages;
  $slots?: {
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
  (e: 'finish', item: InputFormItem, values: any): void;
  (e: 'finishFailed', item: InputFormItem, errorInfo: any): void;
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
  onInput: (val: any) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
    }
  },
  onFinish: (values: any) => {
    if (props.item.$attrs?.onFinish) {
      props.item.$attrs.onFinish(props.item, props.formState, props.formData, values);
    }
    emit('finish', props.item, values);
  },
  onFinishFailed: (errorInfo: any) => {
    if (props.item.$attrs?.onFinishFailed) {
      props.item.$attrs.onFinishFailed(props.item, props.formState, props.formData, errorInfo);
    }
    emit('finishFailed', props.item, errorInfo);
  },
  onValidate: (name: string | string[], status: boolean, errorMsgs: string[]) => {
    if (props.item.$attrs?.onValidate) {
      props.item.$attrs.onValidate(props.item, props.formState, props.formData, name, status, errorMsgs);
    }
  }
};
</script> 