<template>
  <!--  查询共用组件-->
  <div class="search-form">
    <FormInputItem ref="searchFormRef" v-model:formState="params" :formData="searchForm" :formValidate="formValidate"
      :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
      <a-col   v-if="isSearch">
          <a-form-item :wrapper-col="{ style: { width: '200px' } }">
              <a-button style="margin-left: 15px" type="primary" @click="getData"
              >
                  <template #icon>
                      <SearchOutlined />
                  </template>
                  查询
              </a-button
              >
              <a-button style="margin-left: 15px" @click="handleResetForm">
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
const { proxy } = getCurrentInstance();
defineExpose({
  submit
})
onMounted(() => {
  params.value = props.formState;
  const slots = useSlots();
  if (slots && slots.default) {
    mySlot.value = slots.default()[0]?.props;
  }
  console.log(mySlot.value);
})
const emit = defineEmits(['update:form-state', 'search']);
const mySlot = ref();
const props = defineProps({
  searchData: { type: Object, default: () => { return {} } },
  formState: { type: Object, default: () => { return {} } },
    searchForm: { type: Object, default: () => { return {} } },
    resetForm: { type: Object, default: () => { return {} } },
    formValidate: { type: Object, default: () => { return {} } },
    isSearch: { type: Boolean, default: true },
});


const params = ref({});
const searchFormRef = ref();




watch(() => props.formState, (data) => {
  params.value = data;


  emit('update:form-state', data);
}, { deep: true, immediate: true })


async function submit() {
  console.log(searchFormRef.value);
  return await searchFormRef.value.submit();
}


  function getData() {
  setTimeout(async () => {
   await submit() && emit('search', params.value);



  }, 0);

}


// 重置查询条件
function handleResetForm() {
  emit('update:form-state', props.resetForm);
  getData();
}

</script>

<script lang="ts">
export default {
  name: "aCrudSearch"
}
</script>

<style lang="less"  >

.search-form {
  .add-form {
    :deep(.ant-form-item) {
      margin-bottom: 0 !important;
    }

    :deep(.ant-divider-horizontal) {
      margin: 14px 0 !important;
    }

  }

  :deep(.ant-card-head-title) {
    padding: 16px 0 0 !important;
  }
}




</style>
