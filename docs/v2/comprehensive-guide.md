# AntDV-CRUD 完整使用指南

## 概述

AntDV-CRUD 是一个基于 Ant Design Vue 3 + VXE Table 的通用增删改查组件库，提供了完整的数据管理解决方案。该组件库采用 Vue 3 Composition API 设计，支持 TypeScript，具有高度的可配置性和扩展性。

## 核心特性

- 🚀 **开箱即用**: 基于配置快速生成表单、表格、搜索组件
- 🎯 **类型安全**: 完整的 TypeScript 支持
- 🛠 **高度可配置**: 支持全局配置和局部配置
- 📱 **响应式设计**: 适配各种屏幕尺寸
- 🔧 **可扩展**: 支持自定义组件和插槽
- 🎨 **主题定制**: 支持自定义样式和主题

## 快速开始

### 安装

```bash
npm install antdv-crud
# 或
yarn add antdv-crud
# 或
pnpm add antdv-crud
```

### 引入

```typescript
import { createApp } from 'vue'
import AntdvCrud from 'antdv-crud'
import 'antdv-crud/dist/style.css'

const app = createApp(App)

// 全局配置（可选）
app.use(AntdvCrud, {
  tableConfig: {
    size: 'small',
    border: true
  },
  formConfig: {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  },
  searchConfig: {
    showSearch: true
  },
  inputConfig: {
    allowClear: true
  }
})

app.mount('#app')
```

### 在组件中使用

```typescript
import antdCrud from 'path/to/package/index.js'

// 在组件中使用 hooks
const testUseForm = new antdCrud.useForm(formProps.value)
const testUseTable = new antdCrud.useTable(tableProps.value)
const testUseSearch = new antdCrud.useSearch(searchProps.value)
```

## 核心组件

### 1. aCrudForm - 表单组件

表单组件支持新增、编辑、查看三种模式，可以配置为模态框或抽屉形式。

#### 基础用法

```vue
<template>
  <div>
    <a-button @click="handleAddShow('insert')">新增</a-button>
    
    <!-- 表单组件 - 注意这里不传 config，而是通过 @register 注册 -->
    <a-crud-form 
      @register="testUseForm.register" 
      ref="formRef"
    >
      <!-- 自定义插槽 -->
      <template #testSlot="{data}">
        <div>自定义插槽内容: {{ data.formState }}</div>
      </template>
      
      <!-- 表单底部按钮插槽 -->
      <template #default="{formState, loading}">
        <a-button @click="handleSave(formState)" :loading="loading">
          保存
        </a-button>
        <a-button @click="handleCancel">取消</a-button>
      </template>
      
      <!-- 表格操作按钮插槽（如果表单中有表格） -->
      <template #buttons="{data}">
        <a-button type="primary" @click="handleAddRow(data)">新增行</a-button>
      </template>
      
      <!-- 表格操作列插槽 -->
      <template #opera="{data}">
        <a-button type="link" @click="handleDeleteRow(data)">删除</a-button>
      </template>
    </a-crud-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import antdCrud from 'path/to/package/index.js'

// 表单配置
const formData = [
  {
    text: '用户名',
    name: 'username',
    type: 'text',
    span: 12,
    rules: [
      { required: true, message: '请输入用户名' }
    ],
    $attrs: {
      placeholder: '请输入用户名'
    }
  },
  {
    text: '邮箱',
    name: 'email',
    type: 'text',
    span: 12,
    rules: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '请输入正确的邮箱格式' }
    ]
  },
  {
    text: '状态',
    name: 'status',
    type: 'select',
    span: 12,
    option: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ]
  },
  {
    text: '自定义插槽',
    name: 'customField',
    type: 'slot',
    span: 24
  }
]

// 表单属性配置
const formProps = ref({
  formData: formData,
  insertApi: insertApi,
  updateApi: updateApi,
  modalType: 'modal', // modal | drawer | form
  width: '800px',
  name: 'userForm'
})

// 创建 useForm 实例
const testUseForm = new antdCrud.useForm(formProps.value)
const methods = ref()

const formRef = ref()

onMounted(() => {
  // 可以与其他组件组合使用
  methods.value = new antdCrud.useCrud({
    form: testUseForm
  }).methods
})

// API 方法
const insertApi = (data) => {
  return fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

const updateApi = (data) => {
  return fetch(`/api/users/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

