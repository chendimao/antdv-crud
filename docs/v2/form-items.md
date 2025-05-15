# 表单项类型

Antdv-Crud 支持多种表单项类型，可以满足各种表单场景的需求。

## 基础输入

### 文本输入框 (text)

```js
{
  type: 'text',
  label: '单位名称',
  placeholder: '请输入单位名称',
  rules: [{ required: true, message: '请输入单位名称' }]
}
```

### 数字输入框 (number)

```js
{
  type: 'number',
  label: '数量',
  min: 0,
  max: 100,
  rules: [{ required: true, message: '请输入数量' }]
}
```

### 文本域 (textarea)

```js
{
  type: 'textarea',
  label: '备注',
  rows: 4,
  maxLength: 200,
  showCount: true
}
```

## 选择器

### 下拉选择框 (select)

```js
{
  type: 'select',
  label: '状态',
  options: [
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 }
  ],
  rules: [{ required: true, message: '请选择状态' }]
}
```

### 远程下拉选择框 (select-remote)

```js
{
  type: 'select-remote',
  label: '部门',
  api: '/api/departments',
  rules: [{ required: true, message: '请选择部门' }]
}
```

### 单选按钮组 (radio)

```js
{
  type: 'radio',
  label: '性别',
  options: [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' }
  ],
  rules: [{ required: true, message: '请选择性别' }]
}
```

### 多选框组 (checkbox)

```js
{
  type: 'checkbox',
  label: '爱好',
  options: [
    { label: '阅读', value: 'reading' },
    { label: '音乐', value: 'music' },
    { label: '运动', value: 'sports' }
  ]
}
```

## 日期时间

### 日期选择器 (date)

```js
{
  type: 'date',
  label: '日期',
  format: 'YYYY-MM-DD',
  rules: [{ required: true, message: '请选择日期' }]
}
```

### 日期范围选择器 (date-range)

```js
{
  type: 'date-range',
  label: '日期范围',
  format: 'YYYY-MM-DD',
  rules: [{ required: true, message: '请选择日期范围' }]
}
```

### 时间选择器 (time)

```js
{
  type: 'time',
  label: '时间',
  format: 'HH:mm:ss',
  rules: [{ required: true, message: '请选择时间' }]
}
```

## 高级组件

### 树形选择器 (tree-select)

```js
{
  type: 'tree-select',
  label: '部门',
  api: '/api/departments/tree',
  rules: [{ required: true, message: '请选择部门' }]
}
```

### 文件上传 (upload)

```js
{
  type: 'upload',
  label: '附件',
  api: '/api/upload',
  maxCount: 5,
  accept: '.jpg,.png,.pdf',
  rules: [{ required: true, message: '请上传附件' }]
}
```

### 可编辑表格 (editable-table)

```js
{
  type: 'editable-table',
  label: '明细',
  columns: [
    {
      title: '商品名称',
      dataIndex: 'name',
      rules: [{ required: true, message: '请输入商品名称' }]
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      type: 'number',
      rules: [{ required: true, message: '请输入数量' }]
    }
  ]
}
```

## 通用属性

所有表单项类型都支持以下通用属性：

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| type | string | - | 表单项类型 |
| label | string | - | 标签文本 |
| name | string | - | 字段名 |
| rules | array | [] | 验证规则 |
| disabled | boolean | false | 是否禁用 |
| hidden | boolean | false | 是否隐藏 |
| defaultValue | any | - | 默认值 |
| placeholder | string | - | 占位文本 |
| help | string | - | 帮助文本 |
| extra | string | - | 额外提示文本 |
| style | object | - | 样式对象 |
| class | string | - | 类名 |

## 验证规则

表单项支持以下验证规则：

```js
{
  rules: [
    { required: true, message: '此项必填' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符' },
    { pattern: /^[a-zA-Z]+$/, message: '只能包含英文字母' },
    { validator: (rule, value) => {
      if (value !== 'admin') {
        return Promise.reject('用户名必须是 admin')
      }
      return Promise.resolve()
    }}
  ]
}
``` 