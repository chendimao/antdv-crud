<template>
  <!-- <PageWrapper :title="currentPage?.title ?? ''"> -->
  <a-card>
    <template #title>
      <div>
        <!-- <a-space style=""> -->
        <!-- <a-button @click="handleShow('insert')" type="primary"  >模板下载</a-button> -->

        <!-- </a-space> -->
      </div>
      <a-crud-search ref="searchRef"
                     @register="registerSearch"
                     @search="getSearch"
                     >
        <a-button
            @click="handleShow('insert')"
            type="primary"
            style="float: left; magin-top: 10px"
            size="middle"
            class="!px-2"
        >
          <template #icon>
            <PlusOutlined />
          </template>
          新增</a-button
        >
      </a-crud-search>
    </template>
    <a-row>
      <a-col :span="24">
        <div class="mr-0 overflow-hidden bg-white vben-basic-table vben-basic-table-form-container">
          <a-crud-table
            @register="registerTable"
          >
            <template #default="{ row }">
              <a-button @click="handleShow('show', row)">查看</a-button>
            </template>
          </a-crud-table>
        </div>
      </a-col>
    </a-row>
  </a-card>
  <div>
    <a-crud-form
        @register="registerForm"
    />
  </div>
  <!-- </PageWrapper> -->
</template>
<script lang="ts" setup>
  import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';

  import retireData from './data/retire.data.tsx';
  import searchData from './data/retire.search';
  import {
    PlusOutlined,

  } from '@ant-design/icons-vue';
  import { web_archivesManagement_getManagement_details, web_alterationApply_getByList } from '../api/';


  import dayjs from 'dayjs';
  import {useTable} from "../../package/hooks/useTable";


  const currentPage = ref<any>();
  const addVisible = ref(false);
  const type = ref('insert');
  const resetForm = ref();
  const currentRow = ref({});
  const [
    {
      registerTable,
      registerSearch,
      registerForm
    },
    {getData,
      getTotalPagination,
      getCurrentPagination,
      setCurrentPagination,
      handleFormShow,
      getSearch,
      resetSearch,
      reset}
  ]= useTable(
      {
        table: {
          api: web_alterationApply_getByList,
          columns: retireData.tableForm(),
          params: searchData.resetForm(),
          isMenu: true,
          menuWidth: 300,
          size: 'mini',
          isSortable: true, // 是否开启排序，这是总开关，这里开启后，如果column中设置sortable: false，则该字段也不会排序
          $attrs: {
            sortConfig:  {defaultSort:  {field: 'medicalRecordNo', order: 'asc'} },
            onCheckboxChange: checkBoxChange
          },
          pagination: {
            isPagination: true,
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            showQuickJumper: true,
            showSizeChanger: true,
          },
        },
        search: {
          searchForm: searchData.searchForm(),
          params: searchData.resetForm(),
        },
        form: {
          title: retireData.title,
          type: type,
          typeInfo: retireData.typeInfo,
          formData: retireData.formData,
          visible: addVisible,
          formState: currentRow,
          width: '80%',

          height: '350px',
          name: 'bmgl',
        },
      }
  );

  function checkBoxChange(ev) {

  }

  async function handleShow(t, row: any = {}) {

    addVisible.value = true;
    type.value = t;

    if (type.value == 'update' || type.value == 'show') {
      currentRow.value = { ...row };
    } else if (type.value == 'insert') {

      currentRow.value =searchData.resetForm();

    }
    console.log(type.value, currentRow.value);
    await handleFormShow(type.value, currentRow.value);

  }

</script>
<style scoped lang="less">
  .ant-card-body {
    padding: 0 5px !important;
  }
</style>