// 打开表单
const handleAddShow = (type: 'insert' | 'update' | 'show', data?: any) => {
  methods.value.handleFormShow(type, data)
}

const handleSave = (formState) => {
  console.log('表单数据:', formState)
  methods.value.handleFormSubmit()
}

const handleCancel = () => {
  methods.value.handleFormCancel()
}

// 表格内操作
const handleAddRow = (data) => {
  data.tableData.push({
    name: '新行',
    status: 1
  })
}

const handleDeleteRow = (data) => {
  data.tableRef.remove(data.row)
}
</script>
```

#### 表单字段类型

支持的字段类型包括：

```typescript
// 基础输入类型
'text' | 'password' | 'textarea' | 'number' | 'integer' | 'float'

// 选择类型
'select' | 'radio' | 'checkbox' | 'cascader' | 'treeSelect'

// 日期时间类型
'date' | 'datetime' | 'time' | 'dateRange' | 'month' | 'year'

// 其他类型
'switch' | 'slider' | 'rate' | 'upload' | 'mention'

// 自定义类型
'slot' | 'h' // 支持插槽和渲染函数
```

#### 高级配置

```typescript
const formData = [
  {
    text: '数字输入框',
    name: 'number',
    type: 'number',
    span: 8,
    // 支持函数式默认值
    value: (formState, formData) => {
      return (formState.number2 + formState.number3) * 2 - 2
    },
    valueType: 'fn', // 标识为函数类型
    colStyle: { color: 'red' },
    labelCol: { style: { width: '100px' } },
    rules: [
      { required: true, message: '请输入数值' }
    ],
    $attrs: {
      onChange: (item, formState, formData, value) => {
        console.log('值变化:', value)
      }
    }
  },
  {
    text: '用户名',
    name: 'username',
    type: 'text',
    span: 12,
    show: true, // 或使用函数 (formState, item, type) => type !== 'show'
    disabled: (data, form, type) => type === 'show', // 动态禁用
    $attrs: {
      placeholder: '请输入用户名',
      onMounted: (...data) => {
        console.log('组件已挂载', data)
      }
    },
    labelCol: { style: { width: '100px' } },
    rules: [
      { required: true, message: '请输入用户名' }
    ]
  },
  {
    text: '自定义插槽',
    name: 'customSlot',
    type: 'slot',
    span: 24
  },
  {
    text: '渲染函数内容',
    name: 'renderContent',
    type: 'h',
    h: (formState, item, methods) => {
      return h('div', { style: { color: 'blue' } }, `当前用户: ${formState.username || '未填写'}`)
    },
    span: 24
  }
]
```

### 2. aCrudTable - 表格组件

基于 VXE Table 的高性能表格组件，支持虚拟滚动、树形数据、编辑等功能。

#### 基础用法

```vue
<template>
  <!-- 表格组件 - 通过 @register 注册，通过 :config 传递配置 -->
  <a-crud-table
    @register="testUseTable.register"
    ref="crudTableRef"
    :config="tableProps"
  >
    <!-- 工具栏按钮插槽 -->
    <template #buttons="data">
      <a-button
        @click="handleAddShow('insert', data)"
        type="primary"
        size="middle"
      >
        <template #icon>
          <PlusOutlined />
        </template>
        新增
      </a-button>
    </template>
    
    <!-- 自定义列插槽 - 插槽名对应列配置中的 name -->
    <template #status="data">
      <a-tag :color="data.row.status === 1 ? 'green' : 'red'">
        {{ data.row.status === 1 ? '启用' : '禁用' }}
      </a-tag>
    </template>
    
    <!-- 操作列插槽 - 使用 #default -->
    <template #default="data">
      <a-button type="link" @click="handleDelete(data)">删除</a-button>
      <a-button type="link" @click="handleEdit(data)">编辑</a-button>
    </template>
    
    <!-- 左侧菜单插槽 -->
    <template #menuLeft="data">
      <a-button>左侧按钮</a-button>
    </template>
    
    <!-- 右侧菜单插槽 -->
    <template #menuRight="data">
      <a-button>右侧按钮</a-button>
    </template>
  </a-crud-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import antdCrud from 'path/to/package/index.js'

