<template>
  <template v-for="(item, index) in columns.values()" :key="index">
    <template v-if="item.type === 'colgroup'"> 
      <vxe-colgroup :title="item.text" v-bind="item.$attrs">
        <table-column
          :columns="new Map(item.children.map(child => [child.name, child]))"
          :table-data="tableData"
          :table-methods="tableMethods"
          :table-ref="tableRef"
          :is-sortable="isSortable"
          :size="size"
          :edit-type="editType"
        >
          <template v-for="(_, name) in $slots" #[name]="slotData">
            <slot :name="name" v-bind="slotData"></slot>
          </template>
        </table-column>
      </vxe-colgroup>
    </template>
    <vxe-column v-else-if="item.type === 'seq'" v-bind="item.$attrs" :type="'seq'"></vxe-column>
    <vxe-column v-else-if="item.type === 'checkbox'" v-bind="item.$attrs" :type="'checkbox'"></vxe-column>
    <vxe-column v-else-if="item.type === 'radio'" v-bind="item.$attrs" :type="'radio'"></vxe-column>
    <vxe-column v-else-if="item.type === 'expand'" v-bind="item.$attrs" :type="'expand'"></vxe-column>
    <vxe-column v-else :sortable="isSortable !== false && item.sortable !== false" :field="item.name" :title="item.text" :width="item.width" v-bind="item.$attrs">
      <template #header="headerData">
        <div v-render="() => item.headerH(columns, headerData)" v-if="item.headerH"></div>
        <span v-else>{{item.fun ? item.fun(columns, tableData) : item.text}}</span>
      </template>

      <template v-if="editType == 'default' || editType == 'edit'" #default="{ row, $rowIndex }">
        <span v-if="item.type === 'colgroup'">
          <vxe-column v-for="(colItem, colIndex) in item.children" :key="colIndex" v-bind="colItem.$attrs" :type="colItem.type" :field="colItem.name" :title="colItem.text" :width="colItem.width" ></vxe-column>
        </span>
        <span v-else-if="[ 'text', 'search', 'number', 'textarea', 'integer', 'float', 'password', 'date', 'time', 'datetime', 'week', 'month', 'quarter', 'year'].includes(item.type)">{{ row[item.name] }}</span>
        
        <span v-else-if="item.type == 'select'">
          <span v-if="item.option">{{ valueToName(item.option, row[item.name], 'value', 'label') }}</span>
          <span v-else>{{ row[item.name] }}</span>
        </span>
        <span v-else-if="item.type == 'formCheckbox'">
          <span v-if="item.option">{{ valueToName(item.option, row[item.name], 'value', 'label').join(item?.split??',') }}</span>
          <span v-else>{{ row[item.name] }}</span>
        </span>
        <span v-else-if="item.type == 'formRadio'">
          <span v-if="item.option">{{ valueToName(item.option, row[item.name], 'value', 'label') }}</span>
          <span v-else>{{ row[item.name] }}</span>
        </span>
        <span v-else-if="item.type == 'switch'">
          <span>{{ row[item.name] === item.openValue ? item.openLabel : row[item.name] === item.closeValue ? item.closeLabel: '' }}</span>
        </span>
        <span v-else-if="item.type == 'h'">
          <div v-render="() => renderHFunction(row, item, tableMethods)"></div>
        </span>
        <span v-else-if="item.type == 'slot'">
          <slot :name="item.name" :row="row" :data="{row, rowIndex: $rowIndex, tableData, tableRef}"></slot>
        </span>
        <span v-else-if="item.type == 'rate'">{{row[item.name]}}</span>
        <span v-else-if="item.type == 'slider'">{{row[item.name]}}</span>
        <span v-else-if="item.type == 'textarea'">{{row[item.textarea]}}</span>
        <span v-else-if="item.type == 'upload'">
          <vxe-upload
            show-download-button
            readonly
            v-model="row[item.name]"
            :download-method="item.$formAttrs.downloadMethod">
          </vxe-upload>
        </span>
      </template>
    
      <template v-if="editType == 'all'"  #default="{row, $rowIndex}">
        <vxe-input
          v-if="['text', 'search', 'number', 'textarea', 'integer', 'float', 'password', 'date', 'time', 'datetime', 'week', 'month', 'quarter', 'year'].includes(item.type)"
          v-model="row[item.name]" 
          :type="item.type" 
          :size="size" 
          v-bind="{...item.$formAttrs, ...eventHandlers(item)}">
        </vxe-input>

        <vxe-select
          v-else-if="item.type == 'select'"
          v-model="row[item.name]" 
          transfer 
          :size="size" 
          v-bind="item.$formAttrs">
          <vxe-option 
            v-for="oItem in item?.$attrs?.options??item?.option" 
            :key="oItem.value" 
            :value="oItem.value" 
            :label="oItem.label">
          </vxe-option>
        </vxe-select>

        <vxe-checkbox-group
          v-else-if="item.type == 'formCheckbox'"
          v-model="row[item.name]" 
          v-bind="item.$formAttrs">
          <vxe-checkbox 
            v-for="oItem in item?.$attrs?.options??item?.option" 
            :key="oItem.value" 
            :label="oItem.value" 
            :content="oItem.label">
          </vxe-checkbox>
        </vxe-checkbox-group>

        <vxe-radio-group
          v-else-if="item.type == 'formRadio'"
          v-model="row[item.name]" 
          v-bind="item.$formAttrs">
          <vxe-radio 
            v-for="oItem in item?.$attrs?.options??item?.option" 
            :key="oItem.value" 
            :label="oItem.value" 
            :content="oItem.label">
          </vxe-radio>
        </vxe-radio-group>

        <vxe-switch
          v-else-if="item.type == 'switch'"
          v-model="row[item.name]"
          :open-label="item?.openLabel??'开启'"
          :close-label="item?.closeLabel??'关闭'"
          :open-value="item?.openValue??1"
          :close-value="item?.closeValue??0"
          v-bind="item.$formAttrs">
        </vxe-switch>

        <vxe-rate v-else-if="item.type == 'rate'" v-model="row[item.name]" v-bind="item.$formAttrs"></vxe-rate>
        <vxe-slider v-else-if="item.type == 'slider'" v-model="row[item.name]" v-bind="item.$formAttrs"></vxe-slider>
        <vxe-textarea v-else-if="item.type == 'textarea'" v-model="row[item.name]" v-bind="item.$formAttrs"></vxe-textarea>
        <vxe-upload v-else-if="item.type == 'upload'" v-model="row[item.name]" v-bind="item.$formAttrs"></vxe-upload>

        <span v-else-if="item.type == 'slot'">
          <slot :name="item.name" :row="row" :data="{row, rowIndex: $rowIndex, tableData, tableRef}"></slot>
        </span>
      </template>
      <template v-if="editType == 'all' || editType == 'edit'   "  #edit="{row, $rowIndex}">
        <vxe-input
          v-if="['text', 'search', 'number', 'textarea', 'integer', 'float', 'password', 'date', 'time', 'datetime', 'week', 'month', 'quarter', 'year'].includes(item.type)"
          v-model="row[item.name]" 
          :type="item.type" 
          :size="size" 
          v-bind="{...item.$formAttrs, ...eventHandlers(item)}">
        </vxe-input>

        <vxe-select
          v-else-if="item.type == 'select'"
          v-model="row[item.name]" 
          transfer 
          :size="size" 
          v-bind="item.$formAttrs">
          <vxe-option 
            v-for="oItem in item?.$attrs?.options??item?.option" 
            :key="oItem.value" 
            :value="oItem.value" 
            :label="oItem.label">
          </vxe-option>
        </vxe-select>

        <vxe-checkbox-group
          v-else-if="item.type == 'formCheckbox'"
          v-model="row[item.name]" 
          v-bind="item.$formAttrs">
          <vxe-checkbox 
            v-for="oItem in item?.$attrs?.options??item?.option" 
            :key="oItem.value" 
            :label="oItem.value" 
            :content="oItem.label">
          </vxe-checkbox>
        </vxe-checkbox-group>

        <vxe-radio-group
          v-else-if="item.type == 'formRadio'"
          v-model="row[item.name]" 
          v-bind="item.$formAttrs">
          <vxe-radio 
            v-for="oItem in item?.$attrs?.options??item?.option" 
            :key="oItem.value" 
            :label="oItem.value" 
            :content="oItem.label">
          </vxe-radio>
        </vxe-radio-group>

        <vxe-switch
          v-else-if="item.type == 'switch'"
          v-model="row[item.name]"
          :open-label="item?.openLabel??'开启'"
          :close-label="item?.closeLabel??'关闭'"
          :open-value="item?.openValue??1"
          :close-value="item?.closeValue??0"
          v-bind="item.$formAttrs">
        </vxe-switch>

        <vxe-rate v-else-if="item.type == 'rate'" v-model="row[item.name]" v-bind="item.$formAttrs"></vxe-rate>
        <vxe-slider v-else-if="item.type == 'slider'" v-model="row[item.name]" v-bind="item.$formAttrs"></vxe-slider>
        <vxe-textarea v-else-if="item.type == 'textarea'" v-model="row[item.name]" v-bind="item.$formAttrs"></vxe-textarea>
        <vxe-upload v-else-if="item.type == 'upload'" v-model="row[item.name]" v-bind="item.$formAttrs"></vxe-upload>

        <span v-else-if="item.type == 'slot'">
          <slot :name="item.name" :row="row" :data="{row, rowIndex: $rowIndex, tableData, tableRef}"></slot>
        </span>
      </template>
    
    </vxe-column>
  </template>
