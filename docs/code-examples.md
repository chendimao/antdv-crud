---
outline: deep
---

### 配置文件参数说明

#### 三个配置文件通用的参数
***search.ts中的search， form.ts中的base， table.ts中的table， 类型都为inputFormModel[]***
```ts

interface ColModel {
        style?: object,
        class?: string,
        span?: number,
}
interface uploadFieldModel{
    type: string,
    field: object,
    params?: object
    maxCount?: string|number|undefined|null, // 上传最大数量
}

export interface tableFormModel{
         text: string,
        type: 'text' | 'select' | 'switch' | 'diy',
        name: string,
        style?: object,
        class?: object,
        width?: string,
        fun?: Function
}

declare type dynamicParamsModel = (T:Object) => Object;


export interface inputFormModel {
        text: string, // 字段显示名称
        type: 'text' | 'textarea' | 'date' | 'select' | 'cascader' | 'null' | 'checkbox' | 'datetime' | 'time' | 'year' | 'month' | 'upload' | 'switch' | 'origin' | 'list' | 'diyStyle' | 'h' ,
        name: string,  // 字段name
        span?: number,  // 显示比例
        style?: string,  // style样式
        class?: string,  // class样式
        labelCol?: ColModel,  // label间距
        wrapperCol?: ColModel,  // input间距
        allowClear?: boolean, // allowClear 是否可清除
        option?:  object[],  // type为select时 下拉列表
        value?: string | number | object | [],  // 默认值
        width?: string | number,
        multiple?: boolean, // type为select时 是否多选
        showSearch?:boolean, //  是否可搜索
        unCheckedValue?: string,  // type为switch 禁用字段value
        checkedValue?: string,  // type为switch 启用字段value
        checkedChildren?: string,// type为switch 启用字段
        unCheckedChildren?: string, // type为switch 禁用字段
        url?: string, // type为upload时 上传url
        computedFun?: computedFun[], // 自定义操作
        dynamicParams?: dynamicParamsModel,
        uploadField?: uploadFieldModel,
        afterSpan?: string,
        afterText?: string,
        $attrs?: object,// 表单原生属性
        picker?: 'week' | 'month' | 'year'
        show?: boolean, // 是否显示
        disabled?: boolean, // 是否禁用
        rows?: number, // type为textarea时 行数
        placeholder?: string, // 占位符
        accept?: string, // type为upload时 接受上传的文件类型
        slots?: object,
        h?: Function, //自定义h函数
}

//computedFun model
export interface computedFun {
    type: 'function' | 'option',
        api?: Function, // api字段，定义在function文件夹下面
        relationField?: string[], // 接口返回数组映射字段
        params?: object, // 接口请求携带参数
        fun?: Function, // type为function时的自定义方法
        paramsType?: 'query' | 'body', // 参数类型 query或者 body
        setField?: string, // 设置option后设置对应的value
        childrenField?: object, // 多级下拉框children字段和value字段
}


```
 
#### 其他参数

***search.ts***
``` md
search.ts中的resetForm为查询时的参数，是一个函数，返回一个对象
```

***form.ts***
``` js
export default {
// 弹窗默认标题
  title: '退休申请管理', 
  typeInfo: {
  // 新增时调用的接口和显示的标题
    insert: { api: web_alterationApply_insertOrUpdate, title: '新增退休申请' }, // 
    // 修改时调用的接口和显示的标题
    update: { api: web_alterationApply_insertOrUpdate, title: '编辑退休申请' },
    // 查看时调用的接口和显示的标题
    show: { title: '查看退休申请' },
  },
  // 表单数据 ，为什么是数组？会有多个不同段落的表单
  formData: [{ formList: baseForm,  title: '退休申请信息' }],
  // 可能会引入外部的自定义功能的组件
   detailComponent: markRaw(defineAsyncComponent(() => import('../component/detail.vue'))),
};
```

 


  
Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
