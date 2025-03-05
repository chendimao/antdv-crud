<!--新增修改查看统一页面-->
<template>
  <div v-if="aCardFormRef.visible" >

    <a-modal
        class="aCardForm"
        v-if="aCardFormRef.modalType == 'modal'"
        v-model:visible="aCardFormRef.visible"
        :title="aCardFormRef?.title"
        :wrap-class-name="!aCardFormRef.width ? 'full-modal' : ''"
        :confirmLoading="loading" 
        @ok.prevent="handleFormSubmit"
        @cancel="handleFormCancel"
        :width="aCardFormRef.width || '100%'"
    >
      <div

          :style="{ maxHeight: 'calc(100vh - 210px)', height: aCardFormRef.height ? aCardFormRef.height : 'calc(100vh - 210px)' }"
          style="overflow: auto"
      >
        <div class="mb-2 form-card"  > 
          <a-card  :bordered="false"> 
            <FormInputItem
                ref="formItemRef"
                :visible="aCardFormRef.visible"
                v-model:formState="aCardFormRef.formState"
                :is-disabled="isTableDisabled"
                :formData="aCardFormRef.formData"
                :type="aCardFormRef.type"
                :formValidate="validateList"
                :labelCol="aCardFormRef?.labelCol??{ span: 8 }"
                :wrapperCol="aCardFormRef?.labelCol??{ span: 16 }"
            >
              <template v-for="(_, name) in $slots" #[name]="{data}">
                  <slot v-if="name != 'default'" :name="name" :data="data"></slot>
              </template>
            </FormInputItem>

          </a-card>
        </div>

        <a-card v-if="aCardFormRef.detailComponent">
          <component
              :is="aCardFormRef.detailComponent"
              :ref="aCardFormRef.name"
              :is-disabled="isTableDisabled"
              :visible="aCardFormRef.visible"
              :type="aCardFormRef.type"
              v-model:tData="aCardFormRef.formState"
          ></component>
        </a-card>
      </div>
      <template #footer>
        <div :style="{ textAlign: aCardFormRef.footerPosition }">
          <slot :formState="aCardFormRef.formState" :loading="loading" :type="aCardFormRef.type">
            <!--          show 默认不显示确认取消按钮，除非手动配置显示-->
          <aCrudFormFooter :loading="loading" :aCardFormRef="aCardFormRef" @handleFormSubmit="handleFormSubmit" @handleFormCancel="handleFormCancel"/>
          </slot>
        </div>
      </template>
    </a-modal>

    <a-drawer
        class="aCardForm"
        :mask="aCardFormRef.mask"
        v-if="aCardFormRef.modalType == 'drawer'"
          :title="aCardFormRef?.title"
        :width="aCardFormRef.width || '100%'"
        :visible="aCardFormRef.visible"
        :body-style="{ paddingBottom: '80px' }"
        :placement="aCardFormRef?.placement??'right'"
        v-bind="aCardFormRef.drawerConfig"
        @close="handleFormCancel"
    >
      <div
          :style="{ maxHeight: '100%', height: aCardFormRef.height && (aCardFormRef?.placement == 'top' || aCardFormRef?.placement == 'bottom')  ? aCardFormRef.height : 'calc(100%)' }"
          style="overflow: auto"
      >
        <div class="mb-2 form-card" v-if="aCardFormRef.formData?.length > 0">
          <a-card v-for="(item, index) in aCardFormRef.formData" :bordered="false">
            <template #title v-if="item.title">
              <div >{{ item.title }}</div>

            </template>
            <FormInputItem
                ref="formItemRef"
                :visible="aCardFormRef.visible"
                v-model:formState="aCardFormRef.formState"
                :is-disabled="isTableDisabled"
                :formData="item"
                :type="aCardFormRef.type"
                :formValidate="validateList"

            />

          </a-card>
        </div>

      </div>
      <template v-if="aCardFormRef.menuPosition === 'extra'" #extra>
        <div :style="{ textAlign: aCardFormRef.footerPosition }">


          <slot :formState="aCardFormRef.formState">
            <!--        type为 show 默认不显示确认取消按钮，除非手动配置显示-->
            <aCrudFormFooter :aCardFormRef="aCardFormRef" @handleFormSubmit="handleFormSubmit" @handleFormCancel="handleFormCancel"/>
          </slot>
        </div>
      </template>
      <template v-else-if="aCardFormRef.menuPosition === 'footer'" #footer>
        <div :style="{ textAlign: aCardFormRef.footerPosition }">
          <slot :formState="aCardFormRef.formState">
            <!--          show 默认不显示确认取消按钮，除非手动配置显示-->
            <aCrudFormFooter :aCardFormRef="aCardFormRef" @handleFormSubmit="handleFormSubmit" @handleFormCancel="handleFormCancel"/>
          </slot>
        </div>
      </template>

    </a-drawer>


    <div v-if="aCardFormRef.modalType == 'form'">

      <div

          :style="{ maxHeight: 'calc(100vh - 210px)', height: aCardFormRef.height ? aCardFormRef.height : 'calc(100vh - 210px)' }"
          style="overflow: auto"
      >
        <div class="mb-2 form-card" v-if="aCardFormRef.formData?.length > 0">
          <a-card v-for="(item, index) in aCardFormRef.formData" :bordered="false">
            <template #title v-if="item.title">
              <div >{{ item.title }}</div>

            </template>
            <FormInputItem
                ref="formItemRef"
                :visible="aCardFormRef.visible"
                v-model:formState="aCardFormRef.formState"
                :is-disabled="isTableDisabled"
                :formData="item"
                :type="aCardFormRef.type"
                :formValidate="validateList"
                :labelCol="{ span: 8 }"
                :wrapperCol="{ span: 16 }"
            >
              <template v-for="(_, name) in $slots" #[name]="{data}">
                <slot v-if="name != 'default'" :name="name" :data="data"></slot>
              </template>
            </FormInputItem>

          </a-card>
        </div>

        <a-card v-if="aCardFormRef.detailComponent">
          <component
              :is="aCardFormRef.detailComponent"
              :ref="aCardFormRef.name"
              :is-disabled="isTableDisabled"
              :visible="aCardFormRef.visible"
              :type="aCardFormRef.type"
              v-model:tData="aCardFormRef.formState"
          ></component>
        </a-card>
      </div>

    </div>


  </div>

