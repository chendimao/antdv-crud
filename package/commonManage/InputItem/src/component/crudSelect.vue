<template>
  <a-select
    style="width: 100%;"
    :disabled="isDisabled"
    :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
    :show-search="$crudGlobalInputConfig?.showSearch"
    :options="item?.$attrs?.options??item?.option"
    :filter-option="filterOption"
    v-model:value="inputValue"
    v-bind="{
      ...item.$attrs,
      ...eventHandlers
    }"
  >

    <template v-for="(slot, name) in item?.$slots??[]" v-slot:[name]="data">
      <div v-render="() => slot(item, formState, formData,  data)"></div>
    </template>
  </a-select>
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
  onSearch?: (value: string) => void;
  onSelect?: (value: any, option: any) => void;
  onDeselect?: (value: any, option: any) => void;
  onClear?: () => void;
  onDropdownVisibleChange?: (visible: boolean) => void;
  onPopupScroll?: (e: Event) => void;
  onMounted?: (item: any, formState: any, formData: any, ...args: any[]) => void;
  options?: SelectOption[];
}

interface SelectOption {
  value: string | number;
  name: string;
  label?: string;
}

interface InputFormItem {
  name?: string;
  $attrs?: EventHandlers;
  $slots?: Record<string, any>;
  allowClear?: boolean;
  afterText?: string;
  option?: SelectOption[];
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

const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
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
  onInput: (e: Event) => {
    setTimeout(() => {
      if (props.item.$attrs?.onInput) {
        props.item.$attrs.onInput(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onChange: (value: any, option: any) => {
    setTimeout(() => {
      if (props.item.$attrs?.onChange) {
        props.item.$attrs.onChange(props.item, props.formState, props.formData, value, option);
      }
      emit('change', props.item, value, option);
    }, 0);
  },
  onSearch: (value: string) => {
    setTimeout(() => {
      if (props.item.$attrs?.onSearch) {
        props.item.$attrs.onSearch(value);
      }
    }, 0);
  },
  onSelect: (value: any, option: any) => {
    setTimeout(() => {
      if (props.item.$attrs?.onSelect) {
        props.item.$attrs.onSelect(value, option);
      }
    }, 0);
  },
  onDeselect: (value: any, option: any) => {
    setTimeout(() => {
      if (props.item.$attrs?.onDeselect) {
        props.item.$attrs.onDeselect(value, option);
      }
    }, 0);
  },
  onClear: () => {
    setTimeout(() => {
      if (props.item.$attrs?.onClear) {
        props.item.$attrs.onClear();
      }
    }, 0);
  },
  onDropdownVisibleChange: (visible: boolean) => {
    setTimeout(() => {
      if (props.item.$attrs?.onDropdownVisibleChange) {
        props.item.$attrs.onDropdownVisibleChange(visible);
      }
    }, 0);
  },
  onPopupScroll: (e: Event) => {
    setTimeout(() => {
      if (props.item.$attrs?.onPopupScroll) {
        props.item.$attrs.onPopupScroll(e);
      }
    }, 0);
  },
  onSubmit: (e: Event) => {
    setTimeout(() => {
      if (props.item.$attrs?.onSubmit) {
        props.item.$attrs.onSubmit(props.item, props.formState, props.formData, e);
      }
      e.preventDefault();
    }, 0);
  },
  onReset: (e: Event) => {
    setTimeout(() => {
      if (props.item.$attrs?.onReset) {
        props.item.$attrs.onReset(props.item, props.formState, props.formData, e);
      }
      e.preventDefault();
    }, 0);
  },
  onKeydown: (e: KeyboardEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onKeydown) {
        props.item.$attrs.onKeydown(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onKeypress: (e: KeyboardEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onKeypress) {
        props.item.$attrs.onKeypress(props.item, props.formState, props.formData, e);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    }, 0);
  },
  onKeyup: (e: KeyboardEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onKeyup) {
        props.item.$attrs.onKeyup(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onClick: (e: MouseEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onClick) {
        props.item.$attrs.onClick(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onDblclick: (e: MouseEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onDblclick) {
        props.item.$attrs.onDblclick(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onMousedown: (e: MouseEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onMousedown) {
        props.item.$attrs.onMousedown(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onMouseup: (e: MouseEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onMouseup) {
        props.item.$attrs.onMouseup(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onMousemove: (e: MouseEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onMousemove) {
        props.item.$attrs.onMousemove(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onMouseover: (e: MouseEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onMouseover) {
        props.item.$attrs.onMouseover(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onMouseout: (e: MouseEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onMouseout) {
        props.item.$attrs.onMouseout(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onCopy: (e: ClipboardEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onCopy) {
        props.item.$attrs.onCopy(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onCut: (e: ClipboardEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onCut) {
        props.item.$attrs.onCut(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onPaste: (e: ClipboardEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onPaste) {
        props.item.$attrs.onPaste(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onDrag: (e: DragEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onDrag) {
        props.item.$attrs.onDrag(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onDragstart: (e: DragEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onDragstart) {
        props.item.$attrs.onDragstart(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onDragend: (e: DragEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onDragend) {
        props.item.$attrs.onDragend(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onDragenter: (e: DragEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onDragenter) {
        props.item.$attrs.onDragenter(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onDragover: (e: DragEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onDragover) {
        props.item.$attrs.onDragover(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onDragleave: (e: DragEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onDragleave) {
        props.item.$attrs.onDragleave(props.item, props.formState, props.formData, e);
      }
    }, 0);
  },
  onDrop: (e: DragEvent) => {
    setTimeout(() => {
      if (props.item.$attrs?.onDrop) {
        props.item.$attrs.onDrop(props.item, props.formState, props.formData, e);
      }
    }, 0);
  }
};
</script> 