// 表格列配置
const columns = [
  {
    type: 'checkbox', // 复选框列
    name: 'checkbox'
  },
  {
    text: '用户名',
    name: 'username',
    type: 'text',
    $attrs: { minWidth: '120px', showOverflow: true }
  },
  {
    text: '邮箱',
    name: 'email',
    type: 'text',
    $attrs: { minWidth: '200px', showOverflow: true }
  },
  {
    text: '状态',
    name: 'status',
    type: 'slot', // 使用插槽自定义显示
    $attrs: { minWidth: '100px' }
  },
  {
    text: '分组表头',
    type: 'colgroup',
    name: 'group',
    $attrs: { minWidth: '300px' },
    children: [
      {
        text: '创建时间',
        name: 'createTime',
        type: 'datetime',
        $attrs: { minWidth: '150px' }
      },
      {
        text: '更新时间',
        name: 'updateTime',
        type: 'datetime',
        $attrs: { minWidth: '150px' }
      }
    ]
  }
]

// 表格配置
const tableProps = ref({
  api: getDataApi, // 数据接口
  columns: columns,
  mockData: [], // 可选的模拟数据
  isMenu: true, // 显示操作列
  menuWidth: 150,
  isView: true, // 显示查看按钮
  isEdit: true, // 显示编辑按钮
  size: 'mini',
  isSortable: false, // 排序开关
  $attrs: {
    stripe: true, // 斑马纹
    currentRowBg: 'dodgerblue',
    height: '400px',
    checkboxConfig: {
      checkAll: true,
      checkAllText: '全选'
    }
  },
  toolBox: {
    showType: 'button', // 工具栏类型: 'button' | 'toolbar'
    showSearch: true,
    showExport: true,
    showPrint: true,
    showRefresh: true
  }
})

// 创建 useTable 实例
const testUseTable = new antdCrud.useTable(tableProps.value)
const methods = ref()

const crudTableRef = ref()

onMounted(() => {
  methods.value = new antdCrud.useCrud({
    table: testUseTable
  }).methods
})

// API 方法
const getDataApi = (params) => {
  return fetch('/api/users', {
    method: 'POST', // 注意：实际使用中通常是 POST
    body: JSON.stringify(params)
  }).then(res => res.json())
}

const handleAddShow = (type, data) => {
  console.log('新增操作', type, data)
  // 调用表单显示方法
  methods.value.handleFormShow(type)
}

const handleDelete = (data) => {
  console.log('删除操作', data)
  // 删除逻辑
}

const handleEdit = (data) => {
  console.log('编辑操作', data)
  methods.value.handleFormShow('update', data.row)
}
</script>
```

#### 表格配置选项

```typescript
interface TableConfig {
  // 基础配置
  border?: boolean // 是否显示边框
  stripe?: boolean // 是否显示斑马纹
  size?: 'mini' | 'small' | 'medium' // 表格尺寸
  height?: string | number // 表格高度
  
  // 功能配置
  showOverflow?: boolean | 'tooltip' // 内容溢出处理
  resizable?: boolean // 是否可调整列宽
  sortable?: boolean // 是否可排序
  
  // 分页配置
  pagerConfig?: {
    pageSize?: number
    pageSizes?: number[]
    layouts?: string[]
  }
  
  // 工具栏配置
  toolBox?: {
    showType?: 'toolbar' | 'button'
    showSearch?: boolean
    showExport?: boolean
    showPrint?: boolean
    showRefresh?: boolean
    showSetting?: boolean
  }
  
  // 操作列配置
  menu?: {
    isMenu?: boolean
    width?: number
    fixed?: 'left' | 'right'
    buttons?: Array<{
      text: string
      icon?: string
      type?: string
      click: (row: any) => void
    }>
  }
}
```

### 3. aCrudSearch - 搜索组件

提供灵活的搜索表单功能。

#### 基础用法

```vue
<template>
  <a-card>
    <template #title>
      <!-- 搜索组件 - 通过 @register 注册，通过 :config 传递配置 -->
      <a-crud-search 
        ref="searchRef"
        @register="testUseSearch.register"
        @search="emitSearch"
        :config="searchProps"
      >
        <!-- 可以在搜索区域添加其他内容 -->
        <a-button @click="handleExtraAction">额外操作</a-button>
        <router-link to="/other-page">跳转页面</router-link>
      </a-crud-search>
    </template>
    
    <!-- 其他内容 -->
  </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import antdCrud from 'path/to/package/index.js'

