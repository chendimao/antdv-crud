# 表单项类型

Antdv-Crud 支持多种表单项类型，每种类型都有其特定的配置选项。

## 基础类型

### text - 文本输入框

```typescript
{
  type: 'text',
  name: 'username',
  text: '用户名',
  placeholder: '请输入用户名',
  allowClear: true,
  showSearch: false,
  rules: [{ required: true, message: '请输入用户名' }]
}
```

### textarea - 多行文本

```typescript
{
  type: 'textarea',
  name: 'description',
  text: '描述',
  rows: 4,
  placeholder: '请输入描述信息',
  maxLength: 500
}
```

### number - 数字输入框

```typescript
{
  type: 'number',
  name: 'age',
  text: '年龄',
  min: 0,
  max: 150,
  step: 1,
  precision: 0
}
```

## 选择类型

### select - 下拉选择

```typescript
{
  type: 'select',
  name: 'status',
  text: '状态',
  option: [
    { value: '1', name: '启用' },
    { value: '0', name: '禁用' }
  ],
  multiple: false,
  showSearch: true,
  allowClear: true,
  placeholder: '请选择状态'
}
```

### treeSelect - 树形选择

```typescript
{
  type: 'treeSelect',
  name: 'department',
  text: '部门',
  option: [
    {
      value: '1',
      name: '技术部',
      children: [
        { value: '1-1', name: '前端组' },
        { value: '1-2', name: '后端组' }
      ]
    }
  ],
  treeCheckable: true,
  showSearch: true
}
```

### cascader - 级联选择

```typescript
{
  type: 'cascader',
  name: 'region',
  text: '地区',
  option: [
    {
      value: 'beijing',
      name: '北京',
      children: [
        {
          value: 'haidian',
          name: '海淀区',
          children: [
            { value: 'zhongguancun', name: '中关村' }
          ]
        }
      ]
    }
  ],
  expandTrigger: 'hover'
}
```

### radio - 单选框

```typescript
{
  type: 'radio',
  name: 'gender',
  text: '性别',
  option: [
    { value: 'male', name: '男' },
    { value: 'female', name: '女' }
  ],
  optionType: 'button', // 或默认样式
  vertical: false
}
```

### checkbox - 多选框

```typescript
{
  type: 'checkbox',
  name: 'hobbies',
  text: '爱好',
  option: [
    { value: 'reading', name: '阅读' },
    { value: 'music', name: '音乐' },
    { value: 'sports', name: '运动' }
  ]
}
```

## 日期时间类型

### date - 日期选择

```typescript
{
  type: 'date',
  name: 'birthday',
  text: '生日',
  format: 'YYYY-MM-DD',
  placeholder: '请选择生日'
}
```

### datetime - 日期时间

```typescript
{
  type: 'datetime',
  name: 'createTime',
  text: '创建时间',
  format: 'YYYY-MM-DD HH:mm:ss',
  showTime: true
}
```

### time - 时间选择

```typescript
{
  type: 'time',
  name: 'workTime',
  text: '工作时间',
  format: 'HH:mm:ss'
}
```

### year - 年份选择

```typescript
{
  type: 'year',
  name: 'graduateYear',
  text: '毕业年份',
  format: 'YYYY'
}
```

### month - 月份选择

```typescript
{
  type: 'month',
  name: 'startMonth',
  text: '开始月份',
  format: 'YYYY-MM'
}
```

### daterange - 日期范围

```typescript
{
  type: 'daterange',
  name: 'dateRange',
  text: '日期范围',
  format: 'YYYY-MM-DD',
  ranges: {
    '最近一周': [moment().subtract(7, 'days'), moment()],
    '最近一个月': [moment().subtract(1, 'month'), moment()]
  }
}
```

## 特殊类型

### switch - 开关

```typescript
{
  type: 'switch',
  name: 'enabled',
  text: '是否启用',
  checkedValue: '1',
  unCheckedValue: '0',
  checkedChildren: '启用',
  unCheckedChildren: '禁用'
}
```

### upload - 文件上传

```typescript
{
  type: 'upload',
  name: 'avatar',
  text: '头像',
  url: '/api/upload',
  accept: 'image/*',
  maxCount: 1,
  listType: 'picture-card',
  uploadField: {
    url: '/api/upload',
    maxCount: 1,
    changeCallback: (fileList) => console.log(fileList),
    initCallback: (formState) => formState.avatar,
    uploadCallback: (file) => console.log(file)
  }
}
```

