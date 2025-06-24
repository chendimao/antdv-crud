# AntDV CRUD - TypeScript 类型声明

这是一个基于 Vue 3 和 Ant Design Vue 的 CRUD 组件库的 TypeScript 类型声明文件。

## 目录结构

```
package/
├── index.d.ts              # 主类型声明文件
├── index.js                # 主入口文件
├── package.json            # 包配置
├── README.md               # 说明文档
├── commonManage/
│   ├── index.d.ts          # 组件类型声明
│   ├── aCrudForm.vue       # 表单组件
│   ├── aCrudTable.vue      # 表格组件
│   ├── aCrudSearch.vue     # 搜索组件
│   ├── aCrudDict.vue       # 字典组件
│   └── InputItem/          # 输入项组件
├── hooks/
│   ├── index.d.ts          # Hook 类型声明
│   ├── useForm.ts          # 表单 Hook
│   ├── useTable.ts         # 表格 Hook
│   ├── useSearch.ts        # 搜索 Hook
│   └── useCrud.ts          # CRUD Hook
├── utils/
│   ├── index.d.ts          # 工具函数类型声明
│   ├── index.ts            # 工具函数
│   ├── is.ts               # 类型检查函数
│   └── loadStyle.js        # 样式加载工具
└── model/
    ├── index.d.ts          # 模型类型声明
    └── index.ts            # 模型定义
```

## 使用方法

### 1. 安装依赖

```bash
npm install antdv-crud
```

### 2. 在 Vue 3 项目中使用

```typescript
import { createApp } from 'vue';
import AntdvCrud from 'antdv-crud';
import 'antdv-crud/utils/common.css';

const app = createApp(App);

// 安装组件库
app.use(AntdvCrud, {
  tableConfig: {
    allowClear: true,
    showSearch: true
  },
  formConfig: {
    isTrim: true
  }
});

app.mount('#app');
```

### 3. 使用组件

```vue
<template>
  <div>
    <!-- 搜索组件 -->
    <a-crud-search
      :items="searchItems"
      :form-state="searchForm"
      @search-submit="handleSearch"
    />
    
    <!-- 表格组件 -->
    <a-crud-table
      :columns="tableColumns"
      :api="getTableData"
      :params="tableParams"
      @table-change="handleTableChange"
    />
    
    <!-- 表单组件 -->
    <a-crud-form
      :items="formItems"
      :form-state="formData"
      @form-submit="handleSubmit"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { inputFormModel } from 'antdv-crud';

// 定义搜索项
const searchItems: inputFormModel[] = [
  {
    type: 'text',
    name: 'keyword',
    text: '关键词',
    placeholder: '请输入关键词'
  },
  {
    type: 'select',
    name: 'status',
    text: '状态',
    option: [
      { value: '1', name: '启用' },
      { value: '0', name: '禁用' }
    ]
  }
];
 

// 定义表单项
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
];

// 表单数据
const formData = ref({});
const searchForm = ref({});
const tableParams = ref({});

// 事件处理
const handleSearch = (data: any) => {
  console.log('搜索数据:', data);
  tableParams.value = data;
};

const handleTableChange = (pagination: any, filters: any, sorter: any) => {
  console.log('表格变化:', { pagination, filters, sorter });
};

const handleSubmit = (data: any) => {
  console.log('表单提交:', data);
};
</script>
```

### 4. 使用 Hook

```typescript
import { useForm, useTable, useSearch } from 'antdv-crud';

// 使用表单 Hook
const form = new useForm({
  labelWidth: 120,
  size: 'default'
});

// 使用表格 Hook
const table = new useTable({
  api: getTableData,
  pagination: { pageSize: 10 },
  isToolBox: true
});

// 使用搜索 Hook
const search = new useSearch({
  items: searchItems,
  immediate: true
});
```

## 类型定义

### 基础类型

- `inputFormModel`: 输入表单项模型
- `ColModel`: 列布局模型
- `uploadFieldModel`: 上传字段模型
- `tableFormModel`: 表格表单模型
- `computedFun`: 计算函数模型

### 组件实例类型

- `ACrudFormInstance`: 表单组件实例
- `ACrudTableInstance`: 表格组件实例
- `ACrudSearchInstance`: 搜索组件实例
- `ACrudDictInstance`: 字典组件实例

### Hook 类型

- `useForm`: 表单 Hook 类
- `useTable`: 表格 Hook 类
- `useSearch`: 搜索 Hook 类
- `useCrud`: CRUD Hook 类

### 工具函数类型

- `CrudUtil`: 工具函数接口
- `LoadStyleOptions`: 样式加载选项

## 全局配置

```typescript
// 全局配置类型
interface CrudConfig {
  tableConfig?: CrudGlobalConfig;
  searchConfig?: CrudGlobalConfig;
  formConfig?: CrudGlobalConfig;
  inputConfig?: CrudGlobalConfig;
}

interface CrudGlobalConfig {
  allowClear?: boolean;
  showSearch?: boolean;
  isTrim?: boolean;
}
```

## 事件类型

```typescript
// 表单事件
interface CrudFormEvents {
  'form-change': (formData: any) => void;
  'form-submit': (formData: any) => void;
  'form-reset': () => void;
  'form-validate': (valid: boolean) => void;
}

// 表格事件
interface CrudTableEvents {
  'table-change': (pagination: any, filters: any, sorter: any) => void;
  'table-selection-change': (selection: any[]) => void;
  // ... 更多事件
}
```

## 注意事项

1. 确保项目中已安装 Vue 3 和 Ant Design Vue
2. TypeScript 版本建议 4.9+
3. 使用 `inputFormModel` 类型来定义表单项配置
4. 使用 `computedFun` 类型来定义计算函数
5. 组件实例类型提供了完整的类型提示和方法签名

## 开发

如需修改类型定义，请编辑对应的 `.d.ts` 文件，然后重新构建项目。 