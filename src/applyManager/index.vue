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
                     >
        <a-button
            @click="handleAddShow('insert', retireData.resetForm())"
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
            <template #default="{row}">
              <a-button v-if="row.pid != 0" @click="handleAddShow('insert', row)">新建下级</a-button>
            </template>
          </a-crud-table>
        </div>
      </a-col>
    </a-row>


  </a-card>
  <div>
    <a-crud-form @register="registerForm"/>
  </div>
  <!-- </PageWrapper> -->
</template>
<script lang="ts" setup>
  import { defineComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';

  import retireData from './data/form.tsx';
  import searchData from './data/search';
  import {
    PlusOutlined,

  } from '@ant-design/icons-vue';
  import { web_archivesManagement_getManagement_details, web_alterationApply_getByList } from '../api/';

const {proxy } = getCurrentInstance() as any;

  import tableData from "./data/table";
  import antdCrud from '../../package/index.js';
  const checkboxConfig = ref({
    checkAll: true,
    checkAllText: '全选',
    checkAllField: 'id',
    checkMethod: ()=>{
      return false;
    }
  });


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
  ]= antdCrud.useCrudTable(
      {
        table: {
          api: web_alterationApply_getByList,
          columns: tableData.tableForm(),
          params: searchData.resetForm(),
          isMenu: true,
           menuWidth: 300,
          isView: true,
          isEdit: true,
          // editIcon: false,
          // viewIcon: false,
          size: 'mini',
          isSortable: false, // 是否开启排序，这是总开关，这里开启后，如果column中设置sortable: false，则该字段也不会排序
          $attrs: {
            stripe: false,
            sortConfig:  {defaultSort:  {field: 'medicalRecordNo', order: 'asc'} },
            treeConfig: { childrenField: 'thirdPhysicianList' },
            onCheckboxChange: checkboxChange,
        checkboxConfig: checkboxConfig
          },
          pagination: {
            isPagination: true,
            pageSizeField: 'size',
          },
        },
        search: {
          formData: searchData.searchForm(),
          params: searchData.resetForm(),

        },
        form: {
          title: retireData.title,
          typeInfo: retireData.typeInfo,
          formData: retireData.formData,
          FooterCancelText: 'test',
          width: '50%',
          height: '350px',
          name: 'bmgl',
        },
      }
  );


 function handleAddShow(t, row) {


   handleFormShow(t, {...retireData.resetForm(), pid: row.id});
 }
  function checkboxChange(e) {
    console.log(e);
  }

</script>
<style scoped lang="less">
  .ant-card-body {
    padding: 0 5px !important;
  }



</style>
