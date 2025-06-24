# 快速开始

## 安装

```bash
npm install antdv-crud
# 或
yarn add antdv-crud
```

## 环境要求

- Vue 3.x
- Ant Design Vue 3.x
- TypeScript 4.9+ (推荐)

## 基础引入

### 完整引入

```js
import { createApp } from 'vue'
import AntdvCrud from 'antdv-crud'
import 'antdv-crud/utils/common.css'

const app = createApp(App)

// 安装组件库
app.use(AntdvCrud, {
  tableConfig: {
    allowClear: true,
    showSearch: true
  },
  formConfig: {
    isTrim: true
  }
})

app.mount('#app')
```

### 按需引入

```js
import { createApp } from 'vue'
import { ACrudForm, ACrudTable, ACrudSearch, ACrudDict } from 'antdv-crud'
import 'antdv-crud/utils/common.css'

const app = createApp(App)

app.component('a-crud-form', ACrudForm)
app.component('a-crud-table', ACrudTable)
app.component('a-crud-search', ACrudSearch)
app.component('a-crud-dict', ACrudDict)
```

## 基础用法

### 搜索组件

```vue
<template>
  <a-crud-search
    :items="searchItems"
    :form-state="searchForm"
    @search-submit="handleSearch"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { inputFormModel } from 'antdv-crud'

const searchForm = ref({})

const searchItems: inputFormModel[] = [
  {
    type: 'text',
    name: 'keyword',
    text: '关键词',
    placeholder: '请输入关键词',
    span: 6
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
    name: 'dateRange',
    text: '日期范围',
    span: 6
  }
]

const handleSearch = (data: any) => {
  console.log('搜索数据:', data)
}
</script>
```

### 表格组件

```vue
<template>
  <a-crud-table
    :api="getTableData"
    :columns="tableColumns"
    :params="tableParams"
    :is-tool-box="true"
    @table-change="handleTableChange"
  />
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
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
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
</script>
```

### 表单组件

```vue
<template>
  <a-crud-form
    :items="formItems"
    :form-state="formData"
    :is-disabled="false"
    @form-submit="handleSubmit"
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
  },
  {
    type: 'select',
    name: 'status',
    text: '状态',
    span: 12,
    option: [
      { value: '1', name: '启用' },
      { value: '0', name: '禁用' }
    ]
  },
  {
    type: 'textarea',
    name: 'description',
    text: '描述',
    span: 24,
    rows: 4
  }
]

const handleSubmit = (data: any) => {
  console.log('表单提交:', data)
}
</script>
```

### 字典组件

```vue
<template>
  <a-crud-dict
    :api="getDictData"
    :params="{ type: 'user_status' }"
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

## 使用 Hook

```typescript
import { useForm, useTable, useSearch } from 'antdv-crud'

// 表单 Hook
const form = new useForm({
  labelWidth: 120,
  size: 'default'
})

// 表格 Hook
const table = new useTable({
  api: getTableData,
  pagination: { pageSize: 10 },
  isToolBox: true
})

// 搜索 Hook
const search = new useSearch({
  items: searchItems,
  immediate: true
})
```

## 全局配置

```typescript
// 全局配置选项
interface CrudConfig {
  tableConfig?: {
    allowClear?: boolean
    showSearch?: boolean
  }
  searchConfig?: {
    allowClear?: boolean
    showSearch?: boolean
  }
  formConfig?: {
    isTrim?: boolean
  }
  inputConfig?: {
    allowClear?: boolean
    showSearch?: boolean
    isTrim?: boolean
  }
}
```

## 下一步

- 查看[核心组件](/v2/components)了解更多组件用法
- 了解[表单项类型](/v2/form-items)支持的所有输入类型
- 探索[特殊功能](/v2/features)实现更复杂的需求
- 查看[事件处理](/v2/events)了解所有可用事件 