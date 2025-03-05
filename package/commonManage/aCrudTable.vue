<template>
  <div class=" pb-2 mr-0 overflow-hidden bg-white basic-table basic-table-form-container aCrudTable vxeTableData">

    <template v-if="tableTransferPropsRef.isToolBox??tablePropsRef.isToolBox">
      <vxe-toolbar
          custom
          print
          export
          v-if="tableTransferPropsRef?.toolBox?.showType !== 'button' && tablePropsRef?.toolBox?.showType !== 'button'"
          ref="toolbarRef"
          v-bind="tableTransferPropsRef?.toolBox??tablePropsRef.toolBox"
          :refresh="{query: getData}">
        <slot name="buttons"  >

        </slot>
      </vxe-toolbar>
      <div  v-else
            ref="toolbarRef"  style="width: 100%;display: flex;justify-content: space-between;padding:0 0 5px  0;">
        <a-row style="width: 100%;">
          <a-col :span="12">
            <a-space >
              <slot name="buttons"  >

              </slot>
            </a-space>
          </a-col>

          <a-col :span="12" style="text-align: right;">
            <a-space >
              <a-input placeholder="请输入搜索内容" v-if="tableTransferPropsRef?.toolBox?.showSearch === true || tablePropsRef?.toolBox?.showSearch === true" v-model:value="filterName" @keyup="searchEvent"/>
              <a-button  v-if="tableTransferPropsRef?.toolBox?.showExport !== false && tablePropsRef?.toolBox?.showExport !== false" @click="openExport">
                <DownloadOutlined />
                导出
              </a-button>
              <a-button v-if="tableTransferPropsRef?.toolBox?.showPrint !== false && tablePropsRef?.toolBox?.showPrint !== false"  @click="openPrint">
                <PrinterOutlined />
                打印
              </a-button>
              <a-button v-if="tableTransferPropsRef?.toolBox?.showRefresh !== false && tablePropsRef?.toolBox?.showRefresh !== false"  @click="getData">
                <ReloadOutlined />
                刷新
              </a-button>
              <a-button  v-if="tableTransferPropsRef?.toolBox?.showSetting !== false && tablePropsRef?.toolBox?.showSetting !== false"  @click="openCustom">
                <SettingOutlined />
                设置
              </a-button>
            </a-space>
          </a-col>
        </a-row>
      </div>
    </template>

    <vxe-table ref="aCardTable"
               custom
               print
               export
               :custom-config="{mode: 'popup'}"
               :print-config="{}"
               :export-config="{}"
               v-if="tableTransferPropsRef"
                :loading="tableLoading"
               v-bind="tablePropsRef"
               :data="tableData">

          <template v-for="(item, index) in tableTransferPropsRef.columns.values()" :key="index" >
            <vxe-column v-if="item.type === 'seq'"    v-bind="item.$attrs" :type="'seq'"  ></vxe-column>
            <vxe-column v-else-if="item.type === 'checkbox'"    v-bind="item.$attrs"  :type="'checkbox'"   ></vxe-column>
            <vxe-column v-else-if="item.type === 'radio'"  v-bind="item.$attrs"  :type="'radio'" ></vxe-column>
            <vxe-column v-else-if="item.type === 'expand'"    v-bind="item.$attrs"   :type="'expand'" ></vxe-column>
            <vxe-column  v-else   :sortable="tableTransferPropsRef.isSortable !== false && item.sortable !== false"   :field="item.name" :title="item.text" :width="item.width" v-bind="item.$attrs" >
              <template #header>
                <span>{{item.fun ? item.fun( tableTransferPropsRef.columns, tableData) : item.text}}</span>
              </template>
              <template #default="{ row }">
                <span v-if="item.type == 'text'">{{ row[item.name] }}</span>
                <span v-else-if="item.type == 'select'">
                    <span v-if="item.option">{{
                        valueToName(item.option, row[item.name], 'value', 'name')
                      }}</span>
                    <span v-else>{{ row[item.name] }}</span>
                  </span>
                <span v-else-if="item.type == 'h'">
                    <div v-render="item.h(row, item, tableMethods, this)">
                    </div>
                </span>
                <span v-else-if="item.type == 'date'">
                    <div>
                      {{formatDate(row[item.name], item.format?? 'yyyy-MM-dd')}}
                    </div>
                </span>
                <span v-else-if="item.type == 'slot'">
                    <slot :name="item.name" :row="row"></slot>
                </span>
              </template>
            </vxe-column>

          </template>


      <vxe-column field="a" title="操作" fixed="right" v-if="tableTransferPropsRef.isMenu"    :width="tableTransferPropsRef.menuWidth" >
        <template #default="{ row }">
          <a-button type="link" v-if="tableTransferPropsRef.isView" @click="handleFormShow('show', row)">
            <template #icon v-if="tableTransferPropsRef.viewIcon !== undefined">
              <component v-if="tableTransferPropsRef.viewIcon !== false && typeof tableTransferPropsRef.editIcon === 'function'" :is="tableTransferPropsRef.viewIcon"></component>
            </template>
            <template #icon v-else>
             <EyeOutlined />
            </template>
            {{ tableTransferPropsRef?.viewText??'查看' }}</a-button>
          <a-button type="link" v-if="tableTransferPropsRef.isEdit" @click="handleFormShow('update', row)">
            <template #icon v-if="tableTransferPropsRef.editIcon !== undefined">
              <component v-if="tableTransferPropsRef.editIcon !== false && typeof tableTransferPropsRef.editIcon === 'function'" :is="tableTransferPropsRef.editIcon"></component>
            </template>
            <template #icon v-else>
              <EditOutlined />
            </template>
            {{ tableTransferPropsRef?.editText??'编辑' }}
          </a-button>

          <slot :row="row"></slot>
        </template>


      </vxe-column>
    </vxe-table>

    <div style="text-align: right;padding: 10px 0px;"   v-if="tableTransferPropsRef?.pagination?.isPagination !== false  ">
      <a-pagination
          v-model:current="currentPage"
          :total="tableTotal"
          :defaultPageSize="pageSize"
          v-model:pageSize="pageSize"
        v-bind="paginationConfig"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import {useGetTable} from "../hooks/useGetData";
