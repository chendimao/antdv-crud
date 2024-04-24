<!--新增修改查看统一页面-->
<template>
  <a-modal
    v-if="currentPageData && visible"
    v-model:visible="visible"
    :title="currentPageData.INFO[type].title"
    :wrap-class-name="!width ? 'full-modal' : ''"
    :confirmLoading="loading"
    @ok.prevent="handleSubmit"
    @cancel="handleCancel"
    :width="width || '100%'"
  >
    <div
      class="aCardForm"
      :style="{ maxHeight: 'calc(95vh - 60px)', height: height ? height : 'calc(95vh - 60px)' }"
      style="overflow: auto"
    >
      <div class="mb-2 form-card" v-if="formData?.length > 0">
        <a-card v-for="item in formData" :bordered="false">
          <template #title v-if="item.title">
            <div >{{ item.title }}</div>

          </template>
          <FormInputItem
            :ref="(el) => setItemRefs(el, item)"
            :visible="addVisible"
            v-model:formState="formState"
            :is-disabled="isTableDisabled"
            :formData="item.formList()"
            :type="type"
            :formValidate="item.formValidate()"
            :labelCol="{ span: 8 }"
            :wrapperCol="{ span: 16 }"
          />

        </a-card>
      </div>

      <a-card v-if="currentPageData.tableCom">
        <template #title>
          <div v-if="currentPageData?.other?.tableComTitle">{{
            currentPageData?.other?.tableComTitle
          }}</div>
        </template>
        <component
          :is="currentPageData.tableCom"
          :ref="name"
          :formState="formState"
          :is-disabled="isTableDisabled"
          :visible="addVisible"
          :type="type"
          v-model:tData="formState"
        ></component>
      </a-card>
    </div>
    <template #footer>
      <div :style="{ textAlign: footerPosition }">


        <slot :formState="formState">
          <template v-if="props.type != 'show'">
            <a-button @click="handleCancel"   >取消</a-button>
            <a-button type="primary" @click="handleSubmit"  >确定</a-button>
          </template>

        </slot>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import {
    computed,
    createVNode,
    defineAsyncComponent,
    getCurrentInstance,
    markRaw,
    reactive,
    ref,
    toRaw,
    watch,
    defineProps
  } from 'vue';
  import { Form, message } from 'ant-design-vue';
  import FormInputItem from './FormInputItem/';

  const { proxy } = getCurrentInstance();
  const props = defineProps({
    footerPosition: { type: String, default: 'right' },
    addVisible: { type: Boolean },
    type: { type: String, default: 'insert' },
    row: { type: Object },
    name: { type: String },
    currentPageData: {},
    width: { type: String },
    height: { type: String },
  });
  const emit = defineEmits(['update:addVisible', 'refreshList']);

  const visible = ref(props.addVisible);
  const fileList = ref([]);
  const useForm = Form.useForm;
  const roleList = ref([]);
  const formRefBase = ref<any>([]);
  const formState = ref<object>();
  const formData = ref<[]>([]);
  const loading = ref(false);
  let itemRefs = ref([]);

  const isTableDisabled = computed(() => {
    return props.type == 'show' || props.type == 'check';
  });

  watch(
    () => props.addVisible,
    async (data) => {
      visible.value = data;
      for (const ref of itemRefs.value) {
        //ref && ref.clear();
      }

      if (!data) {
        return;
      }

      formData.value = props.currentPageData.FORM;

      // 重新初始化validate，加入数据 以便动态校验
      formData.value.forEach((form, index) => {
        let newValidate = {};
        const oldValidate = form.formValidate();
        Object.keys(oldValidate).forEach((key) => {
          newValidate[key] = oldValidate[key].map((item) => {
            if (item.validator) {
              item.validator = item.validator.bind(proxy, formState);
            }
            return toRaw(item);
          });
        });
        formData.value[index].formValidate = () => newValidate;
      });
      formState.value = JSON.parse(JSON.stringify(props.row));
      props.currentPageData.other?.detailField
        ? (formState.value[props.currentPageData.other.detailField] = [])
        : '';

      itemRefs.value = [];

      if (
        props.type == 'update' ||
        props.type == 'examine' ||
        props.type == 'show' ||
        props.type == 'check'
      ) {
        formState.value = JSON.parse(JSON.stringify(props.row));
      }
      let formList = [];
      formData.value.forEach((item) => {
        formList = [...item.formList()];
      });
      formList.forEach((item) => {
        if (item.type == 'upload') {
          // if (props.type == 'update' || props.type == 'show') {
          //   if (item.uploadField.type == 'string' && formState.value[item.uploadField.field.url]) {
          //     formState.value[item.name] = [];
          //     formState.value[item.name][0] = { name: formState.value[item.uploadField.field.name] ?? formState.value[item.uploadField.field.url], url: formState.value[item.uploadField.field.url] };
          //   }
          // } else {
          //   formState.value[item.name] = [];
          // }
        }
      });
    },
    { immediate: true },
  );

  function setItemRefs(el, item) {
    itemRefs.value.push(el);
  }

  function handleCancel() {
    emit('update:addVisible', false);
  }

  async function handleSubmit(params) {
    console.log(formState.value, props.type);
    if (props.type == 'show') {
      emit('update:addVisible', false);
      return;
    }
    let flag = true;
    for (const ref of itemRefs.value) {
      console.log(ref, await ref.submit(), 176); // 提交两次
      if (!(await ref.submit())) {
        flag = false;
      }
    }

    console.log(flag, 180);

    if (flag) {
      // 如果有明细表 参数单独处理
      console.log(props.currentPageData.tableCom, 'test');
      if (props.currentPageData.tableCom) {
        let tableErr = '';
        console.log(proxy.$refs[props.name]);

        tableErr = (await proxy.$refs[props.name].validAllEvent()) ?? undefined;

        if (tableErr) {
          return;
        }
      }

      loading.value = true;

      props.currentPageData.INFO[props.type]
        .api(params ? { ...formState.value, ...params } : formState.value)
        .then((res) => {
          if (res.code == 0) {
            message.success('保存成功');

            // for (const ref of itemRefs.value) {
            //
            //   ref && ref.clear();
            // }

            emit('update:addVisible', false);
            emit('refreshList', '');
          } else {
            message.error(res.msg);
          }
          loading.value = false;
        })
        .catch((err) => {
          loading.value = false;
        });
    }
  }

  defineExpose({ handleSubmit });
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
