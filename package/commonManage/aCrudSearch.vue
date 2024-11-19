<template>
  <!--  查询共用组件-->
  <div class="search-form aCardSearch">
    <FormInputItem ref="searchFormRef" v-model:formState="aCardSearchRef.params"
      :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }" :formData="aCardSearchRef.formData" :formValidate="searchValidate"  >
      <a-col   v-if="aCardSearchRef.showSearch !== false">
          <a-form-item :wrapper-col="{ style: { width: '200px' } }">
              <a-button style="margin-left: 15px" type="primary" @click="getData('search')"
              >
                  <template #icon>
                      <SearchOutlined />
                  </template>
                  {{aCardSearchRef.searchText}}
              </a-button
              >
              <a-button style="margin-left: 15px" v-if="aCardSearchRef.showReset !== false" @click="getData('reset')">
                  <template #icon>
                      <UndoOutlined />
                  </template>
                {{aCardSearchRef.resetText}}
              </a-button>
          </a-form-item>

      </a-col>
    </FormInputItem>



    <div  class="add-form" v-if="mySlot">

      <a-form-item >
        <span>
           <slot></slot>
        </span>

      </a-form-item>
    </div>



  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, onMounted, ref, useSlots, defineProps,watch, defineExpose} from "vue";
import FormInputItem from './FormInputItem/';
import {PlusOutlined, SearchOutlined, UndoOutlined} from "@ant-design/icons-vue";
import {deepCopy} from "../utils";
const { proxy } = getCurrentInstance();

const emits = defineEmits([ 'search','reset',  'register']);



const mySlot = ref();


const tableRef = ref();
const formRef = ref();

const searchFormRef = ref();
const aCardSearchRef = ref();
const aCardSearchDefaultRef = ref(
    {searchText: '查询', resetText: '重置', showSearch: true}
);
const resetForm = ref({});
const searchValidate = ref({});
async function submit() {
  console.log(searchFormRef.value);
  return await searchFormRef.value.submit();
}


  async function validateSearch() {
   return await submit();
}

function setSearchProps(props, ref) {
  // 配置优先级  手动配置 >  全局配置 >  默认配置
  aCardSearchRef.value = {...aCardSearchDefaultRef.value, ...proxy.$crudGlobalSearchConfig??{},  ...props,};
  tableRef.value = ref.tableRef;
  formRef.value = ref.formRef;
  searchValidate.value = {};
  console.log(aCardSearchRef.value.formData);
  aCardSearchRef.value.formData.forEach((item, key) => {

    //  初始化默认数据

    resetForm.value[key] = item?.value??'';
  });
  console.log(resetForm.value);
  aCardSearchRef.value.params = deepCopy(resetForm.value);
  searchValidate.value = {};
  aCardSearchRef.value.formData.forEach((item) => {

    // 自定义validator的 传入当前表单值以便动态校验
    item.rules ? searchValidate.value[item.name] = item.rules.map(ruleItem => {
      if (ruleItem.validator) {
        ruleItem.validator = ruleItem.validator.bind(undefined,{ formState: aCardSearchRef, refs: [searchFormRef]});

      }
      return ruleItem;
    }) : '';
  });


  const slots = useSlots();
  if (slots && slots.default) {
    mySlot.value = slots.default()[0]?.props;
  }

}


function getSearchParams() {
  return aCardSearchRef.value.params;
}
function setSearchParams(params) {
  aCardSearchRef.value.params = deepCopy(params);
  return aCardSearchRef.value.params;
}

function emitSearchParams() {
  emits('search', aCardSearchRef.value.params);
}


function getResetParams() {
  return deepCopy(resetForm.value);
}

function mergeResetParams(params) {
  resetForm.value = deepCopy({...resetForm.value, ...params});
 return resetForm.value;

}
function mergeSearchParams(params) {
  aCardSearchRef.value.params = deepCopy({...aCardSearchRef.value.params, ...params});
 return aCardSearchRef.value.params;

}
function emitResetParams() {
  emits('reset', deepCopy(resetForm.value));
}

async function getData(type: 'reset' | 'search') {

  if (type == 'reset') {
    searchFormRef.value.clear();
  } else if (type == 'search') {
    if (aCardSearchRef.value.dataCallback && !aCardSearchRef.value.dataCallback(aCardSearchRef.value.params)) {
      return;
    }
  }

  const typeList = {reset: [getResetParams, emitResetParams], search: [getSearchParams, emitSearchParams]}

  // 如果使用了table组件，则直接调用table组件的getSearch方法
  if (tableRef.value._value && aCardSearchRef.value.isTable !== false) {
   // tableRef.value._value.getSearch( typeList[type][0]());
    const validateRes = await validateSearch();
    console.log(validateRes);
    if(validateRes){
      setSearchParams(typeList[type][0]());
      await tableRef.value._value.setTableParams(typeList[type][0]());
      return   tableRef.value._value.getData();
    } else {
      return false;
    }
  } else {
    typeList[type][1]();
  }

}





const searchMethods = {
  validateSearch,
  getSearchParams,
  setSearchParams,
  setSearchProps,
  mergeResetParams,
  mergeSearchParams,
  getResetParams
}

defineExpose({searchMethods, aCardSearchRef, submit})

emits('register', searchMethods);


</script>

<script lang="ts">
export default {
  name: "aCrudSearch"
}
</script>

<style lang="less"  >

.search-form {
   .ant-form-item  {
    margin-bottom: 10px !important;
  }
  .add-form {
     .ant-form-item  {
      margin-bottom: 0 !important;
    }

    .ant-divider-horizontal  {
      margin: 14px 0 !important;
    }

  }

  .ant-card-head-title  {
    padding: 16px 0 0 !important;
  }
}




</style>