import {render, h, ref, onMounted, defineProps, watch, getCurrentInstance, defineExpose} from "vue";
import {deepCopy, formatDate, getOptionList, valueToName} from "../utils";
import {message} from "ant-design-vue";
import {
  EyeOutlined,
  EditOutlined, DownloadOutlined, PrinterOutlined, ReloadOutlined, SettingOutlined
} from '@ant-design/icons-vue';
import {assertIsFunction, assertIsOption, computedFun, isComputedFunction} from "../model";
const { proxy } = getCurrentInstance();

 const emits = defineEmits([ 'register']);
 const props = defineProps({
   tableProps: {},
 })

 const tableTotal = ref(0);
 const tableLoading = ref(false);
 const tableData = ref([]);
 const aCardTable = ref();
 const toolbarRef = ref();
 const tablePropsRef = ref();
 const tableTransferPropsRef = ref();
 const currentPage = ref(1);
 const pageSize = ref(10);
 const resetParams = ref();
 const filterName = ref();

 const formRef = ref();
const searchRef = ref();
const tableDefaultProps = ref({...{
    maxHeight: "600px",
    align: "center",
    columnConfig:{ isCurrent: true, isHover: true, resizable: true },
    rowConfig: { isCurrent: true, isHover: true },
    headerCellClassName: () => 'headerCellClassName',
    cellClassName: () => 'cellClassName',
    stripe: true,
    border: 'default',
    size: 'mini',
    loadingConfig:{ icon: 'vxe-icon-indicator roll', text: '正在拼命加载中...' },
    class: "mytable-style" ,
    data:"tableData",
    menuWidth: 150,
    isMenu: true,
    immediate: true,
    isPagination: true,
    isToolBox: true,
    toolBox: {
      showType: 'button',

    },
  }, ...proxy.$crudGlobalTableConfig??{}})

 const paginationConfig = ref();
const tableDefaultPaginationConfig = ref({
    showTotal: (total) => `共 ${total} 条数据`,
   showSizeChanger: false,
   showLessItems: true
 });
const paginationTransferPropsRef = ref();
 onMounted(() => {
 //  tableTransferPropsRef.immediate && getData();
   // 将表格和工具栏进行关联
    if ((tableTransferPropsRef.value.isToolBox || tablePropsRef.value.isToolBox) && tableTransferPropsRef.value?.toolBox?.showType !== 'button' && tablePropsRef.value?.toolBox?.showType !== 'button') {
      const $table = aCardTable.value
      const $toolbar = toolbarRef.value
      if ($table && $toolbar) {
        $table.connect($toolbar)
      }
    }


 })



