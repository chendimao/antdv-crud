<template>
  <a-form class="aCardFormItem" :model="Data" labelWrap name="basic" ref="formRef" :rules="Validate" :label-col="labelCol" :wrapper-col="wrapperCol" autocomplete="off">
    <a-row  style="width: 100%;">
      <template v-for="item in Data.values()">
        <template v-if="item.type && (typeof item.show === 'function' ? item.show(formState, item, type)??true : item.show??true)">
          <a-col :span="item.span"   :class="item.name" v-if="!['grid', 'tabs'].includes(item.type)">
          <a-form-item   v-bind="validateInfos[item.name]" :label="item.text" :name="item.name" :label-col="item.labelCol" :wrapper-col="item.wrapperCol??{style: {width: '100%'}}"
           >
            <InputItem v-model:value="formState[item.name]"
                       :ref="setRef(item.name)"
                       :isDisabled=" (type == 'show' || (typeof item?.disabled === 'function' ? item?.disabled(formState, item, type)??isDisabled : item?.disabled??isDisabled))"
                       :form-state="formState"
                       :formData="Data"
                       :validateFun="validate"
                       @change="inputChange" :item="item" >
              <template v-for="(_, name) in $slots" #[name]="{data}">
                <slot :name="name" :data="data"    ></slot>
              </template>
            </InputItem>

          </a-form-item>
        </a-col>
          <template v-else-if="item.type == 'grid'">
              <a-col :span="item.span" >
                <a-row>
                  <a-col :span="colItem.span" v-for="colItem in item.columns">

                <template  v-for="cItem in colItem.children">
                  <a-col  :span="cItem.span"  v-if="(typeof cItem?.show === 'function' ? cItem?.show(formState, cItem, type)??true : cItem?.show??true)">
                    <a-form-item  v-bind="validateInfos[cItem.name]" :label="cItem.text" :name="cItem.name" :label-col="cItem?.labelCol" :wrapper-col="cItem?.wrapperCol??{style: {width: '100%'}}" >
                          <InputItem v-model:value="formState[cItem.name]"
                                  :formData="colItem.children"
                                     :ref="setRef(item.name)"
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
          <template v-else-if="item.type == 'tabs'">
            <a-tabs  v-model:activeKey="item.activeKey" style="width: 100%;" v-bind="item.$attrs">
                  <a-tab-pane :key="colItem.key" :tab="colItem.title" v-for="colItem in item.columns">

                <template  v-for="cItem in colItem.children">
                  <a-col  :span="cItem.span"  v-if="(typeof cItem?.show === 'function' ? cItem?.show(formState, cItem, type)??true : cItem?.show??true)">
                    <a-form-item  v-bind="validateInfos[cItem.name]" :label="cItem.text" :name="cItem.name" :label-col="cItem?.labelCol" :wrapper-col="cItem?.wrapperCol??{style: {width: '100%'}}" >
                          <InputItem v-model:value="formState[cItem.name]"
                                     :ref="setRef(item.name)"
                                  :formData="colItem.children"
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

              </a-tab-pane>
            </a-tabs>

        </template>

      </template>

      <slot></slot>


    </a-row>

  </a-form>
</template>

