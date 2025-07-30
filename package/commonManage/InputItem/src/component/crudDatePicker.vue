<template>
  <a-date-picker
    style="width: 100%;"
    :disabled="isDisabled"
    :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
    :show-time="item.showTime"
    :format="item.type == 'year' ? 'YYYY' : item.type == 'month' ? 'YYYY-MM' : item.type == 'datetime' ? 'YYYY-MM-DD HH:mm:ss' :  'YYYY-MM-DD'"
    :value-format="item.type == 'year' ? 'YYYY' : item.type == 'month' ? 'YYYY-MM' :  item.type == 'datetime' ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
    :show-today="item.showToday"
    :show-now="item.showNow"
    :picker="item.type"
    :placeholder="item.placeholder"
    :disabled-date="item.disabledDate"
    :disabled-time="item.disabledTime"
    v-model:value="inputValue"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >

    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <div v-render="() => slot(item, formState, formData,  data)"></div>
    </template>
  </a-date-picker>
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
  onOpenChange?: (open: boolean) => void;
  onPanelChange?: (value: any, mode: string) => void;
  onOk?: (value: any) => void;
  onClear?: () => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  allowClear?: boolean;
  afterText?: string;
  showTime?: boolean | object;
  format?: string;
  valueFormat?: string;
  showToday?: boolean;
  showNow?: boolean;
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
  placeholder?: string;
  disabledDate?: (currentDate: Date) => boolean;
  disabledTime?: (date: Date) => any;
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

// 原生事件处理函数
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
        props.validateFun(props.item.name, { trigger: 'blur' }).catch((err) => {
          // 处理错误
        });
      }
      if (props.item.$attrs?.onBlur) {
        props.item.$attrs.onBlur(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onInput: (e: Event) => {
    setTimeout(() => {
      if (props.item.$attrs?.onInput) {
        props.item.$attrs.onInput(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onChange: (value: any, dateString: string) => {
    setTimeout(() => {
      if (props.item.$attrs?.onChange) {
        props.item.$attrs.onChange(props.item, props.formState, props.formData, value, dateString);
      }
      emit('change', props.item, value, dateString);
    }, 0);
  },
  onOpenChange: (open: boolean) => {
    setTimeout(() => {
      if (props.item.$attrs?.onOpenChange) {
        props.item.$attrs.onOpenChange(open);
      }
    }, 0);
  },
  onPanelChange: (value: any, mode: string) => {
    setTimeout(() => {
      if (props.item.$attrs?.onPanelChange) {
        props.item.$attrs.onPanelChange(value, mode);
      }
    }, 0);
  },
  onOk: (value: any) => {
    setTimeout(() => {
      if (props.item.$attrs?.onOk) {
        props.item.$attrs.onOk(value);
      }
    }, 0);
  },
  onClear: () => {
    setTimeout(() => {
      if (props.item.$attrs?.onClear) {
        props.item.$attrs.onClear();
      }
    }, 0);
  }
};
</script> 