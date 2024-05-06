import {h} from 'vue';
import {testFun} from "./fun";
// 查询表单
const search = [
  {text: '单位名称',
    type: 'text',
    name: 'applicationDept',
    span: 5,
    style: 'min-width: 260px;',
    labelCol: {style: {width: '90px'}},
    computedFun: [
      {type: 'function', fun: testFun, immediate: true}
    ],
    class: '',


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







// 表单数据初始化
const   resetForm = (() => (
    {"applicationDept":"","limit":10,"page":1,"roleid":3,"states":"", name: '', beginTime: ''}
));

const searchForm: Function = ((): Map =>
  new Map(search.map(item => [item.name, item]))
);


// 封装页面统一数据
export default {
  searchForm,
  resetForm
}




