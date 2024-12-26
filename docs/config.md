---
outline: deep
---

### 配置文件参数说明，配置优先级：通用组件默认配置 < 全局配置 < 业务组件独立配置

#### 一、全局配置
```js
 在main.ts文件中 设置全局配置，示例：
import antdCrud from 'antdv-crud';
import 'antdv-crud/dist/style.css';

antdCrud.config(app, {
    tableConfig: {
        pageSizeField: 'size',
        pageField: 'page',
        pagination: {
            isPagination: true,
            pageSizeField: 'size',
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            showQuickJumper: true,
            showSizeChanger: true,
        },
        isToolBox: true,
        toolBox: {
            showType: 'button',
            showExport: false,
        },
        },
    formConfig: {FooterCancelText: '退出', FooterSubmitText: '确定', },
    searchConfig: {searchText: '搜索', resetText: '重载234'},
    inputConfig: {showSearch: true, allowClear: true}
});

app.use(antdCrud);

```
#### 1.tableConfig（表格）配置 
| 参数        | 描述                    | 类型      | 默认值                                                            |
|-----------|-----------------------|---------|----------------------------------------------------------------|
| pagination   | 分页配置                  | object  | isPagination: true, pageSizeField: 'limit',pageField: 'page' |
| pageField | 页数字段                  | string  | page                                                           |
| pageSizeField | 每页数量字段                | string  | limit                                                          |
| isToolBox | 是否显示Table工具栏          | boolean | false       |
| toolBox | Table工具栏配置，具体配置见下方配置表 | object  |        |


<font size=2>pagination（分页）配置， 其余分页配置参考antdv组件a-pagination文档</font>

| 参数        | 描述     | 类型      | 默认值   |
|-----------|--------|---------|-----------|
| isPagination    | 是否显示分页 | boolean | true  |
| pageField | 页数字段   | string |    page  |
| pageSizeField | 每页数量字段 | string |  limit |



<font size=2>toolBox（工具栏）配置， 其余工具栏配置参考vxeTable组件vxe-toolbar文档</font>

| 参数        | 描述                    | 类型      | 默认值    |
|-----------|-----------------------|---------|--------|
| showType    | 展示类型，默认为按钮，空字符串则为图标类型 | string  | button |
| showExport | 是否显示导出按钮              | boolean | true   |
| showPrint | 是否显示打印按钮              | boolean | true   |
| showRefresh | 是否显示刷新按钮              | boolean | true   |
| showSetting | 是否显示设置按钮              | boolean | true   | 




#### 2.formConfig（form表单）配置

| 参数           | 描述                                                                                    | 类型      | 默认值                    |
|--------------|---------------------------------------------------------------------------------------|---------|------------------------|
| modalType    | form表单展示类型，默认为modal，使用a-modal组件展示表单，可选值：drawer：a-drawer组件展示表单、form：直接在当前组件的位置展示form表单 | string  | modal                  |
| drawerConfig | modalType为drawer时配置项， 详细配置参考antd的a-drawer组件                                           | string  | page                   |
| width        | 表单宽度                                                                                  | string  | 100%                   |
| height       | 表单高度，modalType为modal默认为calc(100vh-210px)，drawer为100%                                  | string  | calc(100vh-210px)、100% |
 


#### 3.searchConfig（搜索）配置

| 参数         | 描述                    | 类型      | 默认值   |
|------------|-----------------------|---------|-------|
| showSearch | 是否显示搜索按钮              | boolean | true  |
| showReset  | 是否显示重置按钮              | boolean  | true  |
| searchText | 搜索按钮文字                | string  | 搜索    |
| resetText  | 重置按钮文字                | string  | 重置    | 



#### 3.inputConfig（input组件）配置

| 参数         | 描述            | 类型      | 默认值   |
|------------|---------------|---------|-------|
| showSearch | 是否可以搜索        | boolean | false |
| allowClear  | 是否显示清除按钮      | boolean  | false |
| isTrim | 是否清除input左右空格 | string  | false |


### 二、业务组件中的配置
#### 调用antdCrud.useCrudTable方法，传入初始化参数，会返回一个数组，数组中有两个对象， 第一个对象有3个注册方法：registerTable、registerSearch、registerForm，分别传给a-crud-search、a-crud-table、a-crud-form组件的register事件，第二个对象有多个操作组件的方法，具体方法名称和使用方式参考下面文档。

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
import antdCrud from 'antdv-crud';

