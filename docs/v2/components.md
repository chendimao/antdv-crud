# 核心组件

Antdv-Crud 提供了四个核心组件，用于构建完整的 CRUD 功能。

## a-crud-form - 动态表单组件

动态表单组件，支持多种输入类型和灵活的配置。

### 基础用法

```vue
<template>
  <a-crud-form
    :items="formItems"
    :form-state="formData"
    :is-disabled="false"
    @form-submit="handleSubmit"
    @form-reset="handleReset"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { inputFormModel } from 'antdv-crud'

const formData = ref({})

const formItems: inputFormModel[] = [
  {
    type: 'text',
    name: 'name',
    text: '姓名',
    span: 12,
    rules: [{ required: true, message: '请输入姓名' }]
  },
  {
    type: 'number',
    name: 'age',
    text: '年龄',
    span: 12,
    rules: [{ required: true, message: '请输入年龄' }]
  }
]

const handleSubmit = (data: any) => {
  console.log('表单提交:', data)
}

const handleReset = () => {
  console.log('表单重置')
}
</script>
```

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| items | inputFormModel[] | [] | 表单项配置数组 |
| formState | object | {} | 表单数据对象 |
| formData | object | {} | 表单配置数据 |
| isDisabled | boolean | false | 是否禁用整个表单 |
| labelWidth | string \| number | - | 标签宽度 |
| labelPosition | 'left' \| 'right' \| 'top' | 'left' | 标签位置 |
| size | 'large' \| 'default' \| 'small' | 'default' | 组件尺寸 |
| showMessage | boolean | true | 是否显示验证消息 |
| inlineMessage | boolean | false | 是否内联显示验证消息 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| form-submit | formData | 表单提交事件 |
| form-reset | - | 表单重置事件 |
| form-change | formData | 表单数据变化事件 |
| form-validate | valid | 表单验证事件 |

### Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| validate | callback? | Promise<boolean> | 验证表单 |
| validateField | props?, callback? | Promise<boolean> | 验证指定字段 |
| resetFields | props? | void | 重置表单字段 |
| clearValidate | props? | void | 清除验证信息 |
| getFieldsValue | nameList? | object | 获取表单值 |
| setFieldsValue | values | void | 设置表单值 |

## a-crud-table - 数据表格组件

数据表格组件，支持分页、排序、筛选等功能。

### 基础用法

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    :params="tableParams"
    :is-tool-box="true"
    :edit-type="'edit'"
    @table-change="handleTableChange"
    @table-selection-change="handleSelectionChange"
  >
    <template #action="{ record }">
      <a-button type="link" @click="handleEdit(record)">编辑</a-button>
      <a-button type="link" @click="handleDelete(record)">删除</a-button>
    </template>
  </a-crud-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableParams = ref({})

const getTableData = async (params: any) => {
  // 模拟 API 调用
  return {
    data: [
      { id: 1, name: '张三', age: 25, status: '启用' },
      { id: 2, name: '李四', age: 30, status: '禁用' }
    ],
    total: 2
  }
}

const tableColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: 120
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    width: 80
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100
  },
  {
    title: '操作',
    key: 'action',
    width: 200,
    slots: {
      customRender: 'action'
    }
  }
]

const handleTableChange = (pagination: any, filters: any, sorter: any) => {
  console.log('表格变化:', { pagination, filters, sorter })
}

const handleSelectionChange = (selection: any[]) => {
  console.log('选择变化:', selection)
}

const handleEdit = (record: any) => {
  console.log('编辑:', record)
}

