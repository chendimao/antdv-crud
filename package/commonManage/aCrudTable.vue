<template>
  <div class=" pb-2 mr-0 overflow-hidden bg-white basic-table basic-table-form-container aCrudTable vxeTableData"
       :style="{ '--current-row-bg': tablePropsRef.currentRowBg, '--current-row-color': tablePropsRef.currentRowColor }"
  >

    <template v-if="tableTransferPropsRef.isToolBox??tablePropsRef.isToolBox">
      <vxe-toolbar
          custom
          print
          export

          v-if="tableTransferPropsRef?.toolBox?.showType !== 'button' && tablePropsRef?.toolBox?.showType !== 'button'"
          ref="toolbarRef"
          v-bind="tableTransferPropsRef?.toolBox??tablePropsRef.toolBox"
          :refresh="{query:  getData(undefined)}">
        <slot name="buttons"  >
        </slot>
      </vxe-toolbar>
      <div  v-else
            ref="toolbarRef"  style="width: 100%;display: flex;justify-content: space-between;padding:0 0 5px  0;">
        <a-row style="width: 100%;">

          <a-col :span="12">
            <a-space >
              <slot name="buttons"  :data="{ tableData, tableRef: aCardTable}">

              </slot>
            </a-space>
          </a-col>

          <a-col :span="12" style="text-align: right;">
            <a-space >
              <slot name="menuLeft"  :data="{ tableData, tableRef: aCardTable}">

              </slot>
              <a-input placeholder="请输入搜索内容" v-if="tableTransferPropsRef?.toolBox?.showSearch === true || tablePropsRef?.toolBox?.showSearch === true" v-model:value="filterName" @keyup="searchEvent"/>
              <a-button  v-if="tableTransferPropsRef?.toolBox?.showExport !== false && tablePropsRef?.toolBox?.showExport !== false" @click="openExport">
                <DownloadOutlined />
                导出
              </a-button>
              <a-button v-if="tableTransferPropsRef?.toolBox?.showPrint !== false && tablePropsRef?.toolBox?.showPrint !== false"  @click="openPrint">
                <PrinterOutlined />
                打印
              </a-button>
              <a-button v-if="tableTransferPropsRef?.toolBox?.showRefresh !== false && tablePropsRef?.toolBox?.showRefresh !== false"  @click="  getData(undefined)">
                <ReloadOutlined />
                刷新
              </a-button>
              <a-button  v-if="tableTransferPropsRef?.toolBox?.showSetting !== false && tablePropsRef?.toolBox?.showSetting !== false"  @click="openCustom">
                <SettingOutlined />
                设置
              </a-button>
              <slot name="menuRight"  :data="{ tableData, tableRef: aCardTable}">
              </slot>
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
      <table-column
          :columns="tableColumn"
          :table-data="tableData"
          :table-methods="tableMethods"
          :table-ref="aCardTable"
          :is-sortable="tableTransferPropsRef.isSortable"
          :size="tableTransferPropsRef?.size"
          :edit-type="tableTransferPropsRef.editType"
      >
        <template v-for="(_, name) in $slots" #[name]="slotData">
          <slot :name="name" v-bind="slotData"></slot>
        </template>
      </table-column>

      <table-operation-column
          v-if="tableTransferPropsRef.isMenu??tableTransferPropsRef?.menu?.isMenu"
          :is-menu="tableTransferPropsRef.isMenu??tableTransferPropsRef?.menu?.isMenu"
          :menu="tableTransferPropsRef.menu"
          :menu-width="tableTransferPropsRef.menuWidth"
          :is-view="tableTransferPropsRef.isView"
          :is-edit="tableTransferPropsRef.isEdit"
          :view-icon="tableTransferPropsRef.viewIcon"
          :edit-icon="tableTransferPropsRef.editIcon"
          :view-text="tableTransferPropsRef.viewText"
          :edit-text="tableTransferPropsRef.editText"
          :form-methods="tableTransferPropsRef.formMethods"
          @view="handleFormShow('show', $event)"
          @edit="handleFormShow('update', $event)"
      >
        <template #default="{ row, data }">
          <slot :row="row" :data="data"></slot>
        </template>
      </table-operation-column>
    </vxe-table>
    <div style="text-align: right;padding: 10px 0px;"   v-if="tableTransferPropsRef?.pagination?.isPagination !== false  ">
      <a-pagination
          v-model:current="currentPage"
          :total="tableTotal"
          :defaultPageSize="pageSize"
          v-model:pageSize="pageSize"
          @change="handlePaginationChange"
          @showSizeChange="handlePageSizeChange"
          v-bind="paginationConfig"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import {useGetTable} from "../hooks/useGetData";