const type = ref('insert');

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
] = antdCrud.useCrudTable(
{
    table: {
    api: web_alterationApply_getByList,
    columns: tableData.tableForm(),
    params: searchData.resetForm(),
    },
    search: {
        formData: searchData.searchForm(),
    },
    form: {
        title: formData.title,
        type: type,
        typeInfo: formData.typeInfo,
        formData: formData.formData,
        width: '80%',
        height: '350px',
        name: 'test',
    },
}
);

```
#### antdCrud.useCrudTable中传入一个对象，这个对象有三个参数，分别对应a-crud-search、a-crud-table、a-crud-form组件的配置，具体配置如下：
#### 1. table（表格组件）配置（全局配置中的配置在这里都可以使用）
| 参数            | 描述                                                                                                                                                                                                                                                                       | 类型       | 默认值   |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-------|
| api           | 获取表格数据的接口                                                                                                                                                                                                                                                                | function | -     |
| columns       | 表格列配置，具体配置方式查看下方文档                                                                                                                                                                                                                                                       | array    | -     |
| params        | 搜索参数，可以不传，如果有使用a-crud-search搜索组件则默认使用搜索组件的参数                                                                                                                                                                                                                             | object   | -     |
| pagination    | 分页配置，具体参数参考全局配置                                                                                                                                                                                                                                                          | object   |       |
| pageField     | 页数字段                                                                                                                                                                                                                                                                     | string   | page  |
| pageSizeField | 每页数量字段                                                                                                                                                                                                                                                                   | string   | limit |
| isToolBox     | 是否显示Table工具栏                                                                                                                                                                                                                                                             | boolean  | false |
| toolBox       | Table工具栏配置，具体配置参考全局配置                                                                                                                                                                                                                                                    | object   |       |
| isMenu        | 是否显示操作列                                                                                                                                                                                                                                                                  | boolean  | true  |
| menuWidth     | 操作列宽度                                                                                                                                                                                                                                                                    | boolean  | true  |
| isView        | 是否显示默认查看按钮                                                                                                                                                                                                                                                               | boolean  | false |
| viewIcon      | 查看按钮ICON组件，可以传入antdv的icon组件                                                                                                                                                                                                                                              | function |     EyeOutlined  |
| viewText      | 查看按钮文本                                                                                                                                                                                                                                                                   | string   | 查看    |
| isEdit        | 是否显示默认编辑按钮                                                                                                                                                                                                                                                               | boolean  | false |
| editIcon      | 编辑按钮ICON组件，可以传入antdv的icon组件                                                                                                                                                                                                                                              | function |    EditOutlined   |
| editText      | 编辑按钮文本                                                                                                                                                                                                                                                                   | string   | 编辑    |
| immediate     | 首次是否调用查询接口                                                                                                                                                                                                                                                               | boolean  | true  |
| $attrs        | 该对象通过v-bind的方式将配置全部传入vxe-table组件，关于vxe-table的属性和方法都可以传入这个对象里面                                                                                                                                                                                                            | object   |       |
| mockData        | 还没有后端接口的时候可以通过该参数传入模拟数据                                                                                                                                                                                                                                                  | object   |       |
| beforeCallback   | 调用查询接口前调用的钩子函数，接收1个参数，为组件的配置，可以在请求接口之前修改组件的配置                                                                                                                                                                                                                            | object   |       |
| dataCallback   | 调用查询接口后处理返回结果的函数，接收2个参数，参数1为接口请求的返回结果，参数2为total，如果不使用该方法，则自动处理下面字段：res.data/res.total或者res.data.content/res.data.total或者res.data.data.content/res.data.data.total或者res.data.data/res.data.total或者res.data.list/res.data.total，如果返回结果没有这些字段，则默认返回结果为total = 0; data = []; | object   |       |

#### table中的作用域插槽（slot）
<span style="font-size: 15px; color: red;">default: 操作列的自定义插槽，可以添加自定义按钮，接收参数为当前行row，示例：</span>
```vue
<a-crud-table @register="registerTable">
  <template #default="{ row }">
    <a-button type="link" @click="handleFormShow('show', row)">查看</a-button>
  </template>
