# 核心组件

Antdv-Crud 提供了三个核心组件，用于快速构建 CRUD 功能。

## 搜索组件 (a-crud-search)

搜索组件用于构建查询表单，支持多种表单项类型。

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| searchProps | object | - | 搜索组件配置对象 |
| searchProps.formData | array | [] | 表单项配置数组 |
| searchProps.searchText | string | '查询' | 查询按钮文本 |
| searchProps.resetText | string | '重置' | 重置按钮文本 |
| searchProps.showSearch | boolean | true | 是否显示查询按钮 |
| searchProps.showReset | boolean | true | 是否显示重置按钮 |
| searchProps.params | object | {} | 搜索参数对象 |
| searchProps.tableMethods | object | - | 表格组件方法对象 |
| searchProps.labelCol | object | { span: 8 } | 标签列配置 |
| searchProps.wrapperCol | object | { span: 16 } | 内容列配置 |

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| search | (values: object) | 点击查询按钮时触发 |
| reset | (values: object) | 点击重置按钮时触发 |
| register | (methods: object, formRef: object) | 组件注册时触发，返回组件方法和表单引用 |

### 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| validateSearch | - | Promise | 验证搜索表单 |
| getSearchParams | - | object | 获取搜索参数 |
| setSearchParams | (params: object) | object | 设置搜索参数 |
| setSearchProps | (props: object) | - | 设置搜索组件配置 |
| mergeResetParams | (params: object) | object | 合并重置参数 |
| mergeSearchParams | (params: object) | object | 合并搜索参数 |
| setSearchPropsValue | (key: string, value: any) | - | 设置搜索组件配置值 |
| getSearchPropsValue | (key: string) | any | 获取搜索组件配置值 |
| setSearchDataValue | (key: string, value: any) | - | 设置表单项配置值 |
| getSearchDataValue | (key: string) | object | 获取表单项配置值 |
| getResetParams | - | object | 获取重置参数 |
| setSearchFormData | (columns: array) | - | 设置表单项配置 |
| resetSearch | - | - | 重置搜索表单 |

### 示例

```js
const searchProps = {
  formData: [
    {
      name: 'unitName',
      type: 'text',
      label: '单位名称',
      placeholder: '请输入单位名称'
    },
    {
      name: 'status',
      type: 'select',
      label: '状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  ],
  searchText: '查询',
  resetText: '重置',
  showSearch: true,
  showReset: true,
  params: {},
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}
```

## 表格组件 (a-crud-table)

表格组件用于展示数据列表，支持分页、排序、筛选等功能。

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| tableProps | object | - | 表格组件配置对象 |
| tableProps.columns | array | [] | 表格列配置数组 |
| tableProps.data | array | [] | 表格数据数组 |
| tableProps.loading | boolean | false | 加载状态 |
| tableProps.pagination | object | - | 分页配置 |
| tableProps.toolBox | object | - | 工具栏配置 |
| tableProps.isMenu | boolean | false | 是否使用菜单形式展示操作列 |
| tableProps.menuWidth | number | 120 | 操作列宽度 |
| tableProps.isView | boolean | true | 是否显示查看按钮 |
| tableProps.isEdit | boolean | true | 是否显示编辑按钮 |
| tableProps.viewText | string | '查看' | 查看按钮文本 |
| tableProps.editText | string | '编辑' | 编辑按钮文本 |
| tableProps.viewIcon | component | EyeOutlined | 查看按钮图标 |
| tableProps.editIcon | component | EditOutlined | 编辑按钮图标 |
| tableProps.slotType | string | 'default' | 插槽类型 |
| tableProps.isSortable | boolean | true | 是否启用排序 |

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| register | (methods: object) | 组件注册时触发，返回组件方法 |
| change | (data: object) | 表格数据变化时触发 |

### 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| getData | (params?: object) | Promise | 获取表格数据 |
| setTableParams | (params: object) | - | 设置表格参数 |
| setTableProps | (props: object) | - | 设置表格配置 |
| setTablePropsValue | (key: string, value: any) | - | 设置表格配置值 |
| getTablePropsValue | (key: string) | any | 获取表格配置值 |
| setTableDataValue | (key: string, value: any) | - | 设置表格数据值 |
| getTableDataValue | (key: string) | any | 获取表格数据值 |
| resetTable | - | - | 重置表格 |

