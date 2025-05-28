<script>
import { computed } from 'vue';

// 计算属性：将 Map 格式的列配置转换为 vxe-grid 需要的数组格式
const tableColumns = computed(() => {
  let columns = Array.from(tableColumn.value.values()).map(item => {
    const column: any = {
      field: item.name,
      title: item.text,
      width: item.width,
      sortable: tableTransferPropsRef.value?.isSortable !== false && item.sortable !== false,
      ...item.$attrs
    };

    // 处理不同类型的列
    if (item.type === 'seq') {
      column.type = 'seq';
    } else if (item.type === 'checkbox') {
      column.type = 'checkbox';
    } else if (item.type === 'radio') {
      column.type = 'radio';
    } else if (item.type === 'expand') {
      column.type = 'expand';
    } else if (item.type === 'colgroup') {
      column.children = item.children.map(child => ({
        field: child.name,
        title: child.text,
        width: child.width,
        ...child.$attrs
      }));
    }

    // 如果是编辑模式，为每个列添加编辑插槽
    if (tableTransferPropsRef.value?.slotType === 'edit' && item.type !== 'seq' && item.type !== 'checkbox' && item.type !== 'radio' && item.type !== 'expand' && item.type !== 'colgroup') {
      column.slots = { default: 'edit-' + item.name };
    }

    return column;
  });

  // 如果启用了操作列，添加到列配置中
  if (tableTransferPropsRef.value?.isMenu) {
    columns.push({
      title: '操作',
      width: tableTransferPropsRef.value?.menuWidth || 150,
      fixed: 'right',
      slots: { default: 'default' }
    });
  }

  return columns;
});
</script>

<template>
  <div class="pb-2 mr-0 overflow-hidden bg-white basic-table basic-table-form-container aCrudTable vxeTableData">
    <vxe-grid
      ref="aCardTable"
      custom
      print
      export
      v-if="tableTransferPropsRef"
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
      :toolbar-config="toolbarConfig"
      :pager-config="pagerConfig"
      :custom-config="{mode: 'popup'}"
      :print-config="{}"
      :export-config="{}"
      v-bind="tablePropsRef"
      @page-change="handlePageChange"
      @toolbar-button-click="handleToolbarButtonClick"
    >
      <template #toolbar>
        <slot name="buttons" :data="{ tableData, tableRef: aCardTable }"></slot>
      </template>

      <!-- 编辑模式下的列插槽 -->
      <template v-for="item in tableColumn.values()" :key="item.name" #[`edit-${item.name}`]="{ row }">
        <slot :name="`edit-${item.name}`" :row="row" :item="item">
          <component
            :is="item.component"
            v-if="item.component"
            v-model:value="row[item.name]"
            v-bind="item.$formAttrs"
            v-on="eventHandlers(item)"
          />
          <span v-else>{{ row[item.name] }}</span>
        </slot>
      </template>

      <!-- 操作列插槽 -->
      <template #default="{ row }">
        <table-operation-column
          v-if="tableTransferPropsRef.isMenu"
          :row="row"
          :is-menu="tableTransferPropsRef.isMenu"
          :menu="tableTransferPropsRef.menu"
          :menu-width="tableTransferPropsRef.menuWidth"
          :is-view="tableTransferPropsRef.isView"
          :is-edit="tableTransferPropsRef.isEdit"
          :view-icon="tableTransferPropsRef.viewIcon"
          :edit-icon="tableTransferPropsRef.editIcon"
          :view-text="tableTransferPropsRef.viewText"
          :edit-text="tableTransferPropsRef.editText"
          :form-methods="tableTransferPropsRef.formMethods"
          @view="(row) => handleFormShow('show', row)"
          @edit="(row) => handleFormShow('update', row)"
        >
          <template #default="{ row }">
            <slot name="default" :row="row"></slot>
          </template>
        </table-operation-column>
      </template>

      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData"></slot>
      </template>

      <template #pager>
        <div style="text-align: right;padding: 10px 0px;" v-if="tableTransferPropsRef?.pagination?.isPagination !== false">
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
      </template>
    </vxe-grid>
  </div>
</template> 