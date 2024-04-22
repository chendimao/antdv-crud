<template>
  <!-- <PageWrapper :title="currentPage?.title ?? ''"> -->
  <a-card>
    <template #title>
      <div>
        <!-- <a-space style=""> -->
        <!-- <a-button @click="handleShow('insert')" type="primary"  >模板下载</a-button> -->

        <!-- </a-space> -->
      </div>

      <a-crud-search ref="searchRef" :search-form="searchForm" v-model:form-state="searchQuery"
                   :form-validate="searchValidate" :reset-form="searchData.resetForm()" @search="handleSearch">
        <a-button
            @click="handleShow('insert')"
            type="primary"
            style="float: left; magin-top: 10px"
            size="middle"
            class="!px-2"
            v-if="!(currentPage?.other?.showAdd === false)"
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
            ref="tableRef"
            :form-data="tableFormData"
            :api="web_alterationApply_getByList"
            :formState="searchQuery"
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
      v-if="currentPage"
      v-model:add-visible="addVisible"
      :row="currentRow"
      :type="type"
      width="80%"
      height="350px"
      :name="'bmgl'"
      @refreshList="getData"
      :currentPageData="currentPage"
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


  import _ from 'lodash';
  import dayjs from 'dayjs';
  import {message} from "ant-design-vue";


  const categoryName = ref();
  const tableRef = ref();
  const currentPage = ref<any>();
  const base = ref([]);
  const total = ref(0);
  const editVisible = ref(false);
  const addVisible = ref(false);
  const roleData = ref([]);
  const loading = ref(false);
  const query = ref(searchData.resetForm);
  const type = ref('insert');
  const recordInfo = ref();
  const resetForm = ref();
  const currentRow = ref({});

  const tableData = ref([]);
  const searchForm = searchData.searchForm();
  const searchValidate = searchData.validateForm();
  const searchQuery = searchData.resetForm();

  const tableFormData = retireData.tableForm();
  const tableFormState = retireData.resetForm();

  onMounted(async () => {

      currentPage.value = retireData;

      resetForm.value = { ...currentPage.value.resetForm(), type:  0 };


    //roleData.value = await getOptionList('roleGetRoleSelect', {limit: 1000, page: 1}, ['name/roleName', 'id/id']);
  });



  function getData() {
    tableRef.value.getData();
  }


  async function handleShow(t, row: any = {}) {

    addVisible.value = true;
    type.value = t;

    if (type.value == 'update' || type.value == 'show') {
      currentRow.value = { ...row, departments: '0318' };
    } else if (type.value == 'insert') {

      resetForm.value.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
      let state =3;
      currentRow.value = { ...resetForm.value, departments: '0318', state };

    }

    console.log('currentPage.value', currentPage.value);
  }


  function handleSearch() {
    getData();
  }
</script>
<style scoped lang="less">
  :deep(.ant-card-body) {
    padding: 0 5px !important;
  }
</style>