</a-crud-table> 
```
![操作列slot](/public/img/table_slot_seq.png)

<span style="font-size: 15px; color: red;">buttons: 左上角的操作按钮，示例：</span>
```vue
<a-crud-table @register="registerTable">
  <template #buttons>
    <a-button type="link" @click="handleFormShow('insert')">新增</a-button>
  </template>
</a-crud-table> 
```
![操作按钮slot](/public/img/table_slot_buttons.png)


<span style="font-size: 15px; color: red;">当columns中配置项type为slot时使用，可以自定义列的内容，示例：比如当配置项type为slot , name为 bz</span>
```vue
<a-crud-table @register="registerTable">
  <template #bz="{ row }">
    {{ row.bz==0?'启用':'停用'}}
  </template>
</a-crud-table> 
```
![字段slot](/public/img/table_slot_col.png)
![字段slot](/public/img/table_slot_col_code.png)


#### 2. search（搜索组件）配置（全局配置中的配置在这里都可以使用）
| 参数            | 描述                                                                                         | 类型      | 默认值   |
|---------------|--------------------------------------------------------------------------------------------|---------|-------|
| formData           | 搜索表单配置项，具体配置查看下方文档                                                                         | Function | -     |
| isTable       | 是否跟table组件关联使用，如果不为false，搜索会调用table组件的api进行请求，如果为false则会emit search事件，会接收params参数，自行处理搜索逻辑 | Array   | -     |
| dataCallback        | 搜索结果回调函数，自行处理搜索结果                                                                          | Object  | -     |
| showSearch    | 是否显示搜索按钮                                                                                   | object  | |
| searchText    | 搜索按钮显示文本                                                                                   | object  | |
| showReset    | 是否显示重置按钮                                                                                   | object  | |
| resetText    | 重置按钮显示文本                                                                                   | object  | |

#### search中的作用域插槽（slot）
<span style="font-size: 15px; color: red;">插槽内容添加在搜索组件表单后面</span>
```vue
<a-crud-search ref="searchRef" @register="registerSearch">
  <a-button>测试</a-button>
</a-crud-search>

```
![搜索slot](/public/img/search_slot.png)

#### search中的事件（event）
<span style="font-size: 15px; color: red;">如果search配置中的isTable为false，则搜索按钮会调用 search事件， 重置按钮会调用reset事件，自行处理搜索和重置逻辑</span>
```vue
<a-crud-search 
    ref="searchRef"
    @register="registerSearch"
    @search="handleSearch"
    @reset="handleReset"
>
</a-crud-search>

```




#### 3. form（表单组件）配置（全局配置中的配置在这里都可以使用）
| 参数             | 描述                                                                                    | 类型       | 默认值                    |
|----------------|---------------------------------------------------------------------------------------|----------|------------------------|
| title          | 表单弹窗标题                                                                                | function | -                      |
| type           | 表单操作类型，show、insert、update、check                                                       | array    | -                      |
| typeInfo       | 不同表单操作类型，不同的参数，比如不同的标题和不同的请求接口，具体配置参考下方文档                                             | object   | -                      |
| isTable       | 是否和table组件关联                                                                          | boolean  | true                   |
| formData       | 表单配置项参数，具体配置参考下方文档                                                                    | object   |                        |
| modalType    | form表单展示类型，默认为modal，使用a-modal组件展示表单，可选值：drawer：a-drawer组件展示表单、form：直接在当前组件的位置展示form表单 | string   | modal                  |
| drawerConfig | modalType为drawer时配置项， 详细配置参考antd的a-drawer组件                                           | string   | page                   |
| width        | 表单宽度                                                                                  | string   | 100%                   |
| height       | 表单高度，modalType为modal默认为calc(100vh-210px)，drawer为100%                                  | string   | calc(100vh-210px)、100% |
| name           | 名称                                                                                    | string   |                        |
| footerPosition           | 底部按钮位置                                                                                | string   | right                  |
| FooterCancelText           | 底部退出按钮文字                                                                              | string   | 取消                     |
| FooterSubmitText           | 底部提交按钮文字                                                                              | string   | 确定                     |
| requestCallback           | 自定义请求方法，替换默认的请求，接收2个参数，第1个参数为请求api，第2个为请求参数                                           | object   |                        |
| dataCallback           | 接口请求后的回调函数，自定义处理返回结果                                                                  | object   |                        |


#### form中的作用域插槽（slot）
<span style="font-size: 15px; color: red;">default: footer的自定义插槽，可以添加自定义按钮，接收参数为formState、loading 、type，示例：</span>
```vue
<a-crud-form @register="registerForm">
  <template #default="{ formState, loading, type }">
    <a-button type="link" @click="handleCancel(formState)">取消</a-button>
    <a-button type="link" @click="handleSubmit(formState)">保存</a-button>
  </template>
