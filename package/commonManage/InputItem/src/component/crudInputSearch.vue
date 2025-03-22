<template>
  <a-input-search
    :disabled="disabled"
    :autofocus="autofocus"
    :placeholder="placeholder"
    :size="size"
    :prefix="prefix"
    :suffix="suffix"
    :addon-before="addonBefore"
    :addon-after="addonAfter"
    :bordered="bordered"
    :maxlength="maxlength"
    :show-count="showCount"
    :enter-button="enterButton"
    :loading="loading"
    :value="inputValue"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
    @change="onChange"
    @search="onSearch"
  >
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix" />
    </template>
    <template v-if="$slots.addonBefore" #addonBefore>
      <slot name="addonBefore" />
    </template>
    <template v-if="$slots.addonAfter" #addonAfter>
      <slot name="addonAfter" />
    </template>
    <template v-if="$slots.enterButton" #enterButton>
      <slot name="enterButton" />
    </template>
  </a-input-search>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { InputProps } from 'ant-design-vue';

interface Props extends InputProps {
  modelValue?: string;
  disabled?: boolean;
  autofocus?: boolean;
  placeholder?: string;
  size?: 'large' | 'middle' | 'small';
  prefix?: string | any;
  suffix?: string | any;
  addonBefore?: string | any;
  addonAfter?: string | any;
  bordered?: boolean;
  maxlength?: number;
  showCount?: boolean;
  enterButton?: boolean | string | any;
  loading?: boolean;
}

interface EventHandlers {
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onInput?: (value: string) => void;
  onChange?: (e: Event) => void;
  onSearch?: (value: string) => void;
}

const props = withDefaults(defineProps<Props & EventHandlers>(), {
  modelValue: '',
  disabled: false,
  autofocus: false,
  placeholder: '',
  size: 'middle',
  bordered: true,
  showCount: false,
  enterButton: false,
  loading: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'focus', e: FocusEvent): void;
  (e: 'blur', e: FocusEvent): void;
  (e: 'input', value: string): void;
  (e: 'change', e: Event): void;
  (e: 'search', value: string): void;
}>();

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val)
});

const onFocus = (e: FocusEvent) => {
  emit('focus', e);
  props.onFocus?.(e);
};

const onBlur = (e: FocusEvent) => {
  emit('blur', e);
  props.onBlur?.(e);
};

const onInput = (value: string) => {
  emit('input', value);
  props.onInput?.(value);
};

const onChange = (e: Event) => {
  emit('change', e);
  props.onChange?.(e);
};

const onSearch = (value: string) => {
  emit('search', value);
  props.onSearch?.(value);
};
</script> 