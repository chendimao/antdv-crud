<template>
  <!-- <PageWrapper :title="currentPage?.title ?? ''"> -->
  <a-card style="width: 100%;">
    <template #title>

      <a-crud-search ref="searchRef"
                     @register="testUseSearch.register"
                     @search="emitSearch"
                     >

        <router-link to="/home1">to page2</router-link>
        <a-button
            @click="handleTest"
            type="primary"
            style="float: left; margin : 10px"
            size="middle"
            class="!px-2"
        >

          test pdf</a-button
        >
        <a-button
            @click="handleGetData"
            type="primary"
            style="float: left; margin : 10px"
            size="middle"
            class="!px-2"
        >

          test getdata</a-button
        >
        <a-button
            @click="handleTestBtn"
            type="primary"
            style="float: left; margin : 10px"
            size="middle"
            class="!px-2"
        >

          test ref</a-button
        >

        <a-button
            @click="handleSearch"
            type="primary"
            style="float: left; margin : 10px"
            size="middle"
            class="!px-2"
        >

          test搜索</a-button
        >
        <a-button
            @click="handleForm"
            type="primary"
            style="float: left; margin : 10px"
            size="middle"
            class="!px-2"
        >

          test form</a-button
        >
        <a-button
            @click="handleToggleForm"
            type="primary"
            style="float: left; margin : 10px"
            size="middle"
            class="!px-2"
        >

          切换form</a-button
        >

        <a-button
            @click="getFormData"
            type="primary"
            style="float: left; margin : 10px"
            size="middle"
            class="!px-2"
        >

          查看form formData</a-button
        >


        <a-button
            @click="getTableFormData"
            type="primary"
            style="float: left; margin : 10px"
            size="middle"
            class="!px-2"
        >

          查看table formData</a-button
        >


      </a-crud-search>
    </template>
    <a-row>
      <a-col :span="24">
        字典弹窗单独使用：
        <a-crud-dict style="width:200px;" :immediate="false" @change="changeDict" :api="GetDiagnosis"
                     :tableField="[
                 { field: 'a3', title: '名称', width: 150 },
                  { field: 'a1', title: '编码', width: 150 },
                  ]"
                     :params="{ page: 1, rows: 30, limit: 30, field: '', tableName: 'generate1' }"
                     searchField="field" selectField="a1"/>
        <div class="mr-0 overflow-hidden bg-white vben-basic-table vben-basic-table-form-container">
          <a-crud-table
            @register="testUseTable.register"
            ref="crudTableRef"
          >
            <template #buttons="data">
              <a-button
                  @click="handleAddShow('insert', data)"
                  type="primary"
                  style="float: left; magin-top: 10px"
                  size="middle"
                  class="!px-2"
              >
                <template #icon>
                  <PlusOutlined />
                </template>
                新增</a-button>

            </template>
            <template #default="{row}">
              <a-button   @click="handleUpdateShow(row)">编辑</a-button>
              <a-button v-if="row.pid != 0" @click="handleAddShow('insert')">新建下级</a-button>
            </template>

            <template #bz="data">test bz
<!--              <a-input v-model:value="data.formState.bz"  @blur="data.validateFun(data.item.name, { trigger: 'blur' }).catch(() => {})"/>-->
            </template>


          </a-crud-table>
        </div>
      </a-col>
    </a-row>


  </a-card>
  <div>
    <a-crud-form @register="testUseForm.register" ref="cardFormRef">
      <template #buttons="{data}" >
        <a-button type="primary" @click="handleAddTable(data)">新增</a-button>

      </template>
      <template #testSlot="{data}"> testslot
      </template>
      <template #testSlot2="{data}"> testslot2
      </template>
      <template #testSlot3="{data}"> testslot3asdfas
      </template>
      <template #default="{formState, loading}">
        <a-button @click="handleSave(formState)">保存</a-button>
      </template>
      <template #opera="{data}">
        <a-button @click="handleDeleteTable(data)">删除</a-button>
      </template>

    </a-crud-form>
    <a-crud-form @register="testUseForm2.register" ref="cardFormRef">
      <template #buttons="{data}" >
        <a-button type="primary" @click="handleAddTable(data)">新增</a-button>
        <a-button type="primary" @click="handleValidateTable(data)">校验</a-button>
      </template>
      <template #testSlot="{data}"> testslot
      </template>
      <template #testSlot2="{data}"> testslot2
      </template>
      <template #testSlot3="{data}"> testslot3asdfas
      </template>
      <template #opera="{data}">
        <a-button @click="handleDeleteTable2(data)">删除</a-button>
      </template>

    </a-crud-form>
    <a-button @click="handleFormSave()" type="primary">保存form</a-button>
    <!-- <a-crud-form @register="testUseForm2.registerForm" ref="cardFormRef">
      <template #testSlot="{data}">
        <a-input v-model:value="data.formState.testSlot"  @blur="data.validateFun(data.item.name, { trigger: 'blur' }).catch(() => {})"/>
      </template>
    </a-crud-form> -->

    <a-modal  width="100%" wrap-class-name="full-modal"  v-model:open="openModal" title="formData" @ok="openMOdal = false">
        <highlightjs style="width: 100%;height: 100%;" lang="json" :code="jsonFormData"></highlightjs>
    </a-modal>


  </div>
  <!-- </PageWrapper> -->