// 搜索配置
const searchData = [
  {
    text: '名称',
    type: 'text',
    name: 'text1',
    span: 6,
    $attrs: {
      onBlur: (data) => {
        console.log('失焦事件:', data)
      },
      onFocus: (data) => {
        console.log('聚焦事件:', data)
      },
      onPressEnter: (data) => {
        console.log('回车搜索:', data)
      }
    },
    style: 'width: 260px',
    labelCol: { style: { width: '90px' } },
    wrapperCol: { style: { width: '200px' } }
  },
  {
    text: '状态',
    type: 'select',
    name: 'status',
    span: 6,
    option: [
      { name: '选项1', value: 1 },
      { name: '选项2', value: 2 },
      { name: '选项3', value: 3 }
    ],
    $attrs: {
      onChange: (data) => {
        console.log('下拉框变化:', data)
      }
    },
    labelCol: { style: { width: '90px' } }
  },
  {
    text: '类型',
    type: 'radio',
    name: 'type',
    span: 10,
    option: [
      { name: '类型1', value: 0 },
      { name: '类型2', value: 1 },
      { name: '类型3', value: 2 }
    ],
    value: 0, // 默认值
    $attrs: { buttonStyle: 'solid' },
    optionType: 'button' // 按钮样式
  },
  {
    text: '日期范围',
    type: 'daterange',
    name: 'dateRange',
    span: 10,
    value: [],
    $attrs: {
      onOpenChange: (...data) => {
        console.log('日期选择器开关:', data)
      }
    }
  },
  // 隐藏字段，用于传递额外参数
  { name: 'page', value: 1 },
  { name: 'size', value: 10 },
  { name: 'userId', value: 2 }
]

// 搜索配置
const searchProps = ref({
  formData: searchData
})

// 创建 useSearch 实例
const testUseSearch = new antdCrud.useSearch(searchProps.value)
const methods = ref()

const searchRef = ref()

onMounted(() => {
  methods.value = new antdCrud.useCrud({
    search: testUseSearch
  }).methods
})

// 搜索事件处理
const emitSearch = (params) => {
  console.log('搜索参数:', params)
  // 这里可以调用表格的数据刷新方法
  // methods.value.getData(params)
}

const handleExtraAction = () => {
  console.log('执行额外操作')
}
</script>
```

## Composition API Hooks

### useForm

```typescript
import antdCrud from 'path/to/package/index.js'

// 表单配置
const formProps = ref({
  formData: formData, // 表单字段配置
  insertApi: insertApi, // 新增接口
  updateApi: updateApi, // 更新接口
  modalType: 'modal', // 'modal' | 'drawer' | 'form'
  width: '800px',
  name: 'userForm' // 表单名称
})

// 创建实例
const testUseForm = new antdCrud.useForm(formProps.value)

// 主要方法 - 注意：methods 是私有属性，需要通过 formMethods 访问
testUseForm.formMethods.value.handleFormShow(type, data) // 打开表单
testUseForm.formMethods.value.handleFormSubmit(extraData) // 提交表单
testUseForm.formMethods.value.getFormStateValue(key) // 获取表单值
testUseForm.formMethods.value.setFormStateValue(key, value) // 设置表单值
testUseForm.formMethods.value.setFormPropsValue(key, value) // 设置表单属性
testUseForm.formMethods.value.getFormPropsValue(key) // 获取表单属性
```

### useTable

```typescript
import antdCrud from 'path/to/package/index.js'

// 表格配置
const tableProps = ref({
  api: getDataApi, // 数据接口
  columns: columns, // 列配置
  mockData: [], // 模拟数据
  isMenu: true, // 显示操作列
  isView: true, // 显示查看按钮
  isEdit: true, // 显示编辑按钮
  size: 'mini',
  $attrs: {
    stripe: true,
    height: '400px'
  }
})

// 创建实例
const testUseTable = new antdCrud.useTable(tableProps.value)

