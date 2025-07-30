<template>
    <a-cascader

        size="default"
        v-model:value="inputValue"
        :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
        :show-search="$crudGlobalInputConfig?.showSearch ? {filter: cascaderFilterOption} : false"
        :disabled="isDisabled"
        :multiple="!!item.multiple"
        :options="item?.$attrs?.options??item?.option"
        style="width: 100%;border: 0;"
        :fieldNames="item.fieldNames??{label: 'name', value: 'value'}"
        v-bind="{
        ...item.$attrs,
        ...eventHandlers
        }"  
    >

      <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
        <div v-render="() => slot(item, formState, formData,  data)"></div>
      </template>
    </a-cascader>
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
    onStep?: (item: any, formState: any, formData: any, value: number) => void;
    onUpClick?: (item: any, formState: any, formData: any) => void;
    onDownClick?: (item: any, formState: any, formData: any) => void;
  }
  
  interface InputFormItem {
    name?: string;
    $attrs?: EventHandlers;
    allowClear?: boolean;
    afterText?: string;
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
    }
  });
  

const cascaderFilterOption = (inputValue, path) => {

return path.some(option => {
  if (option.label) {
    return option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  } else {
    return false;
  }

});

};

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
    onChange: (value: any, selectedOptions: any[]) => {
      setTimeout(() => {
        if (props.item.$attrs?.onChange) {
          props.item.$attrs.onChange(props.item, props.formState, props.formData, value, selectedOptions);
        }
        emit('change', props.item, value, selectedOptions);
      }, 0);
    },
    onDropdownVisibleChange: (open: boolean) => {
      setTimeout(() => {
        if (props.item.$attrs?.onDropdownVisibleChange) {
          props.item.$attrs.onDropdownVisibleChange(props.item, props.formState, props.formData, open);
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
    onClear: () => {
      setTimeout(() => {
        if (props.item.$attrs?.onClear) {
          props.item.$attrs.onClear(props.item, props.formState, props.formData);
        }
      }, 0);
    }
  };
  
  // 数字输入框事件处理函数
  const inputNumberHandlers = {
    ...eventHandlers,  // 合并通用事件处理函数
    onStep: (value: number) => {

      setTimeout(() => {

        if (props.item.$attrs?.onStep) {
        props.item.$attrs.onStep(props.item, props.formState, props.formData, value);
        }
      }, 0);
 
    },
    onUpClick: () => {
      if (props.item.$attrs?.onUpClick) {
        props.item.$attrs.onUpClick(props.item, props.formState, props.formData);
      }
    },
    onDownClick: () => {
      if (props.item.$attrs?.onDownClick) {
        props.item.$attrs.onDownClick(props.item, props.formState, props.formData);
      }
    }
  };
  </script> 