</a-crud-form> 
```
![操作列slot](/public/img/form_slot_footer.png)


<span style="font-size: 15px; color: red;">当columns中配置项type为slot时使用，可以自定义列的内容，示例：比如当配置项type为slot , name为 bz</span>
```vue
<a-crud-form @register="registerForm">
  <template #bz="{ data }">
    <a-switch v-model:checked="data.bz" />
  </template>
</a-crud-form> 
``` 

### 三、搜索组件和form表单组件中表单项 和 table表格组件中列的配置项
#### 1. 搜索组件和form表单组件中表单项使用相同的配置参数，formData参数
```vue
search: {formData: searchData.searchForm()}, // searchData为search.ts文件中返回的函数
form: {formData: formData.searchForm()}, // formData为form.ts文件中返回的函数
```
<div>searchData.searchForm()为一个函数，formData.searchForm()也一样，函数内部将配置项数组转换为一个Map对象方便后面使用</div>

```vue
const searchForm: Function = ((): Map => {
         return new Map(search.map(item => [item.name, item]))
    }
)
```
<div>配置项参数说明：</div>

| 参数                | 描述                                                                                                                                                                                      | 类型     | 默认值                    |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|------------------------|
| text              | 字段显示名称                                                                                                                                                                                  | string | -                      |
| type              | 组件类型，可选值'text'/ 'textarea' / 'date' / 'select' / 'cascader' / 'null' / 'checkbox' / 'datetime' / 'time' / 'year' / 'month' / 'upload' / 'switch' / 'origin' / 'list' / 'diyStyle' / 'h' | string | -                      |
| name              | 字段name                                                                                                                                                                                  | string | -                      |
| span              | 显示比例                                                                                                                                                                                    | string | -                      |
| style             | style样式                                                                                                                                                                                 | string | -                      |
| class             | class样式                                                                                                                                                                                 | string | -                      |
| labelCol          | label间距，配置参数参考antdv的a-form-item                                                                                                                                                         | string | -                      |
| wrapperCol        | input间距，配置参数参考antdv的a-form-item                                                                                                                                                         | string | -                      |
| allowClear        | 是否可清除                                                                                                                                                                                   | string | -                      |
| option            | type为select时 下拉列表                                                                                                                                                                       | string | -                      |
| value             | 默认值                                                                                                                                                                                     | number | object | []                                                                                                                                                       | string | -                      |
| width             | 表单宽度                                                                                                                                                                                    | number | object | []                                                                                                                                                       | string | -                      |
| multiple          | type为select时 是否多选                                                                                                                                                                       | number | object | []                                                                                                                                                       | string | -                      |
| showSearch        | 是否可搜索                                                                                                                                                                                   | number | object | []                                                                                                                                                       | string | -                      |
| unCheckedValue    | type为switch 禁用字段value                                                                                                                                                                   | number | object | []                                                                                                                                                       | string | -                      |
| checkedValue      | type为switch 启用字段value                                                                                                                                                                   | number | object | []                                                                                                                                                       | string | -                      |
| checkedChildren   | type为switch 启用字段                                                                                                                                                                        | number | object | []                                                                                                                                                       | string | -                      |
| unCheckedChildren | type为switch 禁用字段                                                                                                                                                                        | number | object | []                                                                                                                                                       | string | -                      |
| uploadField       | type为upload时 参数： url,changeCallback,initCallback，具体配置参考下面文档                                                                                                                                        | number | object | []                                                                                                                                                       | string | -                      |
| computedFun       | 自定义操作，是一个数组，可接收多条自定义操作，具体配置参考下面文档                                                                                                                                                       | number | object | []                                                                                                                                                       | string | -                      |
| dynamicParams     | 接口请求的动态传参，接收当前表单的value值集合，根据其他项的value更改参数                                                                                                                                               | number | object | []                                                                                                                                                       | string | -                      |
| afterSpan         | 表单项前面的空白处，值为a-col里面的span                                                                                                                                                                | number | object | []                                                                                                                                                       | string | -                      |
| afterText         | 表单项前面的空白处显示的文本                                                                                                                                                                          | number | object | []                                                                                                                                                       | string | -                      |
| picker            | option为date时type类型，可选值 'week' / 'month'  / 'year'                                                                                                                                       | number | object | []                                                                                                                                                       | string | -                      |
| show              | 是否显示当前表单项                                                                                                                                                                               | number | object | []                                                                                                                                                       | string | -                      |
| disabled          | 是否禁用当前表单项                                                                                                                                                                               | number | object | []                                                                                                                                                       | string | -                      |
| rows              | type为textarea时 行数                                                                                                                                                                       | number | object | []                                                                                                                                                       | string | -                      |
| placeholder       | 占位符                                                                                                                                                                                     | number | object | []                                                                                                                                                       | string | -                      |
| accept            | type为upload时 接受上传的文件类型                                                                                                                                                                  | number | object | []                                                                                                                                                       | string | -                      |
| rules             | 校验规则数组，与antdv的a-form配置参数一致，自定义校验配置参考下面文档                                                                                                                                                | number | object | []                                                                                                                                                       | string | -                      |
| h                 | type为h， 自定义h函数                                                                                                                                                                          | number | object | []                                                                                                                                                       | string | -                      |
| $attrs            | 接收组件的原生配置参数，具体参数参考antdv的表单组件，注意传事件需要在前面加on，比如change事件为onChange: (ev) => ev                                                                                                              | number | object | []                                                                                                                                                       | string | -                      |
 
#### 其他参数说明
<div style="color: red">option参数，key为name和value字段，示例：</div>

```vue
export const stateArr = [
  { name: '启用', value: '1' },
  { name: '禁用', value: '0' },
]; 
```

<div style="color: red">computedFun参数说明，type可以为option和function，option可以设置当前option为远程获取的数据，api为请求接口，dynamicParams接口请求的动态传参,params为请求参数，relationField为将返回的数据字段哪个字段设置为name和value，示例：</div>

```vue
  computedFun: [
       {
         type: 'option',
         api: web_tcmSyndromeMining_getTcmSyndromePageList,
         params: {limit: 10, page: 1},
        dynamicParams: (formState) => {}
          relationField: { value: 'dicCoding', name: 'dicName' },
       },
     ],