const handleDelete = (record: any) => {
  console.log('删除:', record)
}
</script>
```

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| api | Function | - | 数据获取函数 |
| columns | object[] | [] | 表格列配置 |
| dataSource | object[] | [] | 静态数据源 |
| params | object | {} | 请求参数 |
| pagination | object | { pageSize: 10 } | 分页配置 |
| loading | boolean | false | 加载状态 |
| rowKey | string \| Function | 'id' | 行键值 |
| rowSelection | object | - | 行选择配置 |
| scroll | object | - | 滚动配置 |
| bordered | boolean | false | 是否显示边框 |
| size | 'large' \| 'middle' \| 'small' | 'default' | 表格尺寸 |
| isToolBox | boolean | false | 是否显示工具栏 |
| toolBox | object | - | 工具栏配置 |
| editType | 'edit' \| 'view' \| 'none' | 'none' | 编辑类型 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| table-change | pagination, filters, sorter | 表格变化事件 |
| table-selection-change | selection | 选择变化事件 |
| table-row-click | record, index | 行点击事件 |
| table-row-double-click | record, index | 行双击事件 |
| table-cell-click | record, column, event | 单元格点击事件 |
| table-header-click | column, event | 表头点击事件 |

### Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| refresh | - | void | 刷新表格数据 |
| reload | - | void | 重新加载数据 |
| getTableData | - | object[] | 获取表格数据 |
| setTableData | data | void | 设置表格数据 |
| getSelection | - | object[] | 获取选中行 |
| clearSelection | - | void | 清除选择 |
| toggleRowSelection | row, selected? | void | 切换行选择 |
| toggleAllSelection | - | void | 切换全选 |
| exportData | type? | void | 导出数据 |
| print | - | void | 打印表格 |

## a-crud-search - 搜索组件

搜索组件，支持多种搜索条件和展开/收起功能。

### 基础用法

```vue
<template>
  <a-crud-search
    :items="searchItems"
    :form-state="searchForm"
    :config="searchConfig"
    @search-submit="handleSearch"
    @search-reset="handleReset"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { inputFormModel } from 'antdv-crud'

const searchForm = ref({})

const searchConfig = {
  expand: false,
  collapsed: 3,
  labelWidth: 80
}

const searchItems: inputFormModel[] = [
  {
    type: 'text',
    name: 'keyword',
    text: '关键词',
    span: 6,
    placeholder: '请输入关键词'
  },
  {
    type: 'select',
    name: 'status',
    text: '状态',
    span: 6,
    option: [
      { value: '1', name: '启用' },
      { value: '0', name: '禁用' }
    ]
  },
  {
    type: 'date',
    name: 'startDate',
    text: '开始日期',
    span: 6
  },
  {
    type: 'date',
    name: 'endDate',
    text: '结束日期',
    span: 6
  }
]

const handleSearch = (data: any) => {
  console.log('搜索数据:', data)
}

const handleReset = () => {
  console.log('重置搜索')
}
</script>
```

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| items | inputFormModel[] | [] | 搜索项配置 |
| formState | object | {} | 搜索表单数据 |
| formData | object | {} | 搜索配置数据 |
| config | object | {} | 搜索组件配置 |
| isDisabled | boolean | false | 是否禁用 |
 
### Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| search | - | void | 执行搜索 |
| reset | - | void | 重置搜索 |
| getSearchForm | - | object | 获取搜索表单 |
| setSearchForm | values | void | 设置搜索表单 | 

## a-crud-dict - 字典组件

字典组件，支持远程数据加载和多种选择模式。

### 基础用法
```
```vue
<template>
  <a-crud-dict
    :api="getDictData"
    :params="{ type: 'user_status' }"
    :value-field="'value'"
    :label-field="'name'"
    :multiple="false"
    :show-search="true"
    v-model:value="selectedValue"
    @dict-change="handleDictChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedValue = ref('')

const getDictData = async (params: any) => {
  // 模拟字典数据
  return [
    { value: '1', name: '启用' },
    { value: '0', name: '禁用' }
  ]
}

const handleDictChange = (value: any, option: any) => {
  console.log('字典选择:', value, option)
}
</script>
```

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| api | Function | - | 数据获取函数 |
| params | object | {} | 请求参数 |
| valueField | string | 'value' | 值字段名 |
| labelField | string | 'name' | 标签字段名 |
| childrenField | string | 'children' | 子字段名 |
| multiple | boolean | false | 是否多选 |
| isDisabled | boolean | false | 是否禁用 |
| sizeField | string | - | 尺寸字段 |
| tableField | string | - | 表格字段 |
| selectField | string | - | 选择字段 |
| callbackFun | Function | - | 回调函数 |
| pageField | string | - | 分页字段 |
| immediate | boolean | true | 是否立即加载 |
| name | string | - | 组件名称 |
| transfer | object | - | 传输配置 |
| debounceTime | number | - | 防抖时间 |
| showPage | boolean | false | 是否显示分页 |
| searchField | string | - | 搜索字段 |
| attrs | object | - | 原生属性 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| dict-change | value, option | 字典选择变化事件 |
| dict-search | keyword | 字典搜索事件 |
| dict-clear | - | 字典清除事件 |
| dict-focus | event | 字典聚焦事件 |
| dict-blur | event | 字典失焦事件 |

