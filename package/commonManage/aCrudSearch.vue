<template>
  <!--  查询共用组件-->
  <div class="search-form aCardSearch">
    <FormInputItem ref="searchFormRef" v-model:formState="params"
      :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }" :formData="formData" :formValidate="searchValidate"  >
      <a-col   v-if="isSearch !== false">
          <a-form-item :wrapper-col="{ style: { width: '200px' } }">
              <a-button style="margin-left: 15px" type="primary" @click="getSearchParams"
              >
                  <template #icon>
                      <SearchOutlined />
                  </template>
                  查询
              </a-button
              >
              <a-button style="margin-left: 15px" @click="getResetParams">
                  <template #icon>
                      <UndoOutlined />
                  </template>
                  重置
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
import {getCurrentInstance, onMounted, ref, useSlots, defineProps,watch} from "vue";
import FormInputItem from './FormInputItem/';
import {PlusOutlined, SearchOutlined, UndoOutlined} from "@ant-design/icons-vue";
import {deepCopy} from "../utils";
const { proxy } = getCurrentInstance();

const emits = defineEmits([ 'search','reset',  'register']);


defineExpose({
  submit
})

const mySlot = ref();


const params = ref({});
const searchFormRef = ref();
const aCardSearchRef = ref();
const resetForm = ref();
const formData = ref();
const searchValidate = ref({});
const isSearch = ref();
async function submit() {
  console.log(searchFormRef.value);
  return await searchFormRef.value.submit();
}


  async function validateSearch() {
   return await submit();
}

function setSearchProps(props) {
  aCardSearchRef.value = {...props,  ...proxy.$crudGlobalSearchConfig??{}};
  params.value = props.params;
  formData.value = props.searchForm;
  isSearch.value = props.isSearch;
  searchValidate.value = {};
  resetForm.value = deepCopy(props.searchParams);

  searchValidate.value = {};
  formData.value.forEach((item) => {

    // 自定义validator的 传入当前表单值以便动态校验
    item.rules ? searchValidate.value[item.name] = item.rules.map(ruleItem => {
      if (ruleItem.validator) {
        ruleItem.validator = ruleItem.validator.bind(proxy,  params.value);
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
  emits('search', params.value);
}

function getResetParams() {
  params.value = deepCopy(resetForm.value);
  emits('search', params.value);
}


const searchMethods = {
  validateSearch,
  getSearchParams,
  setSearchProps,
  getResetParams
}



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