</template>

<script lang="ts" setup>
import {
  computed,
  getCurrentInstance,
  ref,
  defineExpose,
  toRaw, unref,
  watch,
} from 'vue';
  import { Form, message } from 'ant-design-vue';
  import FormInputItem from '../FormInputItem/';
  import {deepCopy} from "../../utils";
  import aCrudFormFooter from './component/aCrudFormFooter.vue';

  const { proxy } = getCurrentInstance();

  const searchRef = ref();
  const testRef = ref();

  const tableRef = ref();
  const formItemRef = ref();
  // props集合
  const aCardFormRef = ref();
  // 默认props
  const aCardDefaultFormRef = ref({...{
      footerPosition: 'right',
      visible: false,
      type: 'insert',
      row: {},
      name: '',
      width: '',
      height: '',
      mask: true,
      menuPosition: 'footer',
      modalType: 'modal', // modal a-modal  drawer a-drawer
      FooterCancelText: '取消',
      FooterSubmitText: '确定',
    }, ...proxy.$crudGlobalFormConfig??{}});
  // 外部传入props
  const formTransferPropsRef = ref();
  const resetForm = ref({});// 重置数据 修改时为当前行数据 新增时为resetForm数据
  const emits = defineEmits(['register', 'formCancel', 'formSubmit']);
  const props = defineProps({
    formProps: {},
  });

  const loading = ref(false);
  const validateList = ref({});
  const isTableDisabled = computed(() => {
    return aCardFormRef.value.type == 'show' || aCardFormRef.value.type == 'check';
  });






  function initForm() {
    console.log('initForm');
    // for (const ref of itemRefs.value) {
    //   //ref && ref.clear();
    // }

    // if (!aCardFormRef.value.visible) {
    //   return;
    // }


    let formList = [];
    validateList.value = {};
    console.log(aCardFormRef.value.formData);

    const flatFormData = (formData) => {
      formData.forEach(item => {
        if (item.type == 'grid' && item.column.length > 0) {
          item.column.forEach(colItem => {
            flatFormData(colItem.children);
          })
        } else {
          formList.push(item);
        }
      })
    }

    flatFormData(aCardFormRef.value.formData);
    // aCardFormRef.value.formData.forEach((item) => {
    //   console.log(item);
    //   formList.push(item);
    // });
    console.log(formList);
    
    formList.forEach((item) => {
      //  初始化默认数据
      resetForm.value[item['name']] = item?.value??'';
    });
    // 初始化数据
    aCardFormRef.value.formState = deepCopy(resetForm.value);

    console.log(aCardFormRef.value, formList);

      formList.forEach((item) => {
     // 自定义validator的 传入当前表单值以便动态校验
     item.rules ? validateList.value[item['name']] = item.rules.map(ruleItem => {
       if (ruleItem.validator) {
         //console.log(aCardFormRef.value,ruleItem.validator, typeof ruleItem.validator);
         // ruleItem.cardForm = aCardFormRef;
         // ruleItem.refs = itemRefs;
        // ruleItem.validator = (aCardFormRef, itemRefs) => ruleItem.validator({cardForm: aCardFormRef, refs: itemRefs});
       
         ruleItem.validator = ruleItem.validator.bind(null, {cardForm: aCardFormRef, refs: formItemRef});
        //ruleItem.validator = ruleItem.validator.bind(undefined,{...this, cardForm: aCardFormRef, refs: itemRefs.value});
       }

       return ruleItem;
     }) : '';




   });

  }


  function setFormProps(props, ref) {
    aCardFormRef.value = null;
    tableRef.value = ref.tableRef;
    searchRef.value = ref.searchRef;
    formTransferPropsRef.value = props;
      aCardFormRef.value = {...aCardDefaultFormRef.value, ...props};

    initForm();
  }


  function setFormData(columns) {
    aCardFormRef.value.formData = columns;
    initForm();
  }



  function handleFormCancel() {
    setFormVisible(false);
    emits('formCancel', getFormState())
  }

  function handleFormShow(t, formState) {
    console.log(t, formState, resetForm.value, formItemRef, testRef);

    setFormVisible(true);
    console.log(aCardFormRef.value.visible);
    
    aCardFormRef.value.type = t;
    if (t == 'insert') {
      aCardFormRef.value.formState = deepCopy(resetForm.value);
    } else {
      aCardFormRef.value.formState = deepCopy(formState);
    }


  }


  async function handleFormSubmit(params) {
    // 查看模式不掉保存接口
    if (aCardFormRef.value.type == 'show') {
      setFormVisible(false);
      return;
    }
    else
    {
      let flag = true;
       //  console.log( 176, ref.submit()); // 提交两次
        if (!(await formItemRef.value.submit())) {
          flag = false;
        }
  

      // 校验通过
      if (flag) {
        
        loading.value = true;

        let  res;

        if (aCardFormRef.value.requestCallback) {
         res = await aCardFormRef.value.requestCallback(
              aCardFormRef.value.typeInfo[aCardFormRef.value.type].api,
              params ? { ...aCardFormRef.value.formState, ...params } : aCardFormRef.value.formState
          ).catch((err) => {
            loading.value = false;
            console.log(err);
            emits('formSubmit', err);
          });
        } else {
          res = await aCardFormRef.value.typeInfo[aCardFormRef.value.type]
              .api(params ? { ...aCardFormRef.value.formState, ...params } : aCardFormRef.value.formState).catch((err) => {
                loading.value = false;
                console.log(err);
                emits('formSubmit', err);
              });

        }
        console.log(res, 324);


        if (aCardFormRef.value.dataCallback) {
          return aCardFormRef.value.dataCallback(res);
        }


        if (res.code == 0) {
          message.success('保存成功');
          setFormVisible(false);
          if (tableRef.value && aCardFormRef.value.isTable !== false) {
            tableRef.value._value.getData();
          } else {
            emits('formSubmit', res);
          }
        } else {
          message.error(res.msg || '保存失败');
          emits('formSubmit', res);
        }
        loading.value = false;




      }
    }

  }
