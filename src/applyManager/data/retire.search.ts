import {h} from 'vue';
import {testFun} from "./fun";
// 查询表单
const search = [
  {text: '单位名称',
    type: 'text',
    name: 'szksName',
    span: 5,
    style: 'min-width: 260px;',
    labelCol: {style: {width: '90px'}},
    class: '',
    initFun: testFun,


  },
  {text: '单位名称2',
    type: 'select',
    name: 'szksName2',
    span: 5,
    $attrs: {showSearch: true},
    option: [
      {name: '选项1', value: '1'},
      {name: '选项2', value: '2'},
      {name: '选项3', value: '3'},
    ],
    style: 'min-width: 260px;',
    labelCol: {style: {width: '90px'}},
    class: '',


  }, {text: '日期',
    type: 'daterange',
    name: 'date',
    span: 8,
    picker: "month",
    labelCol: {style: {width: '90px'}},
    class: '',


  },
];






// 查询表单验证
const validateForm =  (() => (
    {
      // 'name':  [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
    }
))

// 表单数据初始化
const   resetForm = (() => (
    {
  professionalTitlesName: 'test',
  szksName: '',
  limit: 10,
  page: 1,
  totalResult: 0
}
));

const searchForm: Function = ((): Map =>
  new Map(search.map(item => [item.name, item]))
);


// 封装页面统一数据
export default {
  searchForm,
  resetForm,
  validateForm
}