<script lang="ts" setup >
import {reactive, defineProps, ref, watch, getCurrentInstance, onMounted, useSlots, onUnmounted} from "vue";
import InputItem from  '../../InputItem';
import { Form } from "ant-design-vue";
import {isArray, isObject, isString} from "../../../utils/is";
import { loadStyle, removeStyle } from '../../../utils/loadStyle';
const { proxy } = getCurrentInstance();
const formRef = ref();
const props = defineProps({
  isDisabled: { type: Boolean, default: false },
  visible: { type: Boolean },
  type: {type: String, default: ''},
  css: {type: String, default: ''},
  cssId: {type: String, default: 'form-css'},
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
const { validate, validateInfos, clearValidate , scrollToField, resetFields} = useForm(
  formState,
  Validate,

);


defineExpose({
  submit,
  clear,
  formRef,
  toField,
  validateFields
})
const slots = useSlots();
 


onMounted(() => {
  // initFun();
  console.log(slots, 131)
  const css = ` .aCardFormItem {
    ${props.css}
  }`;
  loadStyle(css, props.cssId, true);
})

 

watch(() => props.visible, (data) => {
  if (data) {

    // 运行item初始化方法
    initFun();
  }
});


watch(() => props.formState, (data) => {
  formState.value = data;
}, { deep: true, immediate: true });


watch(() => props.formData, (d) => {
  console.log(d);
  Data.value = new Map(d.map(item => {
    const id = `${item.type}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    return [item.name, {...item, id}]
  }));

}, { deep: true, immediate: true });


// 定义 ref 对象
const elementRefs = ref({});

// 设置 ref 的函数
const setRef = (key) => {
  return (el) => {
    elementRefs.value[key + 'Ref'] = el;
  };
};
function initFun() {
  // 运行item初始化方法
  console.log(Data.value.values(), 133);
  
  Data.value.values().forEach(item => {

    if (item.computedFun) {
      item.computedFun.forEach(item => {
        // 初始化运行函数
        if (item.type == 'function' && item.immediate) {
          // formState 所有表单值 Data 所有表单字段  inputItem 当前更改的表单字段 value 当前更改的表单值 type 当前表单是新增 insert 还是 修改 update
          item.fun(formState, Data,  props.type);
        }
      })
    }
    if ( item?.$attrs.hasOwnProperty('onMounted')) {
      item?.$attrs.onMounted(formState, Data,  props.type);
    }

  })
}



// 返回值只有一个的时候
function inputChange(inputItem, ...data) {
// otherdata dict数据
  const {type,  name, computedFun} = inputItem;
  
  console.log(data, 155);
  
 if (data.length == 1) { 
 

  if (type == 'checkbox') { 
    let checkData = data[0].join(',');
    if (checkData && !checkData[0]) {
      checkData = null;
    }
    formState.value[name] = checkData;
  
  } else {
    formState.value[name] = data[0];
  }
  
  // 执行额外的函数
  if (computedFun?.length > 0) {
    for (const item of computedFun) {
      if (item.type == 'function' && !item.immediate) {
        // formState 所有表单值 Data 所有表单字段  inputItem 当前更改的表单字段 value 当前更改的表单值 type 当前表单是新增 insert 还是 修改 update
        item.fun(formState, Data, inputItem, data[0], props.type);
      }
    }
  }


 } else { 
  console.log(data, 183);
  const  value  = data[0];
  const  otherData  = data[1];
   if (type == 'dict') {
 
   
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
    if (value == null) {
      console.log(value, 203);
      
      if (isString(inputItem.valueField)) {
        formState.value[inputItem.valueField] = '';
      } else if (isArray(inputItem.valueField)) {
        inputItem.valueField.forEach(valueKey => {
          formState.value[valueKey] = '';
        })
      } else if (isObject(inputItem.valueField)) {
        Object.keys(inputItem.valueField).forEach(valueKey => {
          formState.value[inputItem.valueField[valueKey]] = '';
        })
      }
  }
  } else if (type == 'cascader') {
    let selectData = []
    const { selectedOptions } = data;
  selectedOptions.forEach((item: any) => {
    const _parent = item.map((item: any) => item.value)
    // 删除最后一项
    _parent.pop()
    // item[item.length - 1] 传入最后一项，也就是最后选择的那一项
    treeToArr([item[item.length - 1]], _parent, selectData)
  })
  // 最终的赋值
  formState.value[name] = selectData; 
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

 

}
 
const treeToArr = (_tree: any[], _parent: any['options'] = [], selectData = []) => {
  _tree.forEach((item) => {
    if (!item.children) {
      // value_type 就是你要级联选择器上绑定的 value 键
      selectData.value.push(_parent.concat(item.value))
    } else {
      treeToArr(item.children, _parent.concat(item.value), selectData)
    }
  })
}



async function submit() {
  let errList = [];
  const res = await validate().catch(err => {
    errList = [...errList, ...err.errorFields]
    return err.errorFields.length == 0;
  })
  //onst res2 = await formRef.value.validate();
  const tableFormData = Array.from(Data.value.values()).filter(item => {
    return item.type == 'table';
  })
  let errObj;
  for (const tableFormDatum of tableFormData) {
    let errMap;

    if(tableFormDatum?.$attrs?.validConfig?.msgMode == 'full') {
      errMap = await elementRefs.value[tableFormDatum.name +'Ref'].inputItemRef.aCardTable.fullValidate(true);
    } else {
      errMap = await elementRefs.value[tableFormDatum.name +'Ref'].inputItemRef.aCardTable.validate(true);
    }
    if (errMap && Object.keys(errMap).length > 0) {
      errList.push({name: tableFormDatum.name, errors: errMap});
    }
  }
  console.log(  errList, res);
 return errList;

}

async function clear() {
  console.log('clear');
  resetFields();
}
async function validateFields(field) {
  return formRef.value.validateFields(field);
}

async function toField(field) {
  return scrollToField(field);
}

onUnmounted(() => {
  if (props.css) {
    removeStyle(props.cssId);
  }
 
})


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
