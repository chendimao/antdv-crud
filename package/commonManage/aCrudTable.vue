<template>
  <div class="p-2 mr-0 overflow-hidden bg-white vben-basic-table vben-basic-table-form-container vxeTableData">
    <vxe-table ref="xTable" v-if="formData" v-bind="tableConfig" max-height="600px" align="center"  :loading="tableLoading"
               :column-config="{ isCurrent: true, isHover: true }" :row-config="{ isCurrent: true, isHover: true }"
               :header-cell-class-name="() => 'headerCellClassName'"
               :cell-class-name="() => 'cellClassName'"
               stripe
               :size="size"
               :loading-config="{ icon: 'vxe-icon-indicator roll', text: '正在拼命加载中...' }"
               class="mytable-style" :data="tableData">

          <template v-for="(item, index) in formData.values()" :key="index" >
            <vxe-column v-if="item.type === 'seq'" :sortable="tableConfig.sortable??true" v-bind="item.$attrs" :type="'seq'" :title="item.text"></vxe-column>
            <vxe-column v-else-if="item.type === 'checkbox'" :sortable="tableConfig.sortable??true" v-bind="item.$attrs" :type="'checkbox'"></vxe-column>
            <vxe-column v-else-if="item.type === 'radio'" :sortable="tableConfig.sortable??true" v-bind="item.$attrs" :type="'radio'"></vxe-column>
            <vxe-column v-else-if="item.type === 'expand'" :sortable="tableConfig.sortable??true" v-bind="item.$attrs" :type="'expand'"></vxe-column>
            <vxe-column  v-else v-bind="item.$attrs" :sortable="tableConfig.sortable??true"  :field="item.name" :title="item.text" :style="item.style" :class="item.class" :width="item.width">
              <template #header>
                <span>{{item.fun ? item.fun(formState) : item.text}}</span>
              </template>
              <template #default="{ row }">
                <span v-if="item.type == 'text'">{{ row[item.name] }}</span>
                <span v-else-if="item.type == 'diy'">{{ item.fun(row) }}</span>
                <span :style="item.fun(row).style" v-else-if="item.type == 'diyStyle'">{{ item.fun(row).text }}</span>
                <span v-else-if="item.type == 'select'">
                    <span v-if="item.option">{{
                        $valueToName(item.option, row[item.name], 'value', 'name')
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


      <vxe-column field="a" title="操作" fixed="right" v-if="isOp"  min-width="200" >
        <template #default="{ row }">

          <slot :row="row"></slot>
        </template>
      </vxe-column>
    </vxe-table>

    <div style="text-align: right;padding: 10px;"   v-if="isPagination">
      <a-pagination
        :hideOnSinglePage="true"
        :showSizeChanger="false"
        v-bind="paginationConfig"
        v-model:current="formState.page"
        @change="getData"
        :total="tableTotal"
        show-less-items
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import {useGetTable} from "../hooks/useTable";
 import {render,h, ref, onMounted, defineProps} from "vue";


 const emits = defineEmits(['update:formState']);

 const props = defineProps({
   formData: {type: Object},
   loading: {type: Boolean},
     isOp: {type: Boolean, default: true}, // 是否有操作列
   size: {type: String, default: 'mini'},
   resetForm: {type: Object},
   api: {type: Function},
   dataCallback: {},
   immediate: {type: Boolean, default: true},
   isPagination: {type: Boolean, default: true},
   tableConfig: {type: Object ,default: () => ({})},
   paginationConfig: {type: Object ,default: () => ({})},
   formState: {type: Object},
 });
 const tableTotal = ref(0);
 const tableLoading = ref(false);
 const tableData = ref([]);
 const xTable = ref();

 onMounted(() => {
   props.immediate && getData();

 })




 const  vRender =  {
   updated: async (el, ctx) => {
     render(await ctx.value, el)
 },
 }



async function getData(ev = 1) {

   if (props.api) {
     emits('update:formState', props.formState);
       tableData.value = await useGetTable(props.api,  props.formState, tableTotal, tableLoading, props.dataCallback) || [];
     console.log('table', tableData.value);
   }
 }


 defineExpose({getData})








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
