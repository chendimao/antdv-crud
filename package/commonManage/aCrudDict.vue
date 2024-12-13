<template>
  <vxe-pulldown ref="pulldownRef"  style="width: 100%;"  popup-class-name="dropdown-table" transfer>
    <template #default>
      <a-input v-model:value="searchName"
               autocomplete="off"
               @keydown.down="handleKeydownDownSelect"
               @keydown.up="handleKeydownUpSelect"
               @keydown.enter="handleKeydownEnterSelect"
               allow-clear
               @focus="focusEvent"
               v-bind="dictProps"
      ></a-input>
    </template>

    <template #dropdown>
      <div class="dropdown-table-body">
          <vxe-table
              border
              show-overflow
              :header-cell-class-name="() => 'headerCellClassName'"
              :cell-class-name="() => 'cellClassName unitClassName'"
              highlight-hover-row
              highlight-current-row
              resizable
              size="mini"
              ref="xTable1"
              height="300"
              :column-config="{resizable: true}"
              :scroll-y="{enabled: true, gt: 0}"
              :data="tableData"
              :row-config="{isCurrent: true}"
              :edit-config="{}"
              :keyboard-config="{isArrow: true}"
              @cell-dblclick="handleSubmit"
              :sort-config="{trigger: 'cell'}">

            <vxe-column v-for="item in tableField" :type="item?.type??''" :field="item.field" :title="item.title" :width="item.width"     ></vxe-column>


          </vxe-table>
        <div style="text-align: right;padding: 10px;border-bottom: 1px solid #eee;"  v-if="showPage"  >
          <a-pagination
              size="small"   :show-size-changer="false"
              show-less-items
              :showTotal="total => `共${total}条`"
              v-model:current="currentPage"
              :total="tableTotal"
              :defaultPageSize="pageSize"
              v-model:pageSize="pageSize"
              @change="pageChangeEvent"
          />
        </div>
        <div style="padding: 10px;font-size: 12px;"  v-if="showHistory && historyData.length > 0"  >
            <span>查询历史：</span>
            <span style="cursor: pointer; width: 100px;">
              <span style="color: dodgerblue; " v-for="(item, index) in historyData" @click="handleHistoryData(item)" >
                {{item}}
                <span v-if="index != historyData.length -1">&nbsp;|&nbsp;</span>
              </span>
            </span>
        </div>
      </div>
    </template>
  </vxe-pulldown>

</template>

<script setup lang="ts">
import {ref, onMounted, reactive, watch} from 'vue'
import {debounceRef} from "../utils";

const props = defineProps({
  dictProps: {type: Object},
  modelValue: {type: String, default: ''},
  api: {required: true, type: Function},
  params: {required: true, type: Object},
  showPage: {type: Boolean, default: true},
  showHistory: {type: Boolean, default: true},
   pageField: {type: String, default: 'page'},
   sizeField: {type: String, default: 'limit'},
  name: {type: String, default: 'dmmc'},
  searchField: {type: String, default: 'dmmc'},

  callbackFun: {},
  tableField: {type: Array, default: () => [{field: 'dmmc', title: '名称', width: 100}, {field: 'dm', title: '代码', width: 100}, {field: 'icd10', title: 'icd10', width: 120}]},
});

const emits = defineEmits(['change', 'update:modelValue']);


onMounted(()=>{
  currentPage.value = props.params[props.pageField];
  pageSize.value = props.params[props.sizeField];
  searchName.value = props.modelValue;
})



const searchName = ref('');
const loading = ref(false)

const currentIndex = ref(0);
const currentRow = ref();
const xTable1 = ref();

const currentPage = ref(1);
const tableTotal = ref(100);
const pageSize = ref(10);
const paginationConfig = ref();
const currentData = ref();
const historyData = ref([]);
const tableData = ref([])
const pagerConfig = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10
})
const pulldownRef = ref()
const focusEvent = () => {
  const $pulldown = pulldownRef.value
  if ($pulldown) {
    $pulldown.showPanel();
    if (tableData.value.length === 0) {
      getData();
    }
  }
}
watch(() => props.modelValue, (data) => {
  searchName.value = data;
})
watch( searchName, (data) => {
  emits('update:modelValue', data);
  // 如果面板显示，则说明为输入状态
  if (pulldownRef.value.isPanelVisible()) {
    currentPage.value = 1;
    getData();
  } else {
    // 否则就是双击选择状态


  }

})

function getData() {
  loading.value = true;
  props.api({...props.params,
    [props.pageField]: currentPage.value,
    [props.sizeField]: pageSize.value,
    [props.searchField??props.name]: searchName.value }).then(res => {

    loading.value = false;

    if (props.callbackFun) {
      props.callbackFun(res, tableData, tableTotal);
    } else {
      if (res.code == 0) {
        tableData.value = res.data.content || res.data;
        tableTotal.value = res.data.total || res.data?.length;

        if(tableData.value.length > 0) {
          currentRow.value = tableData.value[0];
          currentIndex.value = 0;
          xTable1.value.setCurrentRow(currentRow.value);
        }

      } else {
        tableData.value =  [];
        tableTotal.value = 0;
      }
    }


  });
}

const pageChangeEvent = (ev) => {
  currentPage.value = ev;
  getData();
}

function handleSubmit(ev) {
  pulldownRef.value.togglePanel();
  searchName.value = ev.row[props.name];
  currentData.value = ev;
  if (!historyData.value.includes(searchName.value)) {
    historyData.value.push(searchName.value);
    historyData.value = historyData.value.splice(-3);
  }
  emits('change',  searchName.value, currentData.value);

}

function handleHistoryData(item) {
  searchName.value = item;
}

function handleKeydownDownSelect(ev) {
  if (currentIndex.value + 1 < tableData.value.length) {
    currentIndex.value++;
    xTable1.value.setCurrentRow(tableData.value[currentIndex.value]);
    xTable1.value.scrollToRow(tableData.value[currentIndex.value]);
  }
}
function handleKeydownUpSelect(ev) {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    xTable1.value.setCurrentRow(tableData.value[currentIndex.value]);
    xTable1.value.scrollToRow(tableData.value[currentIndex.value]);
  }
}
function handleKeydownEnterSelect(ev) {
  handleSubmit({row: xTable1.value.getCurrentRecord(), visibleData: tableData.value, rowIndex: currentIndex.value, $rowIndex: currentIndex.value})

}


</script>
<script lang="ts">
export default {
  name: 'aCrudDict',
};
</script>
<style   lang="less">
::v-deep(.vxe-pulldown) {

width: 100%;

}
.dropdown-table {

  background-color: #fff;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
  .dropdown-table-body {
    width: 600px;
  }

  .dropdown-table-footer {
    border-top: 1px solid #e8eaec;
  }

  .dropdown-table-body {
    width: auto !important;
  }
}

</style>