<template>
  <vxe-pulldown ref="pulldownRef"  style="width: 100%;"  popup-class-name="dropdown-table" transfer>
    <template #default>
      <a-input v-model:value="searchName"  allow-clear    @focus="focusEvent" v-bind="dictProps"></a-input>
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
              :keyboard-config="{isArrow: true}"
              @cell-dblclick="handleSubmit"
              @cell-click="handleRowClick"
              :sort-config="{trigger: 'cell'}">

            <vxe-column v-for="item in tableField" :type="item?.type??''" :field="item.field" :title="item.title" :width="item.width"     ></vxe-column>


          </vxe-table>
        <div style="text-align: right;padding: 10px;"  v-if="showPage"  >
          <a-pagination
              size="small"   :show-size-changer="false" show-quick-jumper

              v-model:current="currentPage"
              :total="tableTotal"
              :defaultPageSize="pageSize"
              v-model:pageSize="pageSize"
              @change="pageChangeEvent"
          />
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
   pageField: {type: String, default: 'page'},
   sizeField: {type: String, default: 'limit'},
  name: {type: String, default: 'dmmc'},
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


const currentPage = ref(1);
const tableTotal = ref(100);
const pageSize = ref(10);
const paginationConfig = ref();
const currentData = ref();

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
      getData();
  }
}
watch( searchName, (data) => {
  console.log(data);
  emits('update:modelValue', data);
  // 如果面板显示，则说明为输入状态
  if (pulldownRef.value.isPanelVisible()) {
    currentPage.value = 1;
    getData();
  } else {
    // 否则就是双击选择状态
    emits('change', data, currentData.value);

  }

})

function getData() {
  loading.value = true;
  props.api({...props.params,
    [props.pageField]: currentPage.value,
    [props.sizeField]: pageSize.value,
    [props.name]: searchName.value }).then(res => {

    loading.value = false;

    if (props.callbackFun) {
      props.callbackFun(res, tableData, tableTotal);
    } else {
      if (res.code == 0) {
        tableData.value = res.data.content || res.data;
        tableTotal.value = res.data.total || res.data?.length;
      } else {
        tableData.value =  [];
        tableTotal.value = 0;
      }
    }


  });
}

const pageChangeEvent = (ev) => {
  console.log(ev);
  currentPage.value = ev;
  getData();
}

function handleSubmit(ev) {
  pulldownRef.value.togglePanel();
  searchName.value = ev.row[props.name];
  currentData.value = ev;

}
function handleRowClick() {

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
    height: 350px;
  }

  .dropdown-table-footer {
    border-top: 1px solid #e8eaec;
  }

  .dropdown-table-body {
    width: auto !important;
  }
}

</style>