### 示例

```js
const tableProps = {
  columns: [
    {
      name: 'unitName',
      text: '单位名称',
      type: 'text'
    },
    {
      name: 'status',
      text: '状态',
      type: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      name: 'action',
      text: '操作',
      type: 'slot',
      width: 200
    }
  ],
  data: [],
  loading: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  },
  toolBox: {
    show: true,
    showSearch: true,
    showExport: true,
    showPrint: true,
    showRefresh: true,
    showSetting: true
  },
  isMenu: true,
  menuWidth: 120,
  isView: true,
  isEdit: true,
  viewText: '查看',
  editText: '编辑',
  viewIcon: 'EyeOutlined',
  editIcon: 'EditOutlined',
  slotType: 'default',
  isSortable: true
}
```

## 表单组件 (a-crud-form)

表单组件用于新增和编辑数据，支持多种表单项类型和验证规则。

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| formProps | object | - | 表单组件配置对象 |
| formProps.formData | array | [] | 表单项配置数组 |
| formProps.visible | boolean | false | 是否可见 |
| formProps.type | string | 'insert' | 表单类型：insert/update/show/check |
| formProps.title | string | - | 表单标题 |
| formProps.width | string | '100%' | 表单宽度 |
| formProps.height | string | - | 表单高度 |
| formProps.mask | boolean | true | 是否显示遮罩 |
| formProps.menuPosition | string | 'footer' | 按钮位置：footer/extra |
| formProps.modalType | string | 'modal' | 弹窗类型：modal/drawer/form |
| formProps.footerPosition | string | 'right' | 按钮对齐方式 |
| formProps.FooterCancelText | string | '取消' | 取消按钮文本 |
| formProps.FooterSubmitText | string | '确定' | 确定按钮文本 |
| formProps.formState | object | {} | 表单数据对象 |
| formProps.css | object | - | 样式配置 |
| formProps.cssId | string | - | 样式ID |
| formProps.labelCol | object | { span: 8 } | 标签列配置 |
| formProps.wrapperCol | object | { span: 16 } | 内容列配置 |
| formProps.placement | string | 'right' | 抽屉位置：right/left/top/bottom |
| formProps.drawerConfig | object | - | 抽屉配置 |

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| register | (methods: object) | 组件注册时触发，返回组件方法 |
| formCancel | () | 点击取消按钮时触发 |
| formSubmit | (values: object) | 点击确定按钮时触发 |

### 方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| submit | - | Promise | 提交表单 |
| reset | - | - | 重置表单 |
| setFormProps | (props: object) | - | 设置表单配置 |
| setFormPropsValue | (key: string, value: any) | - | 设置表单配置值 |
| getFormPropsValue | (key: string) | any | 获取表单配置值 |
| setFormDataValue | (key: string, value: any) | - | 设置表单项配置值 |
| getFormDataValue | (key: string) | object | 获取表单项配置值 |
| setFormState | (state: object) | - | 设置表单数据 |
| getFormState | - | object | 获取表单数据 |

### 示例

```js
const formProps = {
  formData: [
    {
      name: 'unitName',
      type: 'text',
      label: '单位名称',
      rules: [{ required: true, message: '请输入单位名称' }]
    },
    {
      name: 'status',
      type: 'select',
      label: '状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ],
      rules: [{ required: true, message: '请选择状态' }]
    },
    {
      name: 'customSlot',
      type: 'slot',
      label: '自定义内容'
    }
  ],
  visible: false,
  type: 'insert',
  title: '新增',
  width: '800px',
  height: '600px',
  mask: true,
  menuPosition: 'footer',
  modalType: 'modal',
  footerPosition: 'right',
  FooterCancelText: '取消',
  FooterSubmitText: '确定',
  formState: {},
  css: {},
  cssId: 'myForm',
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
  placement: 'right',
  drawerConfig: {}
}
```  