</template>
<script lang="ts" setup>
  import { defineComponent, getCurrentInstance, onMounted, reactive,nextTick, ref } from 'vue';

  import {mockData} from './data/mockData.ts';
  import retireData from './data/form.tsx';
  import retireData2 from './data/form2.tsx';
  import searchData from './data/search';
  import {
    PlusOutlined,

  } from '@ant-design/icons-vue';
  import { web_archivesManagement_getManagement_details, web_alterationApply_getByList, summaryPageList, GetDiagnosis, web_alterationApply_insertOrUpdate } from '../api/';

const {proxy } = getCurrentInstance() as any;

  import tableData from "./data/table";
  import antdCrud from '../../package/index.js';
  import {formatDate} from "../../package/utils";
  import { jsPDF } from 'jspdf';
  const checkboxConfig = ref({
    checkAll: true,
    checkAllText: '全选',
    checkAllField: 'id',
    checkMethod: ()=>{
      return false;
    }
  });

  const cardFormRef = ref();
  const methods = ref();
  const openModal = ref(false);
  const jsonFormData = ref('');

const crudTableRef = ref();
  const test = ref(123);
  const handleData = ref();

  const tableProps = ref({
    api: summaryPageList,
    columns: tableData,
     mockData: mockData,
    isMenu: true,
    menuWidth: 300,
    isView: true,
    isEdit: false,
    beforeCallback: (props) => {
      props.params.userId = 'sfadfas';
    },
    // editIcon: false,
    // viewIcon: false,1
    size: 'mini',
    isSortable: false, // 是否开启排序，这是总开关，这里开启后，如果column中设置sortable: false，则该字段也不会排序
    $attrs: {
      stripe: false,
      exportConfig: {},
      sortConfig:  {defaultSort:  {field: 'medicalRecordNo', order: 'asc'} },
      treeConfig: { childrenField: 'thirdPhysicianList' },
      height: '200px',
      onCheckboxChange: checkboxChange,
      checkboxConfig: checkboxConfig
    },
    toolBox: {
      showType: 'button',
      showExport: false,
      showPrint: false
    },
  });


  const formProps =  ref({
      title: '用户管理',
      formData: retireData,
      insertApi: web_alterationApply_insertOrUpdate,
      updateApi: web_alterationApply_insertOrUpdate,
      requestCallback: handleRequestCallback,
      name: 'bmgl',

      /// visible: true,

    });
  const formProps2 =  ref({
      title: '用户管理',
      formData: retireData,
      css: `


         .szsrk .ant-form-item-label >label  {
          background:red;
          color: white;
          }
          .table tr  {
            background: rgba(255,0,0,0.5) !important;
            color: white;
          }


      `,
      insertApi: web_alterationApply_insertOrUpdate,
      updateApi: web_alterationApply_insertOrUpdate,
      requestCallback: handleRequestCallback,
      name: 'bmgl',
    modalType: 'form',
      /// visible: true,

    });
    const searchProps =  {
      formData: searchData,
    } ;
    const testUseForm = new antdCrud.useForm(formProps.value);
    const testUseForm2 = new antdCrud.useForm(formProps2.value);
    const testUseTable = new antdCrud.useTable(tableProps.value);
    const testUseSearch = new antdCrud.useSearch(searchProps );
    console.log(testUseForm, testUseTable.tableMethods, testUseSearch);

onMounted(async () => {
  methods.value  = new antdCrud.useCrud({form: testUseForm, table: testUseTable, search: testUseSearch}).methods;
  console.log(methods, 240);
});


