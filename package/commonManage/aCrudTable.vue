<template>
  <div class="p-2 mr-0 overflow-hidden bg-white basic-table basic-table-form-container aCrudTable vxeTableData">
    <vxe-table ref="aCardTable"
               v-if="tableTransferPropsRef"
               v-bind="tablePropsRef"
               :data="tableData">

          <template v-for="(item, index) in tableTransferPropsRef.columns.values()" :key="index" >
            <vxe-column v-if="item.type === 'seq'"    v-bind="item.$attrs" :type="'seq'"  ></vxe-column>
            <vxe-column v-else-if="item.type === 'checkbox'"    v-bind="item.$attrs"  ></vxe-column>
            <vxe-column v-else-if="item.type === 'radio'"  v-bind="item.$attrs" ></vxe-column>
            <vxe-column v-else-if="item.type === 'expand'"    v-bind="item.$attrs"  ></vxe-column>
            <vxe-column  v-else   :sortable="tableTransferPropsRef.isSortable !== false && item.sortable !== false"   :field="item.name" :title="item.text"  v-bind="item.$attrs">
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
              <div v-render="item.h(row, item)">
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
import {render, h, ref, onMounted, defineProps, watch} from "vue";
import {valueToName} from "../utils";
import {message} from "ant-design-vue";

const tableDefaultProps = ref({
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

})


 const emits = defineEmits(['update:formState', 'register']);


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

   showSizeChanger: false,
   showLessItems: true
 });
const paginationTransferPropsRef = ref();
 onMounted(() => {
 //  tableTransferPropsRef.immediate && getData();


 })

watch(currentPage, (data) => {
  tableTransferPropsRef.value?.pagination?.pageField ?
      tableTransferPropsRef.value.params[tableTransferPropsRef.value?.pagination.pageField]  = data:
      tableTransferPropsRef.value.params.page  = data;
  getData();
})
watch(pageSize, (data) => {
  tableTransferPropsRef.value?.pagination?.pageSizeField ?
      tableTransferPropsRef.value.params[tableTransferPropsRef.value?.pagination.pageSizeField]  = data:
      tableTransferPropsRef.value.params.limit  = data;
  getData();
})


// 设置 table props
function setTableProps(props) {
  tableTransferPropsRef.value = props
    tablePropsRef.value = { ...tableDefaultProps.value, ...tableTransferPropsRef.value?.$attrs??{}};
  paginationConfig.value = { ...tableDefaultPaginationConfig.value, ...tableTransferPropsRef.value?.pagination??{}};
  resetParams.value = { ...tableTransferPropsRef.value.params};
  console.log(paginationConfig.value);


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

 const  vRender =  {
   updated: async (el, ctx) => {
     render(await ctx.value, el)
 },
 }


 // 导出外部需要使用的方法
 const tableMethods = {
   getData,
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
