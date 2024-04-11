<template>
  <a-form :model="Data" labelWrap name="basic" ref="formRef" :label-col="labelCol" :wrapper-col="wrapperCol" autocomplete="off">
    <a-row :gutter="24">
      <template v-for="item in Data">
        <a-col :span="item.span" >
          <a-form-item :label="item.text" :name="item.name" :label-col="item.labelCol" :wrapper-col="item.wrapperCol"
            v-bind="validateInfos[item.name]">
            <InputItem v-model:value="formState[item.name]" :isDisabled="isDisabled" :form-state="formState"
              @change="inputChange" :item="item" />

          </a-form-item>
        </a-col>
      </template>

      <slot></slot>




    </a-row>

  </a-form>
</template>

<script lang="ts" setup name="formInputItem">
import {reactive, defineProps, onMounted, watch, getCurrentInstance} from "vue";
import InputItem from '/@/components/InputItem';
import { Form } from "ant-design-vue";
import { baseRow, fieldRow } from "/@/views/baseManage/model";
import { onUpdated, ref } from "@vue/runtime-core";

const { proxy } = getCurrentInstance();
const formRef = ref();
const props = defineProps({
  isDisabled: { type: Boolean, default: false },
  visible: { type: Boolean },
  type: {type: String, default: ''},
  formData: { type: Object, default: () => { return {} } },
  formValidate: { type: Object, default: () => { return {} } },
  labelCol: { type: Object, default: () => { return {} } },
  wrapperCol: { type: Object, default: () => { return {} } },
  formState: { type: Object, default: () => { return {} } },
})
const emit = defineEmits(['update:formState']);

const Data = ref(props.formData);
const Validate = ref(props.formValidate);
const labelCol = reactive(props.labelCol);
const wrapperCol = reactive(props.wrapperCol);
const formState = ref(props.formState);
const useForm = Form.useForm;
const { validate, validateInfos } = useForm(
  formState,
  Validate.value,

);


defineExpose({
  submit,
  clear
})

watch(() => props.visible, (data) => {
  console.log(data);
  if (data) {
    // 运行item初始化方法
    Data.value.forEach(item => {

      if (item.initFun) {
        item.initFun(formState, Data, props.type);
      }
    })
  }
}, {immediate: true});


watch(() => props.formState, (data) => {
  formState.value = data;
  console.log(formState.value);
}, { deep: true, immediate: true });


watch(() => props.formData, (d) => {
  Data.value = d;
}, { deep: true, immediate: true });






function inputChange(inputItem, value) {
  const {type, uploadField, name, computedFun} = inputItem;

  if (type == 'upload') {
    if (uploadField.type == 'string') {

      uploadField.field?.name ? formState.value[uploadField.field.name] = value[0]?.name??'' : '';
      uploadField.field?.url ? formState.value[uploadField.field.url] = value[0]?.url??'' : '';
    } else  if (uploadField.type == 'list') {
      formState.value[name] = value;
    }
    console.log(value, formState.value[name], 101);

  } else {
    formState.value[name] = value;
  }
  // 执行额外的函数
  if (computedFun?.length > 0) {
    for (const item of computedFun) {
      if (item.type == 'function') {
        // formState 所有表单值 Data 所有表单字段  inputItem 当前更改的表单字段 value 当前更改的表单值 type 当前表单是新增 insert 还是 修改 update
        item.fun(formState, Data, inputItem, value, props.type);
      }
    }
  }

}
async function submit() {

  return await validate().then((res) => {

    //emit('update:formState', formState)
    formRef.value.clearValidate();
    return true;
  }, err => {
    // emit('update:formState', formState)
    formRef.value.clearValidate();
    return false;
  });
}

async function clear() {
  formRef.value.clearValidate();
}


</script>

<style lang="less" scoped>

:deep(.ant-form-item) {
  margin: 4px 0px !important;
}


</style>
