## antdv-crud
## 基于 ant-design-vue vxe-table封装的crud组件

### 安装

`npm install antdv-crud -D`

main.js中引入
```
import antdCrud from 'antdv-crud';
import 'antdv-crud/dist/style.css'；
app.use(antdCrud);
```



### 基础页面三个公共组件

#### 搜索组件

```
<a-crud-table
ref="tableRef"
:form-data="tableFormData"
:api="web_alterationApply_getByList"
:formState="searchQuery"
/>
```
 

主要参数：

searchForm：表单定义

formValidate：字段输入校验

resetForm：初始化重置数据

form\-state：双向绑定数据

具体格式参考record\.search\.ts

#### 列表页面
```
<a-crud-table
ref="tableRef"
:form-data="tableFormData"
:api="web_alterationApply_getByList"
:formState="searchQuery"
 />
 ```

主要参数：

formData：表单定义

formState：双向绑定数据

resetForm：初始化数据

Api：列表数据接口

列表的一些复杂字段处理：

1\.本地字典：

一些固定的字典写死在前端，统一写在option/index\.ts里面

Type设置为select，option设置为本地的字典数组

2\.后端接口读取的字典：

Type设置为select，option设置格式：await getOptionList\('web\_archivesManagement\_getByGb25', \{ limit: 1000, page: 1 \}, \[ 'dmmc', 'dm', \]\)

getOptionList方法在function/index\.ts下面

1. 字段需要自定义样式或者自定义事件的，比如不同状态设置不同字体颜色，或者点击字段有弹窗操作的，将type设置为h，通过h方法对字段进行自定义操作，具体例子在医务管理项目的recordManagement/data文件夹下面的record\.data\.ts中tableForm的state字段

Data参数为当前行数据，that为当前table元素，

判断状态改颜色

h: \(data, that\) => \{

      return h\('span', \{

        style: \{color: data\.state == 0 ? 'gray' : data\.state == 1 ? 'dodgerblue' : 'red','cursor': 'pointer'\},

        innerHTML:  valueToName\(ryStateList, data\.state, 'value', 'name'\),

    \},
 

弹窗须自定义一个组件

h: \(data, that\) => \{

      return h\('span', \{

        onClick: \(\) => \{

          const testDialog =  markRaw\(defineAsyncComponent\(\(\) => import\('\.\./component/testDialog\.vue'\)\)\) ;

           const myel = render\(h\(testDialog, \{formState: data, visible: true,  \['onUpdate:visible'\]: \(v\) => \{

               console\.log\(v, 96\);

             \}, \['onUpdate:formState'\]: \(v\) => \{

               console\.log\(v, 97\);

             \}\}\), that\.$el\);

        \}

      \}\)\},

#### 新增查看编辑页面
```
<a-crud-form
v-if="currentPage"
v-model:add-visible="addVisible"
:row="currentRow"
:type="type"
width="80%"
height="350px"
:name="'bmgl'"
@refreshList="getData"
:currentPageData="currentPage"
/>
```
主要参数：

add\-visible控制弹窗显示隐藏

Type 弹窗类型 insert 新增  update 编辑 show 查看

Row 当前行数据，如果是insert 则是data\.ts里面的resetForm数据

changeData 整个data\.ts的数据

一些复杂的字段：

1\.Type为select，需要充后端读取字典列表的，computedFun中type为option， api参数对应的function/index\.ts文件中定义的接口

computedFun: \[

      \{ type: 'option', api: 'web\_archivesManagement\_getByGb25', relationField: \['dmmc', 'dm'\] \},

\],

Select字段更改触发函数操作：fun接收两个参数，一个formState，为当前行数据，一个item，整个base配置数据。

computedFun: \[

      \{ type: ‘function’, fun: myFunction \},

\],

1. Type为upload，url字段填写文件上传接口，uploadField字段配置上传信息，其中type为string，说明后端通过字符串形式存储上传链接，通过field字段中name和url字段匹配后端字段。type为list，则说明后端是通过数组形式储存上传链接。Params参数定义上传参数

通过initFun字段，设置页面初始化时需要触发的一些函数

如果有一些其他自定义的页面需要包含在新增页面中，通过tableCom字段引入。

详细字段使用说明在model/index\.ts文件


#### 其他组件

1. 列表中统一格式的按钮用commonBtn组件