watch(currentPage, (data) => {
  // 默认设置page
  if (tableTransferPropsRef.value?.pagination?.isPagination !== false) {

    if (tableTransferPropsRef.value?.pagination?.pageField in tableTransferPropsRef.value.params && tableTransferPropsRef.value?.pagination?.pageField) {
      // 如果页面table配置传了pageField
      tableTransferPropsRef.value.params[tableTransferPropsRef.value?.pagination.pageField]  = data
    } else if (tablePropsRef.value?.pagination?.pageField in tableTransferPropsRef.value.params && tablePropsRef.value.pageField) {
       // 如果传了全局配置传了pageField
      tableTransferPropsRef.value.params[tablePropsRef.value.pageField]  = data;
    } else {
      // 默认使用page字段
      'page' in tableTransferPropsRef.value.params && tableTransferPropsRef.value.params.page ?   tableTransferPropsRef.value.params.page = data :  tableTransferPropsRef.value.params.page = undefined;
    }
  }

  getData();
})
watch(pageSize, (data) => {
  // 默认设置limit字段
  if (tableTransferPropsRef.value?.pagination?.isPagination !== false) {

    if (tableTransferPropsRef.value?.pagination?.pageSizeField) {
      // 如果页面table配置传了pageSizeField
      tableTransferPropsRef.value.params[tableTransferPropsRef.value?.pagination.pageSizeField]  = data
    } else if (tablePropsRef.value.pageSizeField) {
      // 如果传了全局配置传了pageSizeField
      tableTransferPropsRef.value.params[tablePropsRef.value.pageSizeField]  = data;
    } else {
      // 默认使用limit字段
      tableTransferPropsRef.value.params.limit  = data;
    }
    // 如果更改了每页数量，重新设置当前页为1
    currentPage.value = 1;
    getData();
  }


})

watch(() => props.tableProps, (data) => {
  tableTransferPropsRef.value = {...tableTransferPropsRef.value, ...data};
  console.log(data, tableTransferPropsRef, 256);
}, {deep: true })




function initFun() {
  // 运行item初始化方法
  tableTransferPropsRef.value.columns.forEach(column => {

    if (column.computedFun) {
      column.computedFun.forEach(async (item: computedFun<'function'> | computedFun<'option'>) => {
        // 初始化运行函数
        console.log(isComputedFunction(item));
        if (isComputedFunction(item)) {
          assertIsFunction(item);
          item.fun( tableTransferPropsRef.value.columns, item, tableData);
        } else  {
          assertIsOption(item);

            let params = item.params;
            if(item.dynamicParams) {
              params = {...params, ...item.dynamicParams(tableTransferPropsRef.value.columns,item, tableData)};
            }
          column.option = await getOptionList(item.api, params, item.relationField, item.childrenField);

        }
      })
    }
  })
}



// 初始化当前页和每页条数
function initPage(params) {

   if (tableTransferPropsRef.value?.pagination?.isPagination === false) {
     return;
   }
  currentPage.value = tableTransferPropsRef.value?.pagination?.pageField in params && tableTransferPropsRef.value?.pagination?.pageField ?
       params[tableTransferPropsRef.value?.pagination.pageField] :
      'page' in params && params.page ? params.page : undefined;
  pageSize.value =  tableTransferPropsRef.value?.pagination?.pageSizeField in params && tableTransferPropsRef.value?.pagination?.pageSizeField ?
      params[tableTransferPropsRef.value?.pagination.pageSizeField] :
      'limit' in params && params.page ? params.limit : undefined;
}



