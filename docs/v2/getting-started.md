# 快速开始

## 安装

```bash
npm install antdv-crud
# 或
yarn add antdv-crud
```

## 引入组件

```js
import { createApp } from 'vue'
import AntdvCrud from 'antdv-crud'
import 'antdv-crud/dist/style.css'

const app = createApp(App)
app.use(AntdvCrud)
```

## 基础用法

### 搜索组件

```vue
<template>
  <a-crud-search
    :formData="searchForm"
    @search="handleSearch"
  />
</template>

<script setup>
import { ref } from 'vue'

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
</script>
```

### 表格组件

```vue
<template>
  <a-crud-table
    :api="api"
    :columns="columns"
    :toolBox="true"
  />
</template>

<script setup>
import { ref } from 'vue'

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
</script>
```

### 表单组件

```vue
<template>
  <a-crud-form
    :title="formTitle"
    :formData="formData"
    :api="api"
    @success="handleSuccess"
  />
</template>

<script setup>
import { ref } from 'vue'

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
}
</script>
```

## 下一步

- 查看[核心组件](/v2/components)了解更多组件用法
- 了解[表单项类型](/v2/form-items)支持的所有输入类型
- 探索[特殊功能](/v2/features)实现更复杂的需求 