```
<div style="color: red">computedFun参数说明，type为function，参数fun，可以接受多个参数，formState：可以修改当前表单项的值集合，Data：全部表单项配置，inputItem：当前表单项，value:当前表单项的值，type：当前表单集合的type（insert、update、show、check），otherData：当表单项的type为dict时，会获取到额外的参数， 示例：</div>

```vue
 computedFun: [
    {type: 'function', fun: (formState, Data, inputItem, value, type, otherData ) => {
        console.log(otherData);
        }}
    ],
```
<div style="color: red">uploadField参数说明，type为upload时 参数： url,changeCallback,initCallback， 示例：</div>

```vue
 {
        text: '退休资料上传',
        type: 'upload',
        name: 'filePath',
        value: [],
        $attrs: {
        beforeUpload: (file) => {
            console.log(file);
            }
         },
        uploadField: {
        url: 'http://ywgl.tongchealth.com/basic-api/web/archivesManagement/uploadPic',
        changeCallback: (formState, item, value) => {
            console.log(value);
            if (value.file.status == 'done') {
             formState.value.filePath.push({name: value.file.response.data.name, url: value.file.response.data.url});
            } else  {
                formState.value.filePath = formState.value.filePath.filter(item => item.name != value.file.name);
            }
        },
        initCallback: (formState): { name: string, url: string}[] => {
            if (formState.filePath?.length > 0) {
                return   [{name: formState.filePath, url: formState.filePath}];
                } else {
            return [{name: 'test', url: 'test'}];
            }
        
        },
maxCount: 5,
},
```
<div style="color: red">rules参数说明，校验规则数组，与antdv的a-form配置参数一致，自定义校验配置validator接收一个函数，函数接收的参数中包含当前表单配置data.cardForm和ref data.refs，通过这2个可以控制校验结果 示例自定义校验配置：</div>

```vue
 rules: [
    {
     required: true,
     message: '请选择专科编码',
    },
    { 
     validator: ({cardForm, refs}) => {},
     trigger: 'blur' },
],
```

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
