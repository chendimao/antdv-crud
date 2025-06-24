# 事件处理

Antdv-Crud 组件库提供了丰富的事件系统，用于处理用户交互和数据变化。

## 表单事件 (a-crud-form)

### form-submit

表单提交事件，当用户点击提交按钮或调用提交方法时触发。

```vue
<template>
  <a-crud-form
    :items="formItems"
    :form-state="formData"
    @form-submit="handleFormSubmit"
  />
</template>

<script setup lang="ts">
const handleFormSubmit = (formData: any) => {
  console.log('表单提交数据:', formData)
  // 处理表单提交逻辑
  // 例如：调用 API 保存数据
}
</script>
```

### form-reset

表单重置事件，当用户点击重置按钮或调用重置方法时触发。

```vue
<template>
  <a-crud-form
    :items="formItems"
    :form-state="formData"
    @form-reset="handleFormReset"
  />
</template>

<script setup lang="ts">
const handleFormReset = () => {
  console.log('表单已重置')
  // 处理表单重置逻辑
}
</script>
```

### form-change

表单数据变化事件，当表单项值发生变化时触发。

```vue
<template>
  <a-crud-form
    :items="formItems"
    :form-state="formData"
    @form-change="handleFormChange"
  />
</template>

<script setup lang="ts">
const handleFormChange = (formData: any) => {
  console.log('表单数据变化:', formData)
  // 处理表单数据变化逻辑
  // 例如：实时验证、联动更新等
}
</script>
```

### form-validate

表单验证事件，当表单验证状态发生变化时触发。

```vue
<template>
  <a-crud-form
    :items="formItems"
    :form-state="formData"
    @form-validate="handleFormValidate"
  />
</template>

<script setup lang="ts">
const handleFormValidate = (valid: boolean) => {
  console.log('表单验证结果:', valid)
  // 处理表单验证结果
  // 例如：更新提交按钮状态
}
</script>
```

## 表格事件 (a-crud-table)

### table-change

表格变化事件，当分页、排序、筛选发生变化时触发。

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    @table-change="handleTableChange"
  />
</template>

<script setup lang="ts">
const handleTableChange = (pagination: any, filters: any, sorter: any) => {
  console.log('分页信息:', pagination)
  console.log('筛选条件:', filters)
  console.log('排序信息:', sorter)
  
  // 处理表格变化逻辑
  // 例如：更新查询参数、重新加载数据等
}
</script>
```

### table-selection-change

表格选择变化事件，当行选择状态发生变化时触发。

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    :row-selection="rowSelection"
    @table-selection-change="handleSelectionChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedRowKeys = ref<string[]>([])
const selectedRows = ref<any[]>([])

const rowSelection = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: string[], rows: any[]) => {
    selectedRowKeys.value = keys
    selectedRows.value = rows
  }
}

const handleSelectionChange = (selection: any[]) => {
  console.log('选中行:', selection)
  // 处理选择变化逻辑
  // 例如：更新批量操作按钮状态
}
</script>
```

### table-row-click

表格行点击事件，当用户点击表格行时触发。

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    @table-row-click="handleRowClick"
  />
</template>

<script setup lang="ts">
const handleRowClick = (record: any, index: number) => {
  console.log('点击行数据:', record)
  console.log('行索引:', index)
  // 处理行点击逻辑
  // 例如：跳转到详情页面
}
</script>
```

### table-row-double-click

表格行双击事件，当用户双击表格行时触发。

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    @table-row-double-click="handleRowDoubleClick"
  />
</template>

<script setup lang="ts">
const handleRowDoubleClick = (record: any, index: number) => {
  console.log('双击行数据:', record)
  console.log('行索引:', index)
  // 处理行双击逻辑
  // 例如：快速编辑
}
</script>
```

### table-cell-click

表格单元格点击事件，当用户点击表格单元格时触发。

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    @table-cell-click="handleCellClick"
  />
</template>

