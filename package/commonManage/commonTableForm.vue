<template>
  <div class="p-2 mr-0 overflow-hidden bg-white vben-basic-table vben-basic-table-form-container vxeTableData">
    <vxe-table ref="xTable" v-if="formData" max-height="600px" align="center"  :loading="loading"
               :column-config="{ isCurrent: true, isHover: true }" :row-config="{ isCurrent: true, isHover: true }"
               :header-cell-class-name="() => 'headerCellClassName'"
               :cell-class-name="() => 'cellClassName'"
               stripe
               :size="size"
               :loading-config="{ icon: 'vxe-icon-indicator roll', text: '正在拼命加载中...' }"
               class="mytable-style" :data="tableData">
      <vxe-column v-for="(item, index) in formData" :key="index" sortable :fixed="index < 3 ? 'left':  null" :field="item.name" :title="item.text" :style="item.style" :class="item.class" :width="item.width">
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
              <div v-render="item.h(row, this)">
              </div>
          </span>
        </template>
      </vxe-column>

      <vxe-column field="a" title="操作" fixed="right" v-if="isOp"  :min-width="'200px'" >
        <template #default="{ row }">

          <slot :row="row"></slot>
        </template>
      </vxe-column>
    </vxe-table>

    <div class="text-right p-2">
      <a-pagination
        :hideOnSinglePage="true"
        :showSizeChanger="false"
        v-model:current="formState.page"
        @change="getData"
        :total="total"
        show-less-items
      />
    </div>

  </div>
</template>

<script setup lang="ts">
 import {useTableGetData} from "/@/hooks/crud";
 import {render,h, ref, onMounted} from "vue";
 const props = defineProps({
   formData: {type: Object},
   loading: {type: Boolean},
     isOp: {type: Boolean, default: true}, // 是否有操作列
   size: {type: String, default: 'mini'},
   resetForm: {type: Object},
   api: {type: Function},
   formState: {type: Object},
 });

 const total = ref(0);
 const loading = ref(false);
 const tableData = ref([]);
 const xTable = ref();

 onMounted(() => {
     console.log(props.formData);
     getData();

 })




 const  vRender =  {
   updated: async (el, ctx) => {
     render(await ctx.value, el)
 },
 }



function getData(ev = 1) {
   if (props.api) {
     setTimeout(async () => {
       tableData.value = await useTableGetData(props.api, {...props.formState, page: ev}, loading, total);
     }, 0);
   }
 }
 defineExpose({getData})








</script>
<script lang="ts">
export default {
  name: 'commonTableForm',
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
