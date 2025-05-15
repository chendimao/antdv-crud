# 组件初始化

Antdv-Crud 提供了多种初始化组件的方式，可以根据项目需求选择合适的方式。

## 全局注册

### 完整引入

```js
import { createApp } from 'vue'
import AntdvCrud from 'antdv-crud'
import 'antdv-crud/dist/style.css'

const app = createApp(App)
app.use(AntdvCrud)
```

### 按需引入

```js
import { createApp } from 'vue'
import { ACrudSearch, ACrudTable, ACrudForm } from 'antdv-crud'
import 'antdv-crud/dist/style.css'

const app = createApp(App)
app.component('a-crud-search', ACrudSearch)
app.component('a-crud-table', ACrudTable)
app.component('a-crud-form', ACrudForm)
```

## 组件内注册

### 完整引入

```vue
<template>
  <a-crud-search :formData="searchForm" />
  <a-crud-table :api="api" :columns="columns" />
  <a-crud-form :formData="formData" :api="api" />
</template>

<script setup>
import { ACrudSearch, ACrudTable, ACrudForm } from 'antdv-crud'
</script>
```

### 按需引入

```vue
<template>
  <a-crud-search :formData="searchForm" />
</template>

<script setup>
import { ACrudSearch } from 'antdv-crud'
</script>
```

## 全局配置

### 默认配置

```js
import { createApp } from 'vue'
import AntdvCrud from 'antdv-crud'

const app = createApp(App)
app.use(AntdvCrud, {
  // 表格配置
  table: {
    // 分页配置
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true
    },
    // 工具栏配置
    toolBox: {
      show: true,
      showAdd: true,
      showDelete: true,
      showExport: true,
      showImport: true
    }
  },
  // 表单配置
  form: {
    // 弹窗配置
    modal: {
      width: 800,
      destroyOnClose: true
    },
    // 按钮配置
    buttons: {
      submitText: '确定',
      cancelText: '取消'
    }
  },
  // 搜索配置
  search: {
    // 按钮配置
    buttons: {
      searchText: '查询',
      resetText: '重置'
    }
  }
})
```

### 请求配置

```js
import { createApp } from 'vue'
import AntdvCrud from 'antdv-crud'
import axios from 'axios'

const app = createApp(App)
app.use(AntdvCrud, {
  // 请求配置
  request: {
    // 请求实例
    instance: axios.create({
      baseURL: '/api',
      timeout: 10000
    }),
    // 请求拦截器
    requestInterceptor: (config) => {
      // 添加 token
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
      return config
    },
    // 响应拦截器
    responseInterceptor: (response) => {
      // 处理响应
      const { code, data, message } = response.data
      if (code === 0) {
        return data
      }
      throw new Error(message)
    }
  }
})
```

### 主题配置

```js
import { createApp } from 'vue'
import AntdvCrud from 'antdv-crud'

const app = createApp(App)
app.use(AntdvCrud, {
  // 主题配置
  theme: {
    // 主题色
    primaryColor: '#1890ff',
    // 成功色
    successColor: '#52c41a',
    // 警告色
    warningColor: '#faad14',
    // 错误色
    errorColor: '#f5222d',
    // 字体大小
    fontSize: 14,
    // 圆角大小
    borderRadius: 4
  }
})
```

## 组件配置

### 搜索组件

```vue
<template>
  <a-crud-search
    :formData="searchForm"
    :loading="loading"
    :showReset="true"
    :resetText="'重置'"
    :searchText="'查询'"
    @search="handleSearch"
    @reset="handleReset"
  />
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const searchForm = ref({
  unitName: {
    type: 'text',
    label: '单位名称',
    placeholder: '请输入单位名称'
  }
})

const handleSearch = (values) => {
  console.log('搜索值：', values)
}

const handleReset = () => {
  console.log('重置表单')
}
</script>
```

### 表格组件

```vue
<template>
  <a-crud-table
    :api="api"
    :columns="columns"
    :loading="loading"
    :pagination="pagination"
    :toolBox="true"
    :isMenu="false"
    :menuWidth="120"
    @load="handleLoad"
    @selection-change="handleSelectionChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)
const api = {
  list: '/api/list',
  delete: '/api/delete'
}

const columns = ref([
  {
    title: '单位名称',
    dataIndex: 'unitName'
  },
  {
    title: '操作',
    width: 200,
    slots: {
      customRender: 'action'
    }
  }
])

const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0
})

const handleLoad = (params) => {
  console.log('加载参数：', params)
}

const handleSelectionChange = (selectedRows) => {
  console.log('选中行：', selectedRows)
}
</script>
```

### 表单组件

```vue
<template>
  <a-crud-form
    :title="formTitle"
    :formData="formData"
    :api="api"
    :loading="loading"
    :visible="visible"
    :width="800"
    :layout="'horizontal'"
    @success="handleSuccess"
    @cancel="handleCancel"
  />
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const loading = ref(false)
const formTitle = ref('新增')

const formData = ref({
  unitName: {
    type: 'text',
    label: '单位名称',
    rules: [{ required: true, message: '请输入单位名称' }]
  }
})

const api = {
  insert: '/api/insert',
  update: '/api/update'
}

const handleSuccess = () => {
  console.log('表单提交成功')
  visible.value = false
}

const handleCancel = () => {
  visible.value = false
}
</script>
``` 