</template>

<script setup lang="ts">
import { computed, watchEffect, nextTick } from 'vue';
import { valueToName } from '../../utils';

interface Props {
  columns: Map<string, any>;
  tableData: any[];
  tableMethods: any;
  tableRef: any;
  isSortable?: boolean;
  size?: string;
  editType?: string; 
}

const props = withDefaults(defineProps<Props>(), {
  isSortable: true,
  size: 'mini',
  editType: 'default', 
});

// 为每个行创建一个响应式的渲染函数
const renderHFunction = (row: any, item: any, tableMethods: any) => {
  // 使用 computed 来追踪 row 的变化
  const rowData = computed(() => row);
  
  // 当 row 数据变化时，重新执行 h 函数
  watchEffect(() => {
    // 强制更新组件
    nextTick(() => {
      if (item.h && typeof item.h === 'function') {
        item.h(rowData.value, item, tableMethods, null);
      }
    });
  });
  
  // 初始执行
  if (item.h && typeof item.h === 'function') {
    return item.h(row, item, tableMethods, null);
  }
  return null;
};

// 事件处理函数
const eventHandlers = (item: any) => {
  return {
    onFocus: (...e: any[]) => {
      if (item.$formAttrs?.onFocus) {
        item.$formAttrs.onFocus(item, props.tableData, ...e);
      }
    },
    onBlur: (...e: any[]) => {
      if (item.$formAttrs?.onBlur) {
        item.$formAttrs.onBlur(item, props.tableData, ...e);
      }
    },
    onInput: (...e: any[]) => {
      if (item.$formAttrs?.onInput) {
        item.$formAttrs.onInput(item, props.tableData, ...e);
      }
    },
    onChange: (...e: any[]) => {
      if (item.$formAttrs?.onChange) {
        item.$formAttrs.onChange(item, props.tableData, ...e);
      }
    },
    // ... 其他事件处理函数
  };
};
</script> 