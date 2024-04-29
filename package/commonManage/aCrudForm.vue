<!--新增修改查看统一页面-->
<template>
  <a-modal
    v-if="aCardFormRef.visible"
    v-model:visible="aCardFormRef.visible"
    :title="aCardFormRef.title"
    :wrap-class-name="!aCardFormRef.width ? 'full-modal' : ''"
    :confirmLoading="loading"
    @ok.prevent="handleFormSubmit"
    @cancel="handleFormCancel"
    :width="aCardFormRef.width || '100%'"
  >
    <div
      class="aCardForm"
      :style="{ maxHeight: 'calc(95vh - 60px)', height: aCardFormRef.height ? aCardFormRef.height : 'calc(95vh - 60px)' }"
      style="overflow: auto"
    >
      <div class="mb-2 form-card" v-if="aCardFormRef.formData?.length > 0">
        <a-card v-for="item in aCardFormRef.formData" :bordered="false">
          <template #title v-if="item.title">
            <div >{{ item.title }}</div>

          </template>
          <FormInputItem
            :ref="(el) => setItemRefs(el, item)"
            :visible="aCardFormRef.visible"
            v-model:formState="aCardFormRef.formState"
            :is-disabled="isTableDisabled"
            :formData="item.formList()"
            :type="aCardFormRef.type"
            :formValidate="validateList"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }"
          />

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


        <slot :formState="aCardFormRef.formState">
<!--          show 默认不显示确认取消按钮，除非手动配置显示-->

            <a-button @click="handleFormCancel"   v-if="aCardFormRef.type != 'show' || aCardFormRef.showDefaultFooterCancel === true">
              {{ aCardFormRef.FooterCancelText }}</a-button>
            <a-button type="primary" @click="handleFormSubmit"   v-if="aCardFormRef.type != 'show' || aCardFormRef.showDefaultFooterSubmit === true">
              {{ aCardFormRef.FooterSubmitText }}</a-button>


        </slot>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import {
    computed,
    getCurrentInstance,
    ref,
    toRaw,
    watch,
  } from 'vue';
  import { Form, message } from 'ant-design-vue';
  import FormInputItem from './FormInputItem/';

  const { proxy } = getCurrentInstance();

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
      FooterCancelText: '取消',
      FooterSubmitText: '确定',
    }, ...proxy.$crudGlobalFormConfig??{}});
  // 外部传入props
  const formTransferPropsRef = ref();

  const emits = defineEmits(['register', 'formCancel', 'formSubmit']);

  const loading = ref(false);
  let itemRefs = ref([]);
  const validateList = ref({});
  const isTableDisabled = computed(() => {
    return aCardFormRef.value.type == 'show' || aCardFormRef.value.type == 'check';
  });

  watch(() => aCardFormRef.value, (newVal, oldVal) => {
    console.log(newVal, oldVal);
    //newVal && initForm();
  }, {deep: true, immediate: true});


  function initForm() {

    // for (const ref of itemRefs.value) {
    //   //ref && ref.clear();
    // }

    if (!aCardFormRef.value.visible) {
      return;
    }

    let formList = [];
    validateList.value = {};
    aCardFormRef.value.formData.forEach((item) => {
      formList = [...item.formList()];
    });
   formList.forEach((item) => {
     console.log(item);
     // 自定义validator的 传入当前表单值以便动态校验
     item[1].rules ? validateList.value[item[0]] = item[1].rules.map(ruleItem => {
       if (ruleItem.validator) {
        ruleItem.validator = ruleItem.validator.bind(proxy, aCardFormRef.value.formState);
       }
       return ruleItem;
     }) : '';
   });

    console.log(validateList.value);
  }


  function setFormProps(props) {
    itemRefs.value = [];
    formTransferPropsRef.value = props;
      aCardFormRef.value = {...aCardDefaultFormRef.value, ...props};
    console.log(aCardFormRef.value, props);
   // initForm();
  }

  function setItemRefs(el, item) {
    el && itemRefs.value.push(el);
  }



  function handleFormCancel() {
    setFormVisible(false);
    emits('formCancel', getFormState())
  }

  function handleFormShow(t, formState) {
    itemRefs.value = [];
    console.log(t, formState, itemRefs.value);
    aCardFormRef.value.type = t;
    aCardFormRef.value.formState = formState;
    initForm();
  }


  async function handleFormSubmit(params) {
    // 查看模式不掉保存接口
    if (aCardFormRef.value.type == 'show') {
      setFormVisible(false);
      return;
    } else {
      let flag = true;
      for (const ref of itemRefs.value) {
         console.log( 176, ref); // 提交两次
        if (!(await ref.submit())) {
          flag = false;
        }
      }

      // 校验通过
      if (flag) {
        // 如果有明细表 参数单独处理
        if (aCardFormRef.value.detailComponent) {
          let tableErr = '';
          console.log(proxy.$refs[aCardFormRef.value.name]);

          tableErr = (await proxy.$refs[aCardFormRef.value.name].validAllEvent()) ?? undefined;

          if (tableErr) {
            return;
          }
        }
        loading.value = true;

        aCardFormRef.value.typeInfo[aCardFormRef.value.type]
            .api(params ? { ...aCardFormRef.value.formState, ...params } : aCardFormRef.value.formState)
            .then((res) => {
              if (res.code == 0) {
                message.success('保存成功');
              } else {
                message.error(res.msg || '保存失败');
              }
              loading.value = false;
            })
            .catch((err) => {
              loading.value = false;
              message.error( '保存失败');
            });
      }
    }

  }

  function getFormState() {
    return aCardFormRef.value.formState;
  }

  function getFormRefData() {
    return aCardFormRef.value;
  }

  function setFormVisible(visible) {
    aCardFormRef.value.visible = visible;
  }


  const formMethods = {
    setFormProps,
    getFormState,
    handleFormShow,
    getFormRefData,
    setFormVisible
  }



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
      width: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
    }

    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: calc(100vh) !important;
      width: calc(100vw) !important;
    }

    .ant-modal-body {
      flex: 1;
    }

    .desc-item {
      font-weight: bold;
      font-size: 18px;
    }

  }
  .form-card {
    .ant-card-body  {
      padding: 12px !important;
    }
    .ant-card-head-title {
      padding: 5px !important;
    }
  }

</style>