<script setup lang="ts">
const handleCellClick = (record: any, column: any, event: Event) => {
  console.log('点击单元格数据:', record)
  console.log('列信息:', column)
  console.log('事件对象:', event)
  // 处理单元格点击逻辑
}
</script>
```

### table-header-click

表格表头点击事件，当用户点击表格表头时触发。

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    @table-header-click="handleHeaderClick"
  />
</template>

<script setup lang="ts">
const handleHeaderClick = (column: any, event: Event) => {
  console.log('点击表头列:', column)
  console.log('事件对象:', event)
  // 处理表头点击逻辑
}
</script>
```

### table-sort-change

表格排序变化事件，当表格排序发生变化时触发。

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    @table-sort-change="handleSortChange"
  />
</template>

<script setup lang="ts">
const handleSortChange = (sorter: any) => {
  console.log('排序信息:', sorter)
  // 处理排序变化逻辑
}
</script>
```

### table-filter-change

表格筛选变化事件，当表格筛选发生变化时触发。

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    @table-filter-change="handleFilterChange"
  />
</template>

<script setup lang="ts">
const handleFilterChange = (filters: any) => {
  console.log('筛选条件:', filters)
  // 处理筛选变化逻辑
}
</script>
```

### table-expand

表格展开事件，当表格行展开/收起时触发。

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    :expandable="expandable"
    @table-expand="handleExpand"
  />
</template>

<script setup lang="ts">
const expandable = {
  expandedRowRender: (record: any) => {
    return h('div', '展开内容')
  }
}

const handleExpand = (expanded: boolean, record: any) => {
  console.log('展开状态:', expanded)
  console.log('行数据:', record)
  // 处理展开逻辑
}
</script>
```

### table-expand-row-change

表格展开行变化事件，当展开的行发生变化时触发。

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    :expandable="expandable"
    @table-expand-row-change="handleExpandRowChange"
  />
</template>

<script setup lang="ts">
const handleExpandRowChange = (expandedRows: any[]) => {
  console.log('展开的行:', expandedRows)
  // 处理展开行变化逻辑
}
</script>
```

## 搜索事件 (a-crud-search)

### search-submit

搜索提交事件，当用户点击搜索按钮时触发。

```vue
<template>
  <a-crud-search
    :items="searchItems"
    :form-state="searchForm"
    @search-submit="handleSearchSubmit"
  />
</template>

<script setup lang="ts">
const handleSearchSubmit = (searchData: any) => {
  console.log('搜索数据:', searchData)
  // 处理搜索逻辑
  // 例如：更新表格查询参数
}
</script>
```

### search-reset

搜索重置事件，当用户点击重置按钮时触发。

```vue
<template>
  <a-crud-search
    :items="searchItems"
    :form-state="searchForm"
    @search-reset="handleSearchReset"
  />
</template>

<script setup lang="ts">
const handleSearchReset = () => {
  console.log('搜索已重置')
  // 处理搜索重置逻辑
  // 例如：清空表格查询参数
}
</script>
```

### search-change

搜索数据变化事件，当搜索表单数据发生变化时触发。

```vue
<template>
  <a-crud-search
    :items="searchItems"
    :form-state="searchForm"
    @search-change="handleSearchChange"
  />
</template>

<script setup lang="ts">
const handleSearchChange = (searchData: any) => {
  console.log('搜索数据变化:', searchData)
  // 处理搜索数据变化逻辑
  // 例如：实时搜索、数据联动等
}
</script>
```

### search-expand

搜索展开/收起事件，当搜索区域展开或收起时触发。

```vue
<template>
  <a-crud-search
    :items="searchItems"
    :form-state="searchForm"
    @search-expand="handleSearchExpand"
  />
</template>

<script setup lang="ts">
const handleSearchExpand = (expanded: boolean) => {
  console.log('搜索区域展开状态:', expanded)
  // 处理搜索展开逻辑
  // 例如：调整页面布局
}
</script>
```

## 字典事件 (a-crud-dict)

### dict-change

字典选择变化事件，当用户选择字典选项时触发。

```vue
<template>
  <a-crud-dict
    :api="getDictData"
    v-model:value="selectedValue"
    @dict-change="handleDictChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedValue = ref('')

const handleDictChange = (value: any, option: any) => {
  console.log('选择的值:', value)
  console.log('选择的选项:', option)
  // 处理字典选择变化逻辑
}
</script>
```

### dict-search

字典搜索事件，当用户在字典组件中搜索时触发。

