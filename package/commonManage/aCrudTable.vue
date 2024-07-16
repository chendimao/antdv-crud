<template>
  <div class="p-2 mr-0 overflow-hidden bg-white basic-table basic-table-form-container aCrudTable vxeTableData">

    <vxe-toolbar
        custom
        print
        export
        v-if="tableTransferPropsRef.isToolBox??tablePropsRef.isToolBox"
        ref="toolbarRef"
        v-bind="tableTransferPropsRef.toolBox??tablePropsRef.toolBox"
        :refresh="{query: getData}">
      <slot name="buttons">

      </slot>
    </vxe-toolbar>
    <vxe-table ref="aCardTable"
               :print-config="{}"
               :custom-config="{mode: 'popup'}"
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

    <div style="text-align: right;padding: 10px;"   v-if="tableTransferPropsRef?.pagination?.isPagination !== false">
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
import {render, h, ref, onMounted, defineProps, watch, getCurrentInstance} from "vue";
import {deepCopy, formatDate, getOptionList, valueToName} from "../utils";
import {message} from "ant-design-vue";
import {
  EyeOutlined,
  EditOutlined
} from '@ant-design/icons-vue';
import {assertIsFunction, assertIsOption, computedFun, isComputedFunction} from "../model";
const { proxy } = getCurrentInstance();


 const emits = defineEmits([ 'register']);


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
   const $table = aCardTable.value
   const $toolbar = toolbarRef.value
   if ($table && $toolbar) {
     $table.connect($toolbar)
   }

 })

watch(currentPage, (data) => {
  // 默认设置page
  if (tableTransferPropsRef.value?.pagination?.isPagination !== false) {

    if (tableTransferPropsRef.value?.pagination?.pageField) {
      // 如果页面table配置传了pageField
      tableTransferPropsRef.value.params[tableTransferPropsRef.value?.pagination.pageField]  = data
    } else if (tablePropsRef.value.pageField) {
       // 如果传了全局配置传了pageField
      tableTransferPropsRef.value.params[tablePropsRef.value.pageField]  = data;
    } else {
      // 默认使用page字段
      tableTransferPropsRef.value.params.page  = data;
    }
  }

  console.log(data, 141);
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
  }

  // 如果更改了每页数量，重新设置当前页为1
  currentPage.value = 1;
  getData();
})


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
              params = {...item.dynamicParams(tableTransferPropsRef.value.columns,item, tableData)};
            }
          column.option = await getOptionList(item.api, item.params, item.relationField, item.childrenField);

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

  currentPage.value = tableTransferPropsRef.value?.pagination?.pageField ?
       params[tableTransferPropsRef.value?.pagination.pageField] :
      params.page;
  pageSize.value = tableTransferPropsRef.value?.pagination?.pageSizeField ?
      params[tableTransferPropsRef.value?.pagination.pageSizeField] :
       params.limit;
}



// 设置 table props
function setTableProps(props, ref) {
  tableTransferPropsRef.value = props
  // 设置 table props， 由默认props 和 传入的 props 组成
    tablePropsRef.value = { ...tableDefaultProps.value, ...tableTransferPropsRef.value?.$attrs??{}};

  formRef.value = ref.formRef;
  searchRef.value = ref.searchRef;
  // 初始化参数 如果没有传入params 则使用searchRef的参数
  if (!tableTransferPropsRef.value.params) {
    tableTransferPropsRef.value.params = searchRef.value._value.getResetParams() || {};
  }
  resetParams.value = deepCopy(tableTransferPropsRef.value.params);


  // 设置分页参数 由默认分页参数 和 传入的分页参数 组成
  paginationConfig.value = { ...tableDefaultPaginationConfig.value, ...tableTransferPropsRef.value?.pagination??{}};

  // 设置初始页和初始每页条数 默认设置page和limit字段
  initPage(deepCopy(resetParams.value));
  initFun();

  // 判断初始化时是否需要请求数据
  if (tableTransferPropsRef.value.immediate !== false) {
    getData();
  }
}

function setPaginationProps(props) {
  paginationConfig.value = { ...paginationConfig.value, ...props};
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

 // 导出外部需要使用的方法
 const tableMethods = {
   getData,
   getTableData,
   reset,
   setTableColumns,
   setTableParams,
   setTableProps,
   setCurrentPagination,
   getCurrentPagination,
   getTotalPagination,
 }


async function getData() {
   if (tableTransferPropsRef.value.mockData) {
     tableData.value = tableTransferPropsRef.value.mockData;
     return tableData.value;
   }



   if (tableTransferPropsRef.value.api) {

       tableData.value = await useGetTable(tableTransferPropsRef.value.api,  tableTransferPropsRef.value.params, tableTotal, tableLoading, tableTransferPropsRef.value.dataCallback) || [];
     return tableData;
   }
 }

 function getTableData() {
   return tableData.value;
 }


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
 .ant-btn {
  padding:  5px !important;
   height: 22px !important;
}

}


</style>
