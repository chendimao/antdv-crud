import {h} from 'vue';
import {testDate, testFun} from "./fun";
import dayjs from "dayjs";
// 查询表单
const search = [
  {text: '单位名称',
    type: 'text',
    name: 'applicationDept',
    span: 5,
    style: 'min-width: 260px;',
    labelCol: {style: {width: '90px'}},
    value: '1',
    computedFun: [
      {type: 'function', fun: testFun, immediate: true}
    ],
    class: '',


  },
  {text: '单位名称2',
    type: 'select',
    name: 'szksName2',
    span: 5,
    value: '2',
    $attrs: {showSearch: true},
    option: [
      {name: '选项1', value: '1'},
      {name: '选项2', value: '2'},
      {name: '选项3', value: '3'},
    ],
    style: 'min-width: 260px;',
    labelCol: {style: {width: '90px'}},
    class: '',


  },
  {text: '单位名称radio',
    type: 'radio',
    name: 'szksName3',
    span: 5,
    value: '3',
    option: [
      {name: '选项1', value: '1'},
      {name: '选项2', value: '2'},
      {name: '选项3', value: '3'},
    ],
    style: 'min-width: 260px;',
    labelCol: {style: {width: '90px'}},
    class: '',


  },
  {text: '日期',
    type: 'daterange',
    name: 'date',
    span: 8,
    value: ['2024-01', '2024-02'],
    picker: "month",
    labelCol: {style: {width: '90px'}},
    class: '',
    computedFun: [
      {type: 'function', fun: testDate}
    ]

  },
  {name: 'limitaaa', value: 10}
];


const searchForm: Function = ((): Map =>
        new Map(search.map(item => [item.name, item]))
)


// 封装页面统一数据
export default {
  searchForm
}