```vue
<template>
  <a-crud-dict
    :api="getDictData"
    :show-search="true"
    @dict-search="handleDictSearch"
  />
</template>

<script setup lang="ts">
const handleDictSearch = (keyword: string) => {
  console.log('搜索关键词:', keyword)
  // 处理字典搜索逻辑
  // 例如：过滤选项、远程搜索等
}
</script>
```

### dict-clear

字典清除事件，当用户清除字典选择时触发。

```vue
<template>
  <a-crud-dict
    :api="getDictData"
    :allow-clear="true"
    @dict-clear="handleDictClear"
  />
</template>

<script setup lang="ts">
const handleDictClear = () => {
  console.log('字典选择已清除')
  // 处理字典清除逻辑
}
</script>
```

### dict-focus

字典聚焦事件，当字典组件获得焦点时触发。

```vue
<template>
  <a-crud-dict
    :api="getDictData"
    @dict-focus="handleDictFocus"
  />
</template>

<script setup lang="ts">
const handleDictFocus = (event: Event) => {
  console.log('字典组件获得焦点:', event)
  // 处理字典聚焦逻辑
}
</script>
```

### dict-blur

字典失焦事件，当字典组件失去焦点时触发。

```vue
<template>
  <a-crud-dict
    :api="getDictData"
    @dict-blur="handleDictBlur"
  />
</template>

<script setup lang="ts">
const handleDictBlur = (event: Event) => {
  console.log('字典组件失去焦点:', event)
  // 处理字典失焦逻辑
}
</script>
```

## 事件类型定义

```typescript
// 表单事件类型
interface CrudFormEvents {
  'form-submit': (formData: any) => void;
  'form-reset': () => void;
  'form-change': (formData: any) => void;
  'form-validate': (valid: boolean) => void;
}

// 表格事件类型
interface CrudTableEvents {
  'table-change': (pagination: any, filters: any, sorter: any) => void;
  'table-selection-change': (selection: any[]) => void;
  'table-row-click': (record: any, index: number) => void;
  'table-row-double-click': (record: any, index: number) => void;
  'table-cell-click': (record: any, column: any, event: Event) => void;
  'table-header-click': (column: any, event: Event) => void;
  'table-sort-change': (sorter: any) => void;
  'table-filter-change': (filters: any) => void;
  'table-expand': (expanded: boolean, record: any) => void;
  'table-expand-row-change': (expandedRows: any[]) => void;
}

// 搜索事件类型
interface CrudSearchEvents {
  'search-submit': (searchData: any) => void;
  'search-reset': () => void;
  'search-change': (searchData: any) => void;
  'search-expand': (expanded: boolean) => void;
}

// 字典事件类型
interface CrudDictEvents {
  'dict-change': (value: any, option: any) => void;
  'dict-search': (keyword: string) => void;
  'dict-clear': () => void;
  'dict-focus': (event: Event) => void;
  'dict-blur': (event: Event) => void;
}
```

## 事件处理最佳实践

### 1. 事件防抖

对于频繁触发的事件，建议使用防抖处理：

```typescript
import { debounce } from 'antdv-crud'

const handleSearchChange = debounce((searchData: any) => {
  console.log('搜索数据变化:', searchData)
  // 处理搜索逻辑
}, 300)
```

### 2. 事件委托

对于大量相似的事件处理，可以使用事件委托：

```typescript
const handleTableEvent = (eventName: string, ...args: any[]) => {
  switch (eventName) {
    case 'row-click':
      handleRowClick(...args)
      break
    case 'row-double-click':
      handleRowDoubleClick(...args)
      break
    case 'cell-click':
      handleCellClick(...args)
      break
  }
}
```

### 3. 错误处理

在事件处理中添加错误处理：

```typescript
const handleFormSubmit = async (formData: any) => {
  try {
    console.log('表单提交数据:', formData)
    // 处理表单提交逻辑
    await submitForm(formData)
  } catch (error) {
    console.error('表单提交失败:', error)
    // 显示错误提示
  }
}
```

### 4. 事件解绑

在组件卸载时记得解绑事件：

```typescript
import { onUnmounted } from 'vue'

onUnmounted(() => {
  // 清理事件监听器
  // 清理定时器等
})
``` 