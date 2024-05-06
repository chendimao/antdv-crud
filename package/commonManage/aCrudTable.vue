<template>
  <div class="p-2 mr-0 overflow-hidden bg-white basic-table basic-table-form-container aCrudTable vxeTableData">
    <vxe-table ref="aCardTable"
               v-if="tableTransferPropsRef"
               v-bind="tablePropsRef"
               :data="tableData">

          <template v-for="(item, index) in tableTransferPropsRef.columns.values()" :key="index" >
            <vxe-column v-if="item.type === 'seq'"    v-bind="item.$attrs" :type="'seq'"  ></vxe-column>
            <vxe-column v-else-if="item.type === 'checkbox'"    v-bind="item.$attrs"  :type="'checkbox'"  ></vxe-column>
            <vxe-column v-else-if="item.type === 'radio'"  v-bind="item.$attrs"  :type="'radio'" ></vxe-column>
            <vxe-column v-else-if="item.type === 'expand'"    v-bind="item.$attrs"   :type="'expand'" ></vxe-column>
            <vxe-column  v-else   :sortable="tableTransferPropsRef.isSortable !== false && item.sortable !== false"   :field="item.name" :title="item.text" :width="item.width" v-bind="item.$attrs">
              <template #header>
                <span>{{item.fun ? item.fun(formState) : item.text}}</span>
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
              <div v-render="item.h(row, item, tableMethods)">
              </div>
          </span>
              </template>
            </vxe-column>

          </template>


      <vxe-column field="a" title="操作" fixed="right" v-if="tableTransferPropsRef.isMenu"    :width="tableTransferPropsRef.menuWidth" >
        <template #default="{ row }">

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
import {deepCopy, valueToName} from "../utils";
import {message} from "ant-design-vue";
const { proxy } = getCurrentInstance();
const tableDefaultProps = ref({...{
    maxHeight: "600px",
    align: "center",
    loading: false,
    columnConfig:{ isCurrent: true, isHover: true },
    rowConfig: { isCurrent: true, isHover: true },
    headerCellClassName: () => 'headerCellClassName',
    cellClassName: () => 'cellClassName',
    stripe: true,
    size: 'mini',
    loadingConfig:{ icon: 'vxe-icon-indicator roll', text: '正在拼命加载中...' },
    class: "mytable-style" ,
    data:"tableData",
    menuWidth: 150,
    isMenu: true,
    immediate: true,
    isPagination: true,

  }, ...proxy.$crudGlobalTableConfig??{}})


 const emits = defineEmits([ 'register']);


 const tableTotal = ref(0);
 const tableLoading = ref(false);
 const tableData = ref([]);
 const aCardTable = ref();
 const tablePropsRef = ref();
 const tableTransferPropsRef = ref();
 const currentPage = ref(1);
 const pageSize = ref(10);
 const resetParams = ref();

 const paginationConfig = ref();
const tableDefaultPaginationConfig = ref({
    showTotal: (total) => `共 ${total} 条数据`,
   showSizeChanger: false,
   showLessItems: true
 });
const paginationTransferPropsRef = ref();
 onMounted(() => {
 //  tableTransferPropsRef.immediate && getData();


 })

watch(currentPage, (data) => {
  // 默认设置page
  tableTransferPropsRef.value?.pagination.isPagination !== false && tableTransferPropsRef.value?.pagination?.pageField ?
      tableTransferPropsRef.value.params[tableTransferPropsRef.value?.pagination.pageField]  = data:
      tableTransferPropsRef.value.params.page  = data;
  getData();
})
watch(pageSize, (data) => {
  // 默认设置limit字段
  tableTransferPropsRef.value?.pagination.isPagination !== false && tableTransferPropsRef.value?.pagination?.pageSizeField ?
      tableTransferPropsRef.value.params[tableTransferPropsRef.value?.pagination.pageSizeField]  = data:
      tableTransferPropsRef.value.params.limit  = data;
  getData();
})

// 初始化当前页和每页条数
function initPage(params) {

   if (tableTransferPropsRef.value?.pagination.isPagination === false) {
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
function setTableProps(props) {
  tableTransferPropsRef.value = props
  // 设置 table props， 由默认props 和 传入的 props 组成
    tablePropsRef.value = { ...tableDefaultProps.value, ...tableTransferPropsRef.value?.$attrs??{}};
  console.log(tablePropsRef.value);

  // 设置分页参数 由默认分页参数 和 传入的分页参数 组成
  paginationConfig.value = { ...tableDefaultPaginationConfig.value, ...tableTransferPropsRef.value?.pagination??{}};

  // 设置初始页和初始每页条数 默认设置page和limit字段
  resetParams.value = deepCopy(tableTransferPropsRef.value.params);
  initPage(deepCopy(tableTransferPropsRef.value.params));


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

// 设置最新参数
function setTableParams(params) {
   tableTransferPropsRef.value.params = deepCopy({...tableTransferPropsRef.value.params, ...params});
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


 // 导出外部需要使用的方法
 const tableMethods = {
   getData,
   reset,
   setTableParams,
   setTableProps,
   setCurrentPagination,
   getCurrentPagination,
   getTotalPagination,
 }


async function getData() {
   if (tableTransferPropsRef.value.api) {
     console.log(tableTransferPropsRef.value.params, 109);
       tableData.value = await useGetTable(tableTransferPropsRef.value.api,  tableTransferPropsRef.value.params, tableTotal, tableLoading, tableTransferPropsRef.value.dataCallback) || [];
     return tableData;
   }
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


}


</style>