import {render, h, ref, onMounted, defineProps, watch, getCurrentInstance, defineExpose, useSlots, computed} from "vue";
import {deepCopy, formatDate, getOptionList, valueToName} from "../utils";
import {message} from "ant-design-vue";
import {
  EyeOutlined,
  EditOutlined, DownloadOutlined, PrinterOutlined, ReloadOutlined, SettingOutlined
} from '@ant-design/icons-vue';
import {assertIsFunction, assertIsOption, type computedFun, isComputedFunction} from "../model";
import TableOperationColumn from './components/TableOperationColumn.vue';
import TableColumn from './components/TableColumn.vue';
const { proxy } = getCurrentInstance();

const emits = defineEmits([ 'register', 'change']);


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
const tableColumn = ref(new Map());
const slots = useSlots();

const props = defineProps({
  config: {default: {}}
});

watch(() => props.config, (data) => {
  setTableProps({...tableTransferPropsRef.value, ...data})
}, {deep: true })
watch(() => tableData, (data) => {

  if (tableTransferPropsRef.value.editType == 'all' || tableTransferPropsRef.value.editType == 'edit') {
    emits('change', data.value);
  }
}, {deep: true})



const tableDefaultProps = ref({...{
    maxHeight: "600px",
    align: "center",
    currentRowBg: '#e6f7ff',
    currentRowColor: 'black',
    columnConfig:{  isCurrent: false, isHover: true, resizable: true },
    rowConfig: { isCurrent: true, isHover: true },
    headerCellClassName: () => 'headerCellClassName',
    cellClassName: () => 'cellClassName',
    stripe: true,
    border: 'default',
    size: 'mini',
    loadingConfig:{ icon: 'vxe-icon-indicator roll', text: '正在拼命加载中...' },
    class: "mytable-style" , 
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

  console.log(slots, 326);


  if ((tableTransferPropsRef.value.isToolBox || tablePropsRef.value.isToolBox) && tableTransferPropsRef.value?.toolBox?.showType !== 'button' && tablePropsRef.value?.toolBox?.showType !== 'button') {
    const $table = aCardTable.value
    const $toolbar = toolbarRef.value
    if ($table && $toolbar) {
      $table.connect($toolbar)
    }
  }


})





function initFun() {
  // 运行item初始化方法
  tableColumn.value.forEach(column => {

    if (column.computedFun) {
      column.computedFun.forEach(async (item: computedFun<'function'> | computedFun<'option'>) => {
        // 初始化运行函数
        console.log(isComputedFunction(item));
        if (isComputedFunction(item)) {
          assertIsFunction(item);
          item.fun( tableColumn.value, item, tableData);
        } else  {


          let params = item.params;
          if(item.dynamicParams) {
            params = {...params, ...item.dynamicParams(tableColumn.value,item, tableData)};
          }
          column.option = await getOptionList(item.api, params, item.relationField??item.field, item.childrenField);

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
      params[tableTransferPropsRef.value?.pagination.pageField]??1 :
      'page' in params && params.page ? params.page : 1;
  pageSize.value =  tableTransferPropsRef.value?.pagination?.pageSizeField in params && tableTransferPropsRef.value?.pagination?.pageSizeField ?
      params[tableTransferPropsRef.value?.pagination.pageSizeField]??10 :
      'limit' in params && params.page ? params.limit : 10;


  if (tableTransferPropsRef.value?.pagination?.pageField in tableTransferPropsRef.value.params && tableTransferPropsRef.value?.pagination?.pageField) {
    // 如果页面table配置传了pageField
    tableTransferPropsRef.value.params[tableTransferPropsRef.value?.pagination.pageField]  = currentPage.value
  } else if (tablePropsRef.value?.pagination?.pageField in tableTransferPropsRef.value.params && tablePropsRef.value.pageField) {
    // 如果传了全局配置传了pageField
    tableTransferPropsRef.value.params[tablePropsRef.value.pageField]  = currentPage.value;
  } else {
    // 默认使用page字段
    'page' in tableTransferPropsRef.value.params && tableTransferPropsRef.value.params.page ?   tableTransferPropsRef.value.params.page = currentPage.value :  tableTransferPropsRef.value.params.page = undefined;
  }


  if (tableTransferPropsRef.value?.pagination?.pageSizeField) {
    // 如果页面table配置传了pageSizeField
    tableTransferPropsRef.value.params[tableTransferPropsRef.value?.pagination.pageSizeField]  = pageSize.value
  } else if (tablePropsRef.value.pageSizeField) {
    // 如果传了全局配置传了pageSizeField
    tableTransferPropsRef.value.params[tablePropsRef.value.pageSizeField]  = pageSize.value;
  } else {
    // 默认使用limit字段
    tableTransferPropsRef.value.params.limit  = pageSize.value;
  }
  console.log(tableTransferPropsRef.value.params, 293);

}

// 页码或 pageSize 改变的回调
function handlePaginationChange(page, pageSize) {
  if (tableTransferPropsRef.value?.pagination?.pageField in tableTransferPropsRef.value.params && tableTransferPropsRef.value?.pagination?.pageField) {
    // 如果页面table配置传了pageField
    tableTransferPropsRef.value.params[tableTransferPropsRef.value?.pagination.pageField]  = page
  } else if (tablePropsRef.value?.pagination?.pageField in tableTransferPropsRef.value.params && tablePropsRef.value.pageField) {
    // 如果传了全局配置传了pageField
    tableTransferPropsRef.value.params[tablePropsRef.value.pageField]  = page;
  } else {
    // 默认使用page字段
    'page' in tableTransferPropsRef.value.params && tableTransferPropsRef.value.params.page ?   tableTransferPropsRef.value.params.page = page :  tableTransferPropsRef.value.params.page = undefined;
  }
  getData();
}

function handlePageSizeChange(current, pageSize) {
  if (tableTransferPropsRef.value?.pagination?.pageSizeField) {
    // 如果页面table配置传了pageSizeField
    tableTransferPropsRef.value.params[tableTransferPropsRef.value?.pagination.pageSizeField]  = pageSize
  } else if (tablePropsRef.value.pageSizeField) {
    // 如果传了全局配置传了pageSizeField
    tableTransferPropsRef.value.params[tablePropsRef.value.pageSizeField]  = pageSize;
  } else {
    // 默认使用limit字段
    tableTransferPropsRef.value.params.limit  = pageSize;
  }
  // 如果更改了每页数量，重新设置当前页为1
  currentPage.value = 1;

  getData();
}

// 设置 table props
function setTableProps(props) {
  tableTransferPropsRef.value = props

  tableColumn.value =  new Map(tableTransferPropsRef.value.columns.map(item => [item.name, item]));


  // 设置 table props， 由默认props 和 传入的 props 组成
  tablePropsRef.value = { ...tableDefaultProps.value, ...tableTransferPropsRef.value?.$attrs??{}};
  // 初始化参数 如果没有传入params 则使用searchMethods的参数

  tableTransferPropsRef.value.params =  tableTransferPropsRef.value.params??{};






  if (tableTransferPropsRef.value.editType == 'all' || tableTransferPropsRef.value.editType == 'edit') {
    tableData.value = tableTransferPropsRef.value.tableData || [];
    if (tableData.value?.length == 0) {
      return;
    }

  }


  console.log( tableTransferPropsRef.value.params);
  resetParams.value = deepCopy(tableTransferPropsRef.value.params);


  // 设置分页参数 由默认分页参数 和 传入的分页参数 组成
  paginationConfig.value = { ...tableDefaultPaginationConfig.value, ...tableTransferPropsRef.value?.pagination??{}};

  // 设置初始页和初始每页条数 默认设置page和limit字段
  initPage(deepCopy(resetParams.value));

  // 判断初始化时是否需要请求数据
  if (tableTransferPropsRef.value.immediate !== false) {
    setTimeout(() => {
      getData();
    }, 100);
  }
}

function setPaginationProps(props) {
  paginationConfig.value = { ...paginationConfig.value, ...props};
}

function getTableRef() {
  return aCardTable.value;
}





/**
 *
 * @param current 传入页数，设置当前分页
 *
 */

function setCurrentPagination(current) {
  if (current * pageSize.value > tableTotal.value) {
    return message.info('当前设置页数已超过数据总页数');
  }
  currentPage.value = current;
  getData();
}

/**
 * 获取当前分页
 *
 */
function getCurrentPagination() {
  return currentPage.value;
}

/**
 * 获取数据总数
 *
 */

function getTotalPagination() {
  console.log(tableTotal.value);
  return tableTotal.value;
}


/**
 *
 * @param props 传入table配置，并与当前配置合并，如果重复的参数，传入的配置会覆盖初始化时设置的配置
 */


function mergeTableProps(props) {
  tableTransferPropsRef.value = {...tableTransferPropsRef.value, ...props};
  console.log(tableTransferPropsRef.value, 365);
  return tableTransferPropsRef;
}



/**
 *
 * @param columns 设置table列参数，会完全覆盖初始化时传入的配置
 */

function setTableColumns(columns) {
  tableColumn.value = columns;
  initFun();
}



/**
 *
 * @param params 设置最新的查询参数
 */
function setTableParams(params) {
  tableTransferPropsRef.value.params = deepCopy(params);
  initPage(tableTransferPropsRef.value.params);
}

/**
 * 重置参数，将参数设置为初始化时的参数，并调用getData方法
 *
 */
//
function reset() {
  tableTransferPropsRef.value.params = deepCopy(resetParams.value);
  initPage(deepCopy(resetParams.value));
  getData();
}



// 如果有查看和编辑
function handleFormShow(t = 'insert', row) {
  if ( !tableTransferPropsRef.value.formMethods) {
    message.error('table未关联form页面');
    return;
  }
  tableTransferPropsRef.value.formMethods.handleFormShow(t, row);
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


function setTablePropsValue(key, value){
  tableTransferPropsRef.value[key] = value;

}
function getTablePropsValue(key){
  console.log(tableTransferPropsRef.value)
  return tableTransferPropsRef.value[key];
}

function setTableDataValue(key, value) {
  for (let index = 0; index < tableTransferPropsRef.value.formData.length; index++) {
    if ( tableTransferPropsRef.value.formData[index].name == key) {
      tableTransferPropsRef.value.formData[index] = value;
    }
  }

}

function getTableDataValue(key) {
  return tableTransferPropsRef.value.formData.find(item => item.name == key);
}


const searchEvent = () => {
  const filterVal = String(filterName.value).trim().toLowerCase()
  if (filterVal) {
    const filterRE = new RegExp(filterVal, 'gi')

    const searchProps = Array.from(tableColumn.value.keys());
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
  getSearch,
  getTableData,
  setTableData,
  reset,
  getTableRef,
  setTableColumns,
  setTableParams,
  setTableProps,
  setTablePropsValue,
  getTablePropsValue,
  setTableDataValue,
  getTableDataValue,
  mergeTableProps,
  setCurrentPagination,
  getCurrentPagination,
  getTotalPagination,
}


/**
 * 初始化并调用查询接口
 * params 查询参数， 可不填
 * isMerge 是否将当前传入的参数与原参数进行合并查询
 */


async function getData(params?, isMerge = false) {
  console.log(params, tableTransferPropsRef.value);
  initFun();
  if (tableTransferPropsRef.value.mockData ||  tableTransferPropsRef.value.localData) {
    tableData.value = tableTransferPropsRef.value.mockData??tableTransferPropsRef.value.localData;
    tableTotal.value = tableData.value.length;
    return tableData.value;
  }

  if (tableTransferPropsRef.value.beforeCallback) {
    tableTransferPropsRef.value.beforeCallback(tableTransferPropsRef.value);
  }



  if (tableTransferPropsRef.value.api) {

    // 如果有params，则判断isMerge，如果为true，则合并初始参数与当前参数进行查询，如果为false，则直接使用params参数进行查询。如果没有params，则直接使用初始参数进行查询
    tableData.value = await useGetTable(tableTransferPropsRef.value.api,
        params ?
            isMerge ? {...params, ...tableTransferPropsRef.value.params}
                : params
            : tableTransferPropsRef.value.params
        , tableTotal, tableLoading, tableTransferPropsRef.value.dataCallback) || [];
    return tableData;
  } else {
    message.error('请配置API');
  }
}

/**
 *
 * @param params 设置查询参数，在调用getData方法
 */


async function getSearch(params) {
  if(tableTransferPropsRef.value.searchMethods) {
    const validateRes = await  tableTransferPropsRef.value.searchMethods.validateSearch();

    if(validateRes){
      await getTableRef().setTableParams(params);
      return await getTableRef().getData();
    } else {
      return false;
    }
  }  else {
    await getTableRef().setTableParams(params);
    return await getTableRef().getData();
  }
}

/**
 *
 *
 */

function getTableData() {
  return tableData.value;
}
function setTableData(data) {
  return tableData.value  = data;
}

defineExpose({getTableRef, tableMethods, aCardTable})
console.log(tableMethods);
emits('register', tableMethods);





// 编辑状态下原生事件处理函数
const eventHandlers = (item) => {
  return {
    onFocus: (...e) => {
      if (item.$formAttrs?.onFocus) {
        item.$formAttrs.onFocus(item, tableData, ...e);
      }
    },
    onBlur: (...e) => {

      if (item.$formAttrs?.onBlur) {
        item.$formAttrs.onBlur(item, tableData, ...e);
      }
    },
    onInput: (...e) => {
      if (item.$formAttrs?.onInput) {
        item.$formAttrs.onInput(item, tableData, ...e);
      }
    },
    onChange: (...e) => {
      console.log(e);
      if (item.$formAttrs?.onChange) {
        item.$formAttrs.onChange(item, tableData, ...e);
      }
    },
    onSubmit: (...e) => {
      if (item.$formAttrs?.onSubmit) {
        item.$formAttrs.onSubmit(item, tableData, ...e);
      }

    },
    onReset: (...e) => {
      if (item.$formAttrs?.onReset) {
        item.$formAttrs.onReset(item, tableData, ...e);
      }
    },
    onKeydown: (e: KeyboardEvent) => {
      if (item.$formAttrs?.onKeydown) {
        item.$formAttrs.onKeydown(item, tableData, ...e);
      }
    },
    onKeypress: (e: KeyboardEvent) => {
      if (item.$formAttrs?.onKeypress) {
        item.$formAttrs.onKeypress(item, tableData, ...e);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    },
    onKeyup: (e: KeyboardEvent) => {
      if (item.$formAttrs?.onKeyup) {
        item.$formAttrs.onKeyup(item, tableData, ...e);
      }
    },
    onClick: (e: MouseEvent) => {
      if (item.$formAttrs?.onClick) {
        item.$formAttrs.onClick(item, tableData, ...e);
      }
    },
    onDblclick: (e: MouseEvent) => {
      if (item.$formAttrs?.onDblclick) {
        item.$formAttrs.onDblclick(item, tableData, ...e);
      }
    },
    onMousedown: (e: MouseEvent) => {
      if (item.$formAttrs?.onMousedown) {
        item.$formAttrs.onMousedown(item, tableData, ...e);
      }
    },
    onMouseup: (e: MouseEvent) => {
      if (item.$formAttrs?.onMouseup) {
        item.$formAttrs.onMouseup(item, tableData, ...e);
      }
    },
    onMousemove: (e: MouseEvent) => {
      if (item.$formAttrs?.onMousemove) {
        item.$formAttrs.onMousemove(item, tableData, ...e);
      }
    },
    onMouseover: (e: MouseEvent) => {
      if (item.$formAttrs?.onMouseover) {
        item.$formAttrs.onMouseover(item, tableData, ...e);
      }
    },
    onMouseout: (e: MouseEvent) => {
      if (item.$formAttrs?.onMouseout) {
        item.$formAttrs.onMouseout(item, tableData, ...e);
      }
    },
    onCopy: (e: ClipboardEvent) => {
      if (item.$formAttrs?.onCopy) {
        item.$formAttrs.onCopy(item, tableData, ...e);
      }
    },
    onCut: (e: ClipboardEvent) => {
      if (item.$formAttrs?.onCut) {
        item.$formAttrs.onCut(item, tableData, ...e);
      }
    },
    onPaste: (e: ClipboardEvent) => {
      if (item.$formAttrs?.onPaste) {
        item.$formAttrs.onPaste(item, tableData, ...e);
      }
    },
    onDrag: (e: DragEvent) => {
      if (item.$formAttrs?.onDrag) {
        item.$formAttrs.onDrag(item, tableData, ...e);
      }
    },
    onDragstart: (e: DragEvent) => {
      if (item.$formAttrs?.onDragstart) {
        item.$formAttrs.onDragstart(item, tableData, ...e);
      }
    },
    onDragend: (e: DragEvent) => {
      if (item.$formAttrs?.onDragend) {
        item.$formAttrs.onDragend(item, tableData, ...e);
      }
    },
    onDragenter: (e: DragEvent) => {
      if (item.$formAttrs?.onDragenter) {
        item.$formAttrs.onDragenter(item, tableData, ...e);
      }
    },
    onDragover: (e: DragEvent) => {
      if (item.$formAttrs?.onDragover) {
        item.$formAttrs.onDragover(item, tableData, ...e);
      }
    },
    onDragleave: (e: DragEvent) => {
      if (item.$formAttrs?.onDragleave) {
        item.$formAttrs.onDragleave(item, tableData, ...e);
      }
    },
    onDrop: (e: DragEvent) => {
      if (item.$formAttrs?.onDrop) {
        item.$formAttrs.onDrop(item, tableData, ...e);
      }
    },
    onSearch: (value: string) => {
      if (item.$formAttrs?.onSearch) {
        item.$formAttrs.onSearch(item, tableData, value);
      }
    },
    onPressEnter: (...e) => {
      if (item.$formAttrs?.onPressEnter) {
        item.$formAttrs.onPressEnter(item, tableData, ...e);
      }
    },
    onClear: (...e) => {
      console.log(e);
      if (item.$formAttrs?.onClear) {
        item.$formAttrs.onClear(item, tableData, ...e);
      }
    },
    onSearchClick: (...e) => {
      console.log(e);
      if (item.$formAttrs?.onSearchClick) {
        item.$formAttrs.onSearchClick(item, tableData, ...e);
      }
    },
    onToggleVisible: (...e) => {
      console.log(e);
      if (item.$formAttrs?.onToggleVisible) {
        item.$formAttrs.onToggleVisible(item, tableData, ...e);
      }
    },
    onPrevNumber: (...e) => {
      console.log(e);
      if (item.$formAttrs?.onPrevNumber) {
        item.$formAttrs.onPrevNumber(item, tableData, ...e);
      }
    },
    onNextNumber: (...e) => {
      console.log(e);
      if (item.$formAttrs?.onNextNumber) {
        item.$formAttrs.onNextNumber(item, tableData, ...e);
      }
    },
    onPrefixClick: (...e) => {
      console.log(e);
      if (item.$formAttrs?.onPrefixClick) {
        item.$formAttrs.onPrefixClick(item, tableData, ...e);
      }
    },
    onSuffixClick: (...e) => {
      console.log(e);
      if (item.$formAttrs?.onSuffixClick) {
        item.$formAttrs.onSuffixClick(item, tableData, ...e);
      }
    },
    onDatePrev: (...e) => {
      console.log(e);
      if (item.$formAttrs?.onDatePrev) {
        item.$formAttrs.onDatePrev(item, tableData, ...e);
      }
    },
    onDateToday: (...e) => {
      console.log(e);
      if (item.$formAttrs?.onDateToday) {
        item.$formAttrs.onDateToday(item, tableData, ...e);
      }
    },
    onDateNext: (...e) => {
      console.log(e);
      if (item.$formAttrs?.onDateNext) {
        item.$formAttrs.onDateNext(item, tableData, ...e);
      }
    },
  }
};






</script>
<script lang="ts">
export default {
  name: 'aCrudTable',
};
</script>
<style lang="less">
.vxeTableData {
  .headerCellClassName {
    background-color: #f7f7f7;
    color: black;
    font-size: 14px;
  }
  .cellClassName {
    color: black;
  }

  .vxe-table--render-default .vxe-body--row.row--current, .vxe-table--render-default .vxe-body--row.row--current>.vxe-body--column {
    background: var(--current-row-bg) !important;
  }
  .vxe-cell--wrapper.row--current {
    color: var(--current-row-color) !important;
    span.vxe-checkbox--icon.vxe-table-icon-checkbox-checked-fill {
      background: white;
    }
  }
}
</style>