// 主要方法 - 通过 tableMethods 访问
testUseTable.tableMethods.value.getData(params) // 获取数据
testUseTable.tableMethods.value.setTablePropsValue(key, value) // 设置表格属性
testUseTable.tableMethods.value.getTablePropsValue(key) // 获取表格属性
testUseTable.tableMethods.value.mergeTableProps(props) // 合并表格属性
```

### useSearch

```typescript
import antdCrud from 'path/to/package/index.js'

// 搜索配置
const searchProps = ref({
  formData: searchData // 搜索字段配置
})

// 创建实例
const testUseSearch = new antdCrud.useSearch(searchProps.value)

// 主要方法 - 通过 searchMethods 访问
testUseSearch.searchMethods.value.getSearchParams() // 获取搜索参数
testUseSearch.searchMethods.value.getResetParams() // 获取重置参数
testUseSearch.searchMethods.value.setSearchPropsValue(key, value) // 设置搜索属性
testUseSearch.searchMethods.value.mergeSearchResetParams(params) // 合并重置参数
```

### useCrud

组合使用多个组件：

```typescript
import antdCrud from 'path/to/package/index.js'

// 在 onMounted 中创建
onMounted(() => {
  const methods = new antdCrud.useCrud({
    form: testUseForm,
    table: testUseTable, 
    search: testUseSearch
  }).methods
  
  // 统一的方法调用
  methods.handleFormShow('insert') // 打开新增表单
  methods.handleFormShow('update', rowData) // 打开编辑表单
  methods.handleFormSubmit(extraData) // 提交表单
  methods.getData(params) // 获取表格数据
  methods.getSearch(params, force) // 搜索并刷新表格
})
```

## 插槽使用指南

### aCrudForm 插槽

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `#default` | `{formState, loading}` | 表单底部按钮区域 |
| `#buttons` | `{data}` | 表格操作按钮（当表单中有表格时） |
| `#opera` | `{data}` | 表格操作列（当表单中有表格时） |
| `#[fieldName]` | `{data}` | 自定义字段插槽，fieldName 为字段配置中的 name |

```vue
<a-crud-form @register="testUseForm.register">
  <!-- 底部按钮插槽 -->
  <template #default="{formState, loading}">
    <a-button @click="handleSave(formState)" :loading="loading">
      保存
    </a-button>
    <a-button @click="handleCancel">取消</a-button>
  </template>
  
  <!-- 自定义字段插槽 -->
  <template #customField="{data}">
    <a-input-group>
      <a-input v-model:value="data.formState.field1" placeholder="字段1" />
      <a-input v-model:value="data.formState.field2" placeholder="字段2" />
    </a-input-group>
  </template>
  
  <!-- 表格操作按钮 -->
  <template #buttons="{data}">
    <a-button type="primary" @click="handleAddRow(data)">新增行</a-button>
    <a-button @click="handleValidate(data)">校验</a-button>
  </template>
  
  <!-- 表格操作列 -->
  <template #opera="{data}">
    <a-button type="link" @click="handleDeleteRow(data)">删除</a-button>
  </template>
</a-crud-form>
```

### aCrudTable 插槽

| 插槽名 | 参数 | 说明 |
|--------|------|------|
| `#buttons` | `{data}` | 工具栏按钮区域 |
| `#default` | `{data}` | 操作列内容 |
| `#menuLeft` | `{data}` | 工具栏左侧菜单 |
| `#menuRight` | `{data}` | 工具栏右侧菜单 |
| `#[columnName]` | `{data}` | 自定义列插槽，columnName 为列配置中的 name |

```vue
<a-crud-table @register="testUseTable.register" :config="tableProps">
  <!-- 工具栏按钮 -->
  <template #buttons="data">
    <a-button type="primary" @click="handleAdd">
      <PlusOutlined /> 新增
    </a-button>
    <a-button @click="handleBatchDelete">批量删除</a-button>
  </template>
  
  <!-- 自定义列显示 -->
  <template #status="data">
    <a-tag :color="data.row.status === 1 ? 'green' : 'red'">
      {{ data.row.status === 1 ? '启用' : '禁用' }}
    </a-tag>
  </template>
  
  <!-- 操作列 -->
  <template #default="data">
    <a-button type="link" @click="handleEdit(data)">编辑</a-button>
    <a-button type="link" danger @click="handleDelete(data)">删除</a-button>
  </template>
  
  <!-- 左侧菜单 -->
  <template #menuLeft="data">
    <a-button @click="handleImport">导入</a-button>
  </template>
  
  <!-- 右侧菜单 -->
  <template #menuRight="data">
    <a-button @click="handleSettings">设置</a-button>
  </template>
</a-crud-table>
```

