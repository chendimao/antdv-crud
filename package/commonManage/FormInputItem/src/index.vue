<template>
  <a-form class="aCardFormItem" :model="Data" labelWrap name="basic" ref="formRef" :rules="Validate" :label-col="labelCol" :wrapper-col="wrapperCol" autocomplete="off">
    <a-row :gutter="24">
      <template v-for="item in Data"> 
        <template v-if="item.type && (typeof item.show === 'function' ? item.show(formState, item, type)??true : item.show??true)">
          <a-col :span="item.span"  v-if="item.type != 'grid'">
          <a-form-item   v-bind="validateInfos[item.name]" :label="item.text" :name="item.name" :label-col="item.labelCol" :wrapper-col="item.wrapperCol??{style: {width: '100%'}}"
           >
            <InputItem v-model:value="formState[item.name]"
                       :isDisabled=" (type == 'show' || (typeof item?.disabled === 'function' ? item?.disabled(formState, item, type)??isDisabled : item?.disabled??isDisabled))"
                       :form-state="formState"
                       :validateFun="validate"
                       @change="inputChange" :item="item" >
              <template v-for="(_, name) in $slots" #[name]="{data}">
                <slot :name="name" :data="data"    ></slot>
              </template>
            </InputItem>

          </a-form-item>
        </a-col>
          <template v-else>
              <a-col :span="item.span" > 
                <a-row>
                  <a-col :span="colItem.span" v-for="colItem in item.column">
                
                <template  v-for="cItem in colItem.children">
                  <a-col  :span="cItem.span"  v-if="(typeof cItem?.show === 'function' ? cItem?.show(formState, cItem, type)??true : cItem?.show??true)">
                    <a-form-item  v-bind="validateInfos[cItem.name]" :label="cItem.text" :name="cItem.name" :label-col="cItem?.labelCol" :wrapper-col="cItem?.wrapperCol??{style: {width: '100%'}}" >
                          <InputItem v-model:value="formState[cItem.name]"
                                  
                                    :isDisabled=" (type == 'show' || (typeof cItem?.disabled === 'function' ? cItem?.disabled(formState, cItem, type)??isDisabled : cItem?.disabled??isDisabled))"
                                    :form-state="formState"
                                    :validateFun="validate"
                                    @change="inputChange" :item="cItem" >
                            <template v-for="(_, name) in $slots" #[name]="{data}">
                              <slot :name="name" :data="data"    ></slot>
                            </template>
                          </InputItem>
                        </a-form-item>      
                    </a-col>
                </template>
                
            
              
                </a-col>
                </a-row>
              </a-col>
             
            
        </template>
        </template>
      
      </template>

      <slot></slot>


    </a-row>

  </a-form>
</template>

<script lang="ts" setup >
import {reactive, defineProps, ref, watch, getCurrentInstance, onMounted} from "vue";
import InputItem from  '../../InputItem';
import { Form } from "ant-design-vue";
import {isArray, isObject, isString} from "../../../utils/is";

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
const { validate, validateInfos, clearValidate , resetFields} = useForm(
  formState,
  Validate,

);


defineExpose({
  submit,
  clear,
  formRef,
  validateFields
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
  console.log(Data.value);
  
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


function inputChange(inputItem, value, otherData) {
// otherdata dict数据
  const {type, uploadField, name, computedFun} = inputItem;
  console.log(name, value, otherData);

  if (type == 'upload') {
    uploadField.changeCallback(formState, inputItem, value );
  } else  if (type == 'dict') {
    if (otherData?.row) {
      if (isString(inputItem.valueField)) {
        formState.value[inputItem.valueField] = otherData.row[inputItem.valueField];
      } else if (isArray(inputItem.valueField)) {
        inputItem.valueField.forEach(valueKey => {
          formState.value[valueKey] = otherData.row[valueKey];
        })
      } else if (isObject(inputItem.valueField)) {
        Object.keys(inputItem.valueField).forEach(valueKey => {
          formState.value[inputItem.valueField[valueKey]] = otherData.row[valueKey];
        })
      }
    }

  } else {
    formState.value[name] = value;
  }
  // 执行额外的函数
  if (computedFun?.length > 0) {
    for (const item of computedFun) {
      if (item.type == 'function' && !item.immediate) {
        // formState 所有表单值 Data 所有表单字段  inputItem 当前更改的表单字段 value 当前更改的表单值 type 当前表单是新增 insert 还是 修改 update
        item.fun(formState, Data, inputItem, value, props.type, otherData);
      }
    }
  }

}
async function submit() {
  console.log(formState,
      Validate,)
  const res = await validate().catch(err => {
    console.log(err, 135);
    return err.errorFields.length == 0;
  })
  //onst res2 = await formRef.value.validate();
  console.log(res, 138);
 return !!res;

}

async function clear() {
  console.log('clear');
  resetFields();
}
async function validateFields(field) {
  return formRef.value.validateFields(field);
}


</script>

<script lang="ts">
export default {
  name: 'aFormInputItem'
}
</script>


<style lang="less"  >
 .aCardFormItem {
   .ant-form-item {
     margin: 10px 0px !important;
   }


 }


</style>