function handleDataCallback(res) {
  console.log(res);
  }

  async function handleRequestCallback (api ,params) {
    return await api(params, handleData.value);
  }

   function handleAddShow(t, data) {
     console.log(data)
   methods.value.handleFormShow(t)
 } 

  function handleToggleForm() {
    // let zkmcData = formMethods.value.getFormDataValue('zkmc');
    // formMethods.value.setFormDataValue('zkmc', {...zkmcData, text: 'test'})
    // console.log(formMethods.value.getFormDataValue('zkmc'));
    console.log(methods.value,  testUseForm2.methods.value.setFormPropsValue);

    testUseForm2.methods.value.setFormPropsValue('visible',  !testUseForm2.methods.value.getFormPropsValue('visible'));
  }

  function handleFormSave() {
    console.log( testUseForm2.methods.value);
    testUseForm2.methods.value.handleFormSubmit();
  }


 function handleSave(formState) {
   console.log(formState);
   methods.value.handleFormSubmit({eee: 1});
 }

 function beforeCallback(props) {
   console.log(props);
   props.params.userId = new Date();
 }


 function handleUpdateShow(row) {
  handleData.value = row;
   console.log(handleData.value);
   methods.value.handleFormShow('update', row);
 }

 function changeDict(ev, data) {
   console.log(ev, data);
 }

  function checkboxChange(e) {
    console.log(e);
  }


  function emitSearch(params) {
    // 查询图表接口
    console.log('search', params);
    // 查询table列表
    methods.value.getData(params);
  }

  async function handleValidateTable(data) {
    const res  = await data.tableRef.fullValidate(true);
    console.log(res);
  }


 async function handleAddTable(data) {
   console.log(data);
   data.tableData.push({

     "zkbm": "1",
     "bmbm": "BA00.Y",
     "zhbm": "B04.02.01.04.02.01",
     "ysbm": "Z01",
     "ysmc": "头痛234",
     "checkbox": ['1','2', 3],
     "date": "2025-04-03",
     'switch': '1',
     'radio': '1',
     'rate': '1',
     'slider': '12',
     'textarea': 'textarea1',
     'upload': [
       { name: 'fj577.jpg', url: 'https://vxeui.com/resource/img/fj577.jpg' },
       { name: 'fj581.jpeg', url: 'https://vxeui.com/resource/img/fj581.jpeg' }
     ],
   })
  }

  function handleDeleteTable(data) {
    console.log(data);
    data.tableData = data.tableRef.getTableData().tableData;
    console.log( data.tableRef.getTableData(), data.tableData)
  }
  function handleDeleteTable2(data) {
    data.tableRef.remove(data.row);
    testUseForm2.methods.value.setFormStateValue('table', data.tableRef.getTableData().tableData);
    console.log( data.tableRef.getTableData(), testUseForm2.methods.value.getFormStateValue('table'))
  }

  function handleTest(e) {
    var doc = new jsPDF();
// 添加并设置字体
    doc.addFont('/src/assets/fonts/HARMONYOS_SANS_SC_BOLD.ttf', 'SourceHanSans-Normal', 'normal');
    doc.setFont('SourceHanSans-Normal');
    doc.text('简体中文、繁體体中文、English、ジャパン、한국어', 20, 20);
    doc.save('my.pdf');
  }

  function handleTestBtn(e) {
    console.log(e, crudTableRef.value.getTableRef().openExport());

  }


  async function handleSearch(e) { 
    methods.value.getSearch({test: 34}, true)

  }

  async function handleForm(e) {
    tableProps.value.test = 'test';
    console.log(cardFormRef.value);
    
  }


 async function handleGetData() {
await methods.value.mergeTableProps({api: web_alterationApply_getByList});
  //  await mergeSearchParams({test: '1234123123'});
   await  methods.value.mergeSearchResetParams({test234: 23424});
   const params = await  methods.value.getSearchParams();
   methods.value.getSearch({...params, test234: 23424});
    //getData();
  }

  function getTableFormData() {
    jsonFormData.value = JSON.stringify(tableData);
    openModal.value = true;
  }

  function getFormData() {
    jsonFormData.value = JSON.stringify(retireData);
    openModal.value = true;
  }



</script>
<style scoped lang="less">
  .ant-card-body {
    padding: 0 5px !important;
  }



</style>