// 设置 table props
function setTableProps(props, ref) {
  tableTransferPropsRef.value = props
  // 设置 table props， 由默认props 和 传入的 props 组成
    tablePropsRef.value = { ...tableDefaultProps.value, ...tableTransferPropsRef.value?.$attrs??{}};

  formRef.value = ref.formRef;
  searchRef.value = ref.searchRef;
  // 初始化参数 如果没有传入params 则使用searchRef的参数
  console.log(searchRef.value._value, 306);
  if (!tableTransferPropsRef.value.params) {
    tableTransferPropsRef.value.params = searchRef?.value?._value?.getResetParams() || {};
  }
  resetParams.value = deepCopy(tableTransferPropsRef.value.params);


  // 设置分页参数 由默认分页参数 和 传入的分页参数 组成
  paginationConfig.value = { ...tableDefaultPaginationConfig.value, ...tableTransferPropsRef.value?.pagination??{}};

  // 设置初始页和初始每页条数 默认设置page和limit字段
  initPage(deepCopy(resetParams.value));

  // 判断初始化时是否需要请求数据
  if (tableTransferPropsRef.value.immediate !== false) {
    getData();
  }
}

function setPaginationProps(props) {
  paginationConfig.value = { ...paginationConfig.value, ...props};
}

function getTableRef() {
    return aCardTable.value;
}





// 设置当前分页
function setCurrentPagination(current) {
   if (current * pageSize.value > tableTotal.value) {
     return message.info('当前设置页数已超过数据总页数');
   }
  currentPage.value = current;
}

// 获取当前分页
function getCurrentPagination() {
  return currentPage.value;
}
// 获取数据总数
function getTotalPagination() {
  console.log(tableTotal.value);
  return tableTotal.value;
}


function mergeTableProps(props) {
  tableTransferPropsRef.value = {...tableTransferPropsRef.value, ...props};
  console.log(tableTransferPropsRef.value, 365);
  return tableTransferPropsRef;
}

function setTableColumns(columns) {
  tableTransferPropsRef.value.columns = columns;
  initFun();
}


// 设置最新参数
function setTableParams(params) {
   tableTransferPropsRef.value.params = deepCopy(params);
  initPage(tableTransferPropsRef.value.params);
}


// 重置
function reset() {
  tableTransferPropsRef.value.params = deepCopy(resetParams.value);
  initPage(deepCopy(resetParams.value));
  getData();
}

 const  vRender =  {
   updated: async (el, ctx) => {
     render(await ctx.value, el)
 },
 }


 // 如果有查看和编辑
 function handleFormShow(t, row) {
   console.log(formRef.value);
   formRef.value._value.handleFormShow(t, row);
 }

 function openExport() {
  aCardTable.value.openExport();
 }

 function openPrint() {
  aCardTable.value.openPrint();
 }
 function openCustom() {
  aCardTable.value.openCustom();
 }

const searchEvent = () => {
  const filterVal = String(filterName.value).trim().toLowerCase()
  if (filterVal) {
    const filterRE = new RegExp(filterVal, 'gi')

    const searchProps = Array.from(tableTransferPropsRef.value.columns.keys());
    const rest = tableData.value.filter(item => searchProps.some(key => String(item[key]).toLowerCase().indexOf(filterVal) > -1))
    tableData.value = rest.map(row => {
      const item = Object.assign({}, row)
      searchProps.forEach(key => {
        item[key] = String(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
      })
      return item
    })
  } else {
    tableData.value = tableData.value
  }
}

 // 导出外部需要使用的方法
 const tableMethods = {
   getData,
   getTableData,
   reset,
   setTableColumns,
   setTableParams,
   setTableProps,
   mergeTableProps,
   setCurrentPagination,
   getCurrentPagination,
   getTotalPagination,
 }


async function getData() {
  initFun();
   if (tableTransferPropsRef.value.mockData) {
     tableData.value = tableTransferPropsRef.value.mockData;
     return tableData.value;
   }

  if (tableTransferPropsRef.value.beforeCallback) {
    tableTransferPropsRef.value.beforeCallback(tableTransferPropsRef.value);
  }



   if (tableTransferPropsRef.value.api) {

       tableData.value = await useGetTable(tableTransferPropsRef.value.api,  tableTransferPropsRef.value.params, tableTotal, tableLoading, tableTransferPropsRef.value.dataCallback) || [];
     return tableData;
   }
 }

 function getTableData() {
   return tableData.value;
 }

defineExpose({getTableRef, tableMethods, aCardTable})
emits('register', tableMethods);



</script>
<script lang="ts">
export default {
  name: 'aCrudTable',
};
</script>
<style  lang="less">
.vxeTableData {
  .headerCellClassName {
    background-color: #f7f7f7;
    color: black;
    font-size: 14px;
  }
  .cellClassName {
    color: black;
  }


}


</style>
