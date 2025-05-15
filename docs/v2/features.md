# 特殊功能

Antdv-Crud 提供了一些特殊功能，可以帮助你实现更复杂的业务需求。

## 远程数据加载

### 远程下拉选择

```js
{
  type: 'select-remote',
  label: '部门',
  api: '/api/departments',
  params: {
    status: 1
  },
  transform: (response) => {
    return response.data.map(item => ({
      label: item.name,
      value: item.id
    }))
  }
}
```

### 远程树形选择

```js
{
  type: 'tree-select-remote',
  label: '部门',
  api: '/api/departments/tree',
  transform: (response) => {
    return response.data.map(item => ({
      title: item.name,
      value: item.id,
      children: item.children
    }))
  }
}
```

## 表单联动

### 条件显示

```js
{
  type: 'text',
  label: '其他原因',
  hidden: (formData) => formData.reason !== 'other'
}
```

### 条件禁用

```js
{
  type: 'select',
  label: '子分类',
  options: [
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 }
  ],
  disabled: (formData) => !formData.category
}
```

### 动态选项

```js
{
  type: 'select',
  label: '城市',
  options: (formData) => {
    const cityMap = {
      'beijing': [
        { label: '朝阳区', value: 'chaoyang' },
        { label: '海淀区', value: 'haidian' }
      ],
      'shanghai': [
        { label: '浦东新区', value: 'pudong' },
        { label: '黄浦区', value: 'huangpu' }
      ]
    }
    return cityMap[formData.province] || []
  }
}
```

## 自定义验证

### 异步验证

```js
{
  type: 'text',
  label: '用户名',
  rules: [
    { required: true, message: '请输入用户名' },
    { validator: async (rule, value) => {
      const response = await fetch(`/api/check-username?username=${value}`)
      const { available } = await response.json()
      if (!available) {
        throw new Error('用户名已存在')
      }
    }}
  ]
}
```

### 关联验证

```js
{
  type: 'password',
  label: '密码',
  rules: [{ required: true, message: '请输入密码' }]
},
{
  type: 'password',
  label: '确认密码',
  rules: [
    { required: true, message: '请确认密码' },
    { validator: (rule, value, formData) => {
      if (value !== formData.password) {
        throw new Error('两次输入的密码不一致')
      }
    }}
  ]
}
```

## 自定义渲染

### 自定义表单项

```js
{
  type: 'custom',
  label: '自定义组件',
  component: 'my-custom-component',
  props: {
    // 传递给自定义组件的属性
    customProp: 'value'
  },
  events: {
    // 自定义组件的事件处理
    'custom-event': (value) => {
      console.log('自定义事件：', value)
    }
  }
}
```

### 自定义表格列

```js
{
  title: '状态',
  dataIndex: 'status',
  customRender: ({ text, record }) => {
    return h('div', {
      style: {
        color: text === 1 ? 'green' : 'red'
      }
    }, text === 1 ? '启用' : '禁用')
  }
}
```

## 数据转换

### 表单数据转换

```js
{
  type: 'date-range',
  label: '日期范围',
  transform: {
    // 提交时转换
    submit: (value) => ({
      startDate: value[0],
      endDate: value[1]
    }),
    // 初始化时转换
    init: (value) => [value.startDate, value.endDate]
  }
}
```

### 表格数据转换

```js
{
  title: '状态',
  dataIndex: 'status',
  transform: {
    // 显示时转换
    display: (value) => value === 1 ? '启用' : '禁用',
    // 提交时转换
    submit: (value) => value === '启用' ? 1 : 0
  }
}
```

## 文件上传

### 图片上传

```js
{
  type: 'upload',
  label: '图片',
  api: '/api/upload',
  accept: 'image/*',
  maxCount: 5,
  listType: 'picture-card',
  transform: {
    // 提交时转换
    submit: (fileList) => fileList.map(file => file.url),
    // 初始化时转换
    init: (urlList) => urlList.map(url => ({
      url,
      name: url.split('/').pop()
    }))
  }
}
```

### 文件上传

```js
{
  type: 'upload',
  label: '附件',
  api: '/api/upload',
  accept: '.doc,.docx,.pdf',
  maxCount: 3,
  beforeUpload: (file) => {
    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isLt10M) {
      message.error('文件大小不能超过 10MB!')
      return false
    }
    return true
  }
}
```

## 可编辑表格

### 基础用法

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
  ],
  minRows: 1,
  maxRows: 10
}
```

### 高级用法

```js
{
  type: 'editable-table',
  label: '明细',
  columns: [
    {
      title: '商品',
      dataIndex: 'productId',
      type: 'select-remote',
      api: '/api/products',
      rules: [{ required: true, message: '请选择商品' }]
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      type: 'number',
      rules: [{ required: true, message: '请输入数量' }]
    },
    {
      title: '单价',
      dataIndex: 'price',
      type: 'number',
      rules: [{ required: true, message: '请输入单价' }]
    },
    {
      title: '金额',
      dataIndex: 'amount',
      type: 'number',
      disabled: true,
      customRender: ({ record }) => {
        return record.quantity * record.price
      }
    }
  ],
  summary: (data) => {
    const total = data.reduce((sum, record) => {
      return sum + (record.quantity * record.price)
    }, 0)
    return `总计：${total} 元`
  }
}
``` 