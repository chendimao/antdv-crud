<template>
  <a-steps
    :disabled="isDisabled"
    :current="inputValue"
    :direction="item.direction"
    :percent="item.percent"
    :initial="item.initial"
    :label-placement="item.labelPlacement"
    :progress-dot="item.progressDot"
    :responsive="item.responsive"
    :size="item.size"
    :status="item.status"
    :type="item.type"
    :items="item.items"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >

    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <div v-render="() => slot(item, formState, formData,  data)"></div>
    </template>
  </a-steps>
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

// 定义步骤项接口
interface StepItem {
  title: string;
  subTitle?: string;
  description?: string;
  disabled?: boolean;
  icon?: any;
  status?: 'wait' | 'process' | 'finish' | 'error';
}

// 定义事件处理函数接口
interface EventHandlers {
  onFocus?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onBlur?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onInput?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  onChange?: (item: any, formState: any, formData: any, current: number) => void;
  onFinish?: (item: any, formState: any, formData: any) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  direction?: 'horizontal' | 'vertical';
  percent?: number;
  initial?: number;
  labelPlacement?: 'horizontal' | 'vertical';
  progressDot?: boolean | ((iconDot: any, { index, status, title, description }: any) => any);
  responsive?: boolean;
  size?: 'default' | 'small';
  status?: 'wait' | 'process' | 'finish' | 'error';
  type?: 'default' | 'navigation' | 'inline';
  items?: StepItem[];
  $slots?: {
    progressDot?: boolean;
  };
}

const props = defineProps<{
  modelValue?: number;
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', item: InputFormItem, current: number): void;
}>();

const inputValue = computed({
  get: () => props.modelValue ?? 0,
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
  onInput: (val: number) => {
    if (props.item.$attrs?.onInput) {
      props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
    }
  },
  onChange: (current: number) => {
    if (props.item.$attrs?.onChange) {
      props.item.$attrs.onChange(props.item, props.formState, props.formData, current);
    }
    emit('change', props.item, current);
  },
  onFinish: () => {
    if (props.item.$attrs?.onFinish) {
      props.item.$attrs.onFinish(props.item, props.formState, props.formData);
    }
  }
};
</script> 