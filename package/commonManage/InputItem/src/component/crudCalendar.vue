<template>
  <a-form-item-rest>
  <a-calendar
    :disabled="isDisabled"
    :fullscreen="item.fullscreen"
    :mode="item.mode"
    v-model:value="inputValue"
    :default-value="item.defaultValue"
    :locale="item.locale"
    :valid-range="item.validRange"
    :style="item.style"
    :class="item.class"
    :disable-date="item.disableDate"
    :header-render="item.headerRender"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >

    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <div v-render="() => slot(item, formState, formData,  data)"></div>
    </template>
  </a-calendar>
  </a-form-item-rest>
</template>

<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import type { ComponentCustomProperties } from 'vue';
import type { Dayjs } from 'dayjs';

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
  onChange?: (item: any, formState: any, formData: any, date: Dayjs) => void;
  onPanelChange?: (item: any, formState: any, formData: any, date: Dayjs, mode: string) => void;
  onSelect?: (item: any, formState: any, formData: any, date: Dayjs) => void;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  fullscreen?: boolean;
  mode?: 'month' | 'year';
  defaultValue?: Dayjs;
  locale?: object;
  validRange?: [Dayjs, Dayjs];
  disableDate?: (currentDate: Dayjs) => boolean;
  headerRender?: (headerRender: { value: Dayjs; type: string; onChange: (date: Dayjs) => void; onTypeChange: (type: string) => void }) => any;
  $slots?: {
    dateCellRender?: boolean;
    dateFullCellRender?: boolean;
    monthCellRender?: boolean;
    monthFullCellRender?: boolean;
  };
}

const props = defineProps<{
  modelValue?: Dayjs;
  validateFun?: (name: string, options: { trigger: string }) => Promise<void>;
  item: InputFormItem;
  formState?: Record<string, any>;
  formData?: Record<string, any>;
  isDisabled?: boolean;
  id?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: Dayjs): void;
  (e: 'change', item: InputFormItem, date: Dayjs): void;
}>();

const inputValue = computed({
  get: () => props.modelValue ?? null,
  set: (val: Dayjs | null) => {
    emit('update:modelValue', val as Dayjs);
    eventHandlers.onInput(val as Dayjs);
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
  onInput: (val: Dayjs | null) => {
    setTimeout(() => {
      if (props.item.$attrs?.onInput) {
        props.item.$attrs.onInput(props.item, props.formState, props.formData, val);
      }
    }, 0);
  },
  onChange: (date: Dayjs | null) => {
    setTimeout(() => {
      if (props.item.$attrs?.onChange) {
        props.item.$attrs.onChange(props.item, props.formState, props.formData, date);
      }
      emit('change', props.item, date);
    }, 0);
  },
  onPanelChange: (date: Dayjs | null, mode: string) => {
    setTimeout(() => {
      if (props.item.$attrs?.onPanelChange) {
        props.item.$attrs.onPanelChange(props.item, props.formState, props.formData, date, mode);
      }
    }, 0);
  },
  onSelect: (date: Dayjs | null) => {
    setTimeout(() => {
      if (props.item.$attrs?.onSelect) {
        props.item.$attrs.onSelect(props.item, props.formState, props.formData, date);
      }
    }, 0);
  }
};
</script> 