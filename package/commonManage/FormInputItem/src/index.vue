<template>
  <a-form class="aCardForm" :model="Data" labelWrap name="basic" ref="formRef" :rules="Validate" :label-col="labelCol" :wrapper-col="wrapperCol" autocomplete="off">
    <a-row :gutter="24">
      <template v-for="item in Data.values()">
        <a-col :span="item.span" v-if="item.show??true">
          <a-form-item :label="item.text" :name="item.name" :label-col="item.labelCol" :wrapper-col="item.wrapperCol"
            v-bind="validateInfos[item.name]">
            <InputItem v-model:value="formState[item.name]"  :isDisabled="isDisabled" :form-state="formState"
              @change="inputChange" :item="item" />

          </a-form-item>
        </a-col>
      </template>

      <slot></slot>




    </a-row>

  </a-form>
</template>

<script lang="ts" setup name="formInputItem">
import {reactive, defineProps, ref, watch, getCurrentInstance, onMounted} from "vue";
import InputItem from  '../../InputItem';
import { Form } from "ant-design-vue";

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
const { validate, validateInfos, clearValidate } = useForm(
  formState,
  Validate,

);


defineExpose({
  submit,
  clear
})

onMounted(() => {
  initFun();
})


watch(() => props.visible, (data) => {
  if (data) {

    // 运行item初始化方法
    initFun();
  }
});


watch(() => props.formState, (data) => {
  formState.value = data;
  console.log(formState.value);
}, { deep: true, immediate: true });


watch(() => props.formData, (d) => {
  Data.value = d;
}, { deep: true, immediate: true });



function initFun() {
  // 运行item初始化方法
  Data.value.forEach(item => {

    if (item.computedFun) {
      item.computedFun.forEach(item => {
        // 初始化运行函数
        if (item.type == 'function' && item.immediate) {
          // formState 所有表单值 Data 所有表单字段  inputItem 当前更改的表单字段 value 当前更改的表单值 type 当前表单是新增 insert 还是 修改 update
          item.fun(formState, Data,  props.type);
        }
      })
    }
  })
}


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
      if (item.type == 'function' && !item.immediate) {
        // formState 所有表单值 Data 所有表单字段  inputItem 当前更改的表单字段 value 当前更改的表单值 type 当前表单是新增 insert 还是 修改 update
        item.fun(formState, Data, inputItem, value, props.type);
      }
    }
  }

}
async function submit() {
  console.log(formState,
      Validate,)
  const res = await validate().catch(err => {
    console.log(err, 135);
    return false;
  })
  //onst res2 = await formRef.value.validate();
  console.log(res, 138);
 return !!res;

}

async function clear() {
      clearValidate();
}


</script>

<style lang="less"  >
 .aCardForm {
   .ant-form-item {
     margin: 10px 0px !important;
   }
 }



</style>