watch(() => props.formProps, (data) => {
  formTransferPropsRef.value = {...formTransferPropsRef.value, ...data};
  console.log(data, formTransferPropsRef, 425);
}, {deep: true })
  function getFormState() {
    return aCardFormRef.value.formState;
  }

  function getFormRefData() {
    return aCardFormRef.value;
  }

  function getResetFormData() {
    return deepCopy(resetForm.value);
  }
  function mergeResetFormData(params) {
    resetForm.value = {...resetForm.value, ...params};
    return resetForm.value;
  }
  function mergeFormData(params) {
    aCardFormRef.value.formState = {...aCardFormRef.value.formState, ...params};
    return aCardFormRef.value.formState;
  }

  function setFormVisible(visible) {
    aCardFormRef.value.visible = visible;
  }


  const formMethods = {
    setFormProps,
    getFormState,
    handleFormShow,
    getResetFormData,
    mergeFormData,
    handleFormSubmit,
    handleFormCancel,
    mergeResetFormData,
    getFormRefData,
    setFormData,
    setFormVisible
  }



  defineExpose({formMethods, aCardFormRef})

  emits('register', formMethods);
</script>
<script lang="ts">
  export default {
    name: 'aCrudForm',
  };
</script>
<style lang="less">

.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}

</style>