### aCrudSearch 插槽

搜索组件主要通过默认插槽添加额外内容：

```vue
<a-crud-search @register="testUseSearch.register" :config="searchProps">
  <!-- 可以添加额外的按钮或链接 -->
  <a-button @click="handleExport">导出</a-button>
  <a-button @click="handleReset">重置</a-button>
  <router-link to="/other-page">跳转页面</router-link>
</a-crud-search>
```

### aCrudDict 字典组件

```vue
<template>
  <!-- 字典选择组件 -->
  <a-crud-dict 
    style="width: 200px;" 
    :immediate="true" 
    @change="handleDictChange" 
    :api="getDictApi"
    :tableField="[
      { field: 'name', title: '名称', width: 150 },
      { field: 'code', title: '编码', width: 150 }
    ]"
    :params="{ page: 1, rows: 30, limit: 30, field: '', tableName: 'dict' }"
    searchField="field" 
    selectField="code"
  />
</template>

<script setup lang="ts">
const handleDictChange = (value, data) => {
  console.log('字典选择变化:', value, data)
}

const getDictApi = (params) => {
  return fetch('/api/dict', { 
    method: 'GET',
    params 
  }).then(res => res.json())
}
</script>
```

## 高级功能

### 自定义渲染

#### 使用插槽

```vue
<template>
  <a-crud-form :form-data="formData">
    <!-- 自定义表单项 -->
    <template #customField="{ data }">
      <a-input-group compact>
        <a-input style="width: 70%" v-model:value="data.formState.field1" />
        <a-input style="width: 30%" v-model:value="data.formState.field2" />
      </a-input-group>
    </template>
  </a-crud-form>
</template>
```

#### 使用渲染函数

```typescript
import { h } from 'vue'

const formData = [
  {
    text: '自定义内容',
    name: 'custom',
    type: 'h',
    h: (formState, item, methods) => {
      return h('div', [
        h('span', '当前值: '),
        h('strong', formState[item.name] || '无')
      ])
    }
  }
]
```

### 表单验证

#### 内置验证规则

```typescript
const formData = [
  {
    text: '邮箱',
    name: 'email',
    type: 'text',
    rules: [
      { required: true, message: '请输入邮箱' },
      { type: 'email', message: '请输入正确的邮箱格式' },
      { min: 5, max: 50, message: '邮箱长度在 5 到 50 个字符' }
    ]
  }
]
```

#### 自定义验证

```typescript
const customValidator = (rule, value, callback) => {
  if (value && value.length < 6) {
    callback(new Error('密码长度不能少于6位'))
  } else {
    callback()
  }
}

const formData = [
  {
    text: '密码',
    name: 'password',
    type: 'password',
    rules: [
      { required: true, message: '请输入密码' },
      { validator: customValidator, trigger: 'blur' }
    ]
  }
]
```

### 动态表单

```typescript
const formData = [
  {
    text: '用户类型',
    name: 'userType',
    type: 'select',
    option: [
      { label: '普通用户', value: 'normal' },
      { label: '管理员', value: 'admin' }
    ],
    $attrs: {
      onChange: (item, formState, formData, value) => {
        // 根据用户类型动态显示/隐藏其他字段
        const roleField = formData.find(f => f.name === 'role')
        if (roleField) {
          roleField.show = value === 'admin'
        }
      }
    }
  },
  {
    text: '管理员角色',
    name: 'role',
    type: 'select',
    show: false, // 默认隐藏
    option: [
      { label: '超级管理员', value: 'super' },
      { label: '普通管理员', value: 'normal' }
    ]
  }
]
```

## API 参考

### 组件 Props

#### aCrudForm Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| formData | 表单配置数组 | `FormItem[]` | `[]` |
| insertApi | 新增接口 | `Function` | - |
| updateApi | 更新接口 | `Function` | - |
| modalType | 弹窗类型 | `'modal' \| 'drawer'` | `'modal'` |
| width | 弹窗宽度 | `string \| number` | `'800px'` |
| title | 弹窗标题 | `string` | - |