### Methods

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| refresh | - | void | 刷新字典数据 |
| getValue | - | any | 获取当前值 |
| setValue | value | void | 设置当前值 |
| getOptions | - | object[] | 获取选项数据 |
| setOptions | options | void | 设置选项数据 |
| search | keyword | void | 搜索选项 |
| clear | - | void | 清除选择 |

## 组件组合使用

### 完整的 CRUD 页面

```vue
<template>
  <div class="crud-page">
    <!-- 搜索区域 -->
    <a-crud-search
      :items="searchItems"
      :form-state="searchForm"
      @search-submit="handleSearch"
    />
    
    <!-- 表格区域 -->
    <a-crud-table
      ref="tableRef"
      :api="getTableData"
      :columns="tableColumns"
      :params="tableParams"
      :is-tool-box="true"
      @table-change="handleTableChange"
    >
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">新增</a-button>
      </template>
      
      <template #action="{ record }">
        <a-button type="link" @click="handleEdit(record)">编辑</a-button>
        <a-button type="link" @click="handleDelete(record)">删除</a-button>
      </template>
    </a-crud-table>
    
    <!-- 表单弹窗 -->
    <a-modal
      v-model:visible="formVisible"
      :title="formTitle"
      width="800px"
      @ok="handleFormSubmit"
    >
      <a-crud-form
        ref="formRef"
        :items="formItems"
        :form-state="formData"
        @form-submit="handleFormSubmit"
      />
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { inputFormModel } from 'antdv-crud'

// 搜索相关
const searchForm = ref({})
const searchItems: inputFormModel[] = [
  {
    type: 'text',
    name: 'keyword',
    text: '关键词',
    span: 6
  }
]

// 表格相关
const tableRef = ref()
const tableParams = ref({})
const tableColumns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '操作', key: 'action', slots: { customRender: 'action' } }
]

// 表单相关
const formRef = ref()
const formVisible = ref(false)
const formTitle = ref('新增')
const formData = ref({})
const formItems: inputFormModel[] = [
  {
    type: 'text',
    name: 'name',
    text: '姓名',
    rules: [{ required: true, message: '请输入姓名' }]
  },
  {
    type: 'number',
    name: 'age',
    text: '年龄',
    rules: [{ required: true, message: '请输入年龄' }]
  }
]

// 事件处理
const handleSearch = (data: any) => {
  tableParams.value = data
  tableRef.value?.refresh()
}

const handleTableChange = (pagination: any, filters: any, sorter: any) => {
  console.log('表格变化:', { pagination, filters, sorter })
}

const handleAdd = () => {
  formTitle.value = '新增'
  formData.value = {}
  formVisible.value = true
}

const handleEdit = (record: any) => {
  formTitle.value = '编辑'
  formData.value = { ...record }
  formVisible.value = true
}

const handleDelete = (record: any) => {
  // 删除逻辑
}

const handleFormSubmit = async (data: any) => {
  // 提交逻辑
  formVisible.value = false
  tableRef.value?.refresh()
}

// API 函数
const getTableData = async (params: any) => {
  // 模拟 API 调用
  return {
    data: [
      { id: 1, name: '张三', age: 25 },
      { id: 2, name: '李四', age: 30 }
    ],
    total: 2
  }
}
</script>  