### rate - 评分

```typescript
{
  type: 'rate',
  name: 'rating',
  text: '评分',
  count: 5,
  allowHalf: true,
  character: '★'
}
```

### slider - 滑块

```typescript
{
  type: 'slider',
  name: 'progress',
  text: '进度',
  min: 0,
  max: 100,
  step: 1,
  marks: {
    0: '0%',
    50: '50%',
    100: '100%'
  }
}
```

### colorPicker - 颜色选择器

```typescript
{
  type: 'colorPicker',
  name: 'themeColor',
  text: '主题色',
  defaultValue: '#1890ff',
  showText: true
}
```

## 展示类型

### origin - 原始值显示

```typescript
{
  type: 'origin',
  name: 'id',
  text: 'ID'
}
```

### slot - 自定义插槽

```typescript
{
  type: 'slot',
  name: 'customField',
  text: '自定义字段'
}
```

### h - 自定义渲染函数

```typescript
{
  type: 'h',
  name: 'customRender',
  text: '自定义渲染',
  h: (h, formState, formData) => {
    return h('div', { class: 'custom-component' }, '自定义内容')
  }
}
```

### p - 段落文本

```typescript
{
  type: 'p',
  name: 'description',
  text: '说明文字',
  style: 'color: #666; font-size: 12px;'
}
```

### seq - 序号

```typescript
{
  type: 'seq',
  name: 'index',
  text: '序号',
  start: 1,
  step: 1
}
```

## 数据类型

### dict - 字典数据

```typescript
{
  type: 'dict',
  name: 'userType',
  text: '用户类型',
  api: getUserTypes,
  params: { category: 'user' },
  valueField: 'value',
  labelField: 'name',
  multiple: false,
  showSearch: true
}
```

### table - 表格数据

```typescript
{
  type: 'table',
  name: 'selectedItems',
  text: '选择项目',
  columns: [
    { title: '名称', dataIndex: 'name' },
    { title: '数量', dataIndex: 'quantity' }
  ],
  dataSource: [],
  pagination: { pageSize: 10 }
}
```

### transfer - 穿梭框

```typescript
{
  type: 'transfer',
  name: 'permissions',
  text: '权限分配',
  dataSource: [
    { key: '1', title: '用户管理' },
    { key: '2', title: '角色管理' }
  ],
  titles: ['可选权限', '已选权限']
}
```

## 通用属性

所有表单项类型都支持以下通用属性：

```typescript
interface inputFormModel {
  type: string;           // 类型
  name?: string;          // 字段名
  text?: string;          // 显示文本
  span?: number;          // 栅格宽度 (1-24)
  offset?: number;        // 栅格偏移
  style?: string;         // 内联样式
  class?: string;         // CSS 类名
  labelCol?: ColModel;    // 标签布局
  wrapperCol?: ColModel;  // 输入框布局
  rules?: object[];       // 验证规则
  value?: any;            // 默认值
  width?: string | number; // 宽度
  placeholder?: string;   // 占位符
  show?: boolean | Function; // 是否显示
  disabled?: boolean | Function; // 是否禁用
  css?: string;           // 自定义CSS
  cssId?: string;         // CSS ID
  $attrs?: object;        // 原生属性
}
```

## 布局属性

### ColModel

```typescript
interface ColModel {
  style?: object;    // 样式对象
  class?: string;    // CSS 类名
  span?: number;     // 栅格宽度
}
```

## 验证规则

```typescript
const rules = [
  { required: true, message: '此项为必填项' },
  { min: 2, max: 10, message: '长度在 2 到 10 个字符' },
  { pattern: /^[a-zA-Z]+$/, message: '只能输入字母' },
  { validator: (rule, value) => {
    if (value < 0) {
      return Promise.reject('不能为负数')
    }
    return Promise.resolve()
  }}
]
```

## 动态参数

```typescript
{
  type: 'select',
  name: 'city',
  text: '城市',
  api: getCities,
  dynamicParams: (formState) => ({
    province: formState.province
  })
}
```

## 计算函数

```typescript
{
  type: 'select',
  name: 'options',
  text: '选项',
  computedFun: [
    {
      type: 'option',
      api: getOptions,
      params: { type: 'user' },
      field: { label: 'name', value: 'value' },
      immediate: true
    }
  ]
}
``` 