#### aCrudTable Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| columns | 表格列配置 | `TableColumn[]` | `[]` |
| getDataApi | 获取数据接口 | `Function` | - |
| deleteApi | 删除接口 | `Function` | - |
| border | 是否显示边框 | `boolean` | `false` |
| stripe | 是否显示斑马纹 | `boolean` | `false` |

### 事件

#### aCrudForm Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| success | 表单提交成功 | `(data, type)` |
| cancel | 取消操作 | `()` |
| open | 表单打开 | `(type, data)` |

#### aCrudTable Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| edit | 编辑行 | `(row)` |
| view | 查看行 | `(row)` |
| delete | 删除行 | `(rows)` |
| selectionChange | 选中项改变 | `(selection)` |

## 最佳实践

### 1. 项目结构

```
src/
├── views/
│   ├── user/
│   │   ├── index.vue          # 用户管理页面
│   │   ├── config/
│   │   │   ├── form.ts        # 表单配置
│   │   │   ├── table.ts       # 表格配置
│   │   │   └── search.ts      # 搜索配置
│   │   └── api.ts             # API 接口
```

### 2. 配置分离

```typescript
// config/form.ts
export const userFormConfig = [
  {
    text: '用户名',
    name: 'username',
    type: 'text',
    rules: [{ required: true, message: '请输入用户名' }]
  }
  // ... 其他配置
]

// config/table.ts
export const userTableConfig = [
  {
    text: '用户名',
    name: 'username',
    type: 'text',
    width: 120
  }
  // ... 其他配置
]
```

### 3. 统一的 API 封装

```typescript
// api.ts
import http from '@/utils/http'

export const userApi = {
  getList: (params: any) => http.get('/users', { params }),
  create: (data: any) => http.post('/users', data),
  update: (id: string, data: any) => http.put(`/users/${id}`, data),
  delete: (ids: string[]) => http.delete('/users', { data: { ids } })
}
```

### 4. 完整示例

基于 applyManager 的实际使用示例：

```vue
<template>
  <a-card style="width: 100%;">
    <!-- 搜索区域 -->
    <template #title>
      <a-crud-search 
        ref="searchRef"
        @register="testUseSearch.register"
        @search="emitSearch"
        :config="searchProps"
      >
        <a-button @click="handleTest" type="primary">测试功能</a-button>
      </a-crud-search>
    </template>

    <!-- 表格区域 -->
    <a-row>
      <a-col :span="24">
        <!-- 字典组件示例 -->
        <a-crud-dict 
          style="width:200px;" 
          :immediate="true" 
          @change="changeDict" 
          :api="getDictApi"
          :tableField="[
            { field: 'name', title: '名称', width: 150 },
            { field: 'code', title: '编码', width: 150 }
          ]"
          :params="{ page: 1, rows: 30, limit: 30, field: '', tableName: 'dict' }"
          searchField="field" 
          selectField="code"
        />

        <!-- 表格组件 -->
        <div class="mr-0 overflow-hidden bg-white vben-basic-table">
          <a-crud-table
            @register="testUseTable.register"
            ref="crudTableRef"
            :config="tableProps"
          >
            <!-- 工具栏按钮 -->
            <template #buttons="data">
              <a-button
                @click="handleAddShow('insert', data)"
                type="primary"
                size="middle"
              >
                <template #icon>
                  <PlusOutlined />
                </template>
                新增
              </a-button>
            </template>

            <!-- 自定义列插槽 -->
            <template #status="data">
              <a-tag color="blue">自定义状态</a-tag>
            </template>

            <!-- 操作列插槽 -->
            <template #default="data">
              <a-button type="link" @click="handleDelete(data)">删除</a-button>
            </template>
          </a-crud-table>
        </div>
      </a-col>
    </a-row>
  </a-card>

  <!-- 表单弹窗 -->
  <a-crud-form @register="testUseForm.register" ref="cardFormRef">
    <!-- 自定义插槽 -->
    <template #testSlot="{data}">
      <div>自定义插槽内容</div>
    </template>

    <!-- 自定义按钮 -->
    <template #default="{formState, loading}">
      <a-button @click="handleSave(formState)" :loading="loading">
        保存
      </a-button>
    </template>

    <!-- 表格操作按钮 -->
    <template #buttons="{data}">
      <a-button type="primary" @click="handleAddTable(data)">新增行</a-button>
    </template>

    <!-- 表格操作列 -->
    <template #opera="{data}">
      <a-button @click="handleDeleteTable(data)">删除行</a-button>
    </template>
  </a-crud-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import antdCrud from 'path/to/package/index.js'

// 导入配置文件
import formData from './data/form'
import tableData from './data/table'
import searchData from './data/search'

// 配置对象
const formProps = ref({
  formData: formData,
  insertApi: insertApi,
  updateApi: updateApi,
  modalType: 'modal',
  width: '800px',
  name: 'userForm'
})

const tableProps = ref({
  api: getDataApi,
  columns: tableData,
  mockData: [],
  isMenu: true,
  menuWidth: 300,
  isView: true,
  isEdit: true,
  size: 'mini',
  isSortable: false,
  $attrs: {
    stripe: true,
    height: '400px',
    checkboxConfig: {
      checkAll: true,
      checkAllText: '全选'
    }
  },
  toolBox: {
    showType: 'button'
  }
})

const searchProps = ref({
  formData: searchData
})

// 创建 Hook 实例
const testUseForm = new antdCrud.useForm(formProps.value)
const testUseTable = new antdCrud.useTable(tableProps.value)
const testUseSearch = new antdCrud.useSearch(searchProps.value)

// 统一方法管理
const methods = ref()
const cardFormRef = ref()
const crudTableRef = ref()
const searchRef = ref()

onMounted(() => {
  methods.value = new antdCrud.useCrud({
    form: testUseForm,
    table: testUseTable,
    search: testUseSearch
  }).methods
})

// API 方法
const insertApi = (data) => {
  return fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json())
}

const updateApi = (data) => {
  return fetch(`/api/users/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }).then(res => res.json())
}

const getDataApi = (params) => {
  return fetch('/api/users/list', {
    method: 'POST',
    body: JSON.stringify(params)
  }).then(res => res.json())
}

const getDictApi = (params) => {
  return fetch('/api/dict', {
    method: 'GET',
    params
  }).then(res => res.json())
}

// 事件处理方法
const handleAddShow = (type, data) => {
  methods.value.handleFormShow(type, data)
}

const handleSave = (formState) => {
  console.log('保存数据:', formState)
  methods.value.handleFormSubmit()
}

const handleDelete = (data) => {
  console.log('删除操作:', data)
}

const emitSearch = (params) => {
  console.log('搜索参数:', params)
  methods.value.getData(params)
}

const changeDict = (value, data) => {
  console.log('字典选择:', value, data)
}

const handleTest = () => {
  console.log('测试功能')
}

// 表格内表单操作
const handleAddTable = (data) => {
  data.tableData.push({
    name: '新增行',
    code: 'NEW_' + Date.now(),
    status: 1
  })
}

const handleDeleteTable = (data) => {
  data.tableRef.remove(data.row)
  testUseForm.formMethods.value.setFormStateValue(
    'table', 
    data.tableRef.getTableData().tableData
  )
}
</script>

<style scoped>
.vben-basic-table {
  margin-top: 16px;
}
</style>
```

## 常见问题

### Q: 如何自定义表单验证？

A: 可以在字段配置中使用 `rules` 属性，支持 Ant Design Vue 的所有验证规则。

### Q: 如何实现表格的行内编辑？

A: 设置表格的 `editType` 为 `'edit'` 或 `'all'`，列配置中的字段会自动变为可编辑状态。

### Q: 如何处理文件上传？

A: 使用 `type: 'upload'` 字段类型，配合相应的上传接口。

### Q: 如何实现表格的树形数据？

A: 在表格配置中设置 `treeConfig`，并确保数据结构包含 `children` 字段。

## 更新日志

### v2.0.0

- 全面升级到 Vue 3 Composition API
- 新增 TypeScript 支持
- 优化组件性能
- 增加更多自定义配置选项

### v1.x.x

- 基于 Vue 2 的初始版本
- 提供基础的 CRUD 功能

---

更多详细信息请参考 [GitHub 仓库](https://github.com/your-repo/antdv-crud) 或查看其他文档页面。
