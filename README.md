# Ant Design Vue 3 CRUD 入门指南

## 介绍
### Ant Design Vue 3 CRUD 插件是一个基于 Vue 3 和 Ant Design Vue 的通用增删改查（CRUD）功能插件。它旨在简化开发过程，为开发人员提供一个快速构建管理界面的解决方案，无需编写重复的 CRUD 功能。有疑问联系qq：122803265

## 访问[官网详细文档](http://chendimao.com:8888)
## 安装
### 本插件使用的依赖，使用前需要安装这些插件并正确引入
```json{4}
{
    "ant-design-vue": "^3",  
    "less": "^4.2.0",
    "vite": ">=2.9.1",
    "vxe-table": "^4"
  }
  ```
**npm**

```bash{4}
 npm i antdv-crud -D
``` 
**yarn**

```bash{4}
 yarn add antdv-crud -D
``` 

## 注册全局组件
```js{4}
import antdCrud from 'antdv-crud';
import 'antdv-crud/dist/style.css';

app.use(antdCrud);


``` 

## 基本使用
####  插件有三个基础组件，分别是搜索组件（查询）、表格组件（列表）和表单组件（新增修改）。每个组件都有自己的配置文件，用于配置组件的属性和行为。
### 组件使用示例

```vue
<!--搜索组件-->
 <a-crud-search ref="searchRef" @register="registerSearch" />

<!--表格组件-->
<a-crud-table @register="registerTable">
  <template #default="{ row }">
    <a-button type="link" @click="handleFormShow('show', row)">查看</a-button>
    <a-button type="link" @click="handleFormShow('update', row)">编辑</a-button>
  </template>
</a-crud-table>

<!--表单组件-->
<a-crud-form @register="registerForm"/>


<!--script部分-->
import {  getCurrentInstance,   ref } from 'vue';
import formData from './data/form';
import searchData from './data/search';
import tableData from './data/table';
import { web_alterationApply_getByList } from '../api/';

const {proxy } = getCurrentInstance() as any;

const addVisible = ref(false);
const type = ref('insert');
const currentRow = ref({});

const [
    {
        registerTable,
        registerSearch,
        registerForm
    },
    {
        getData,
        getTotalPagination,
        getCurrentPagination,
        setCurrentPagination,
        handleFormShow,
        getSearch,
        resetSearch,
        reset
    }
] = proxy.$useCrudTable(
{
    table: {
    api: web_alterationApply_getByList,
    columns: tableData.tableForm(),
    params: searchData.resetForm(),
    },
    search: {
        formData: searchData.searchForm(),
        params: searchData.resetForm(),
    },
    form: {
        title: formData.title,
        type: type,
        typeInfo: formData.typeInfo,
        formData: formData.formData,
        visible: addVisible,
        formState: currentRow,
        initData: searchData.resetForm(),
        width: '80%',
        height: '350px',
        name: 'test',
    },
}
);

```

**配置文件**

***form.ts***
```form.ts
const base = [

  {
    text: '人员名称',
    type: 'origin',
    name: 'name',
    span: 8,
    style: '',
    class: '',
    labelCol: { style: { width: '100px' } },
  }
  ]
  // 封装成Map格式
  const baseForm: Function = ((): Map =>
        new Map(base.map(item => [item.name, item]))
)

// 封装页面统一数据
export default {
  title: '申请管理',
  typeInfo: {
    insert: { api: web_alterationApply_insertOrUpdate, title: '新增页面' },
    update: { api: web_alterationApply_insertOrUpdate, title: '编辑页面' },
    show: { title: '查看页面' },
  },
  formData: [{ formList: baseForm,  title: '基础信息' }],
};



```

***table.ts***
```table.ts
const table = [
     {
        text: '名称',
        type: 'text',
        name: 'name',
        width: '120',
        style: '',
        class: '',
        $attrs: {sortable: false},
        labelCol: { style: { width: '130px' } },
    },
  ]
  // 封装成Map格式
 const tableForm: Function = (() =>
        new Map(table.map(item => [item.name, item]))
)

export default {
    tableForm
};


```

***search.ts***
```search.ts
const search = [
  {
  text: '名称',
    type: 'text',
    name: 'name',
    span: 5,
    style: 'min-width: 260px;',
    labelCol: {style: {width: '90px'}},
    class: '',
  },
  ]
  // 封装成Map格式
 const searchForm: Function = (() =>
        new Map(table.map(item => [item.name, item]))
)

// 查询参数
const   resetForm = (() => (
    { "limit":10,"page":1,  name: ''}
));

export default {
    tableForm,
    resetForm
};
```

***search table效果图***
![search image](/docs/public/img/img.png)

 
***form效果图***
![search image](/docs/public/img/img_1.png)

 




## 更多

github ： [antdv-crud](https://github.com/chendimao/antdv-crud)
官网 ： [antdv-crud](http://chendimao.com:8888)

。有问题联系qq：122803265
