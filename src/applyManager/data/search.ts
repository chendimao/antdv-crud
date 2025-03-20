import {h} from 'vue';
import {testDate, testFun} from "./fun";

// 查询表单
const search = [
  // {text: '科室名称', type: 'select', name: 'applyKs', allowClear: true, span: 5, computedFun: [{type: 'option',  api: 'getByGb25', relationField: ['name/dmmc', 'value/dm'] , request: 'get'}],option:[],  style: 'min-width: 260px;', labelCol: {style: {width: '90px'}}, class: '',     },

  {
    text: '主题名称',
    type: 'select',
    name: 'subjectName',
    option: [{name: 'a1', value: 1}, {name: 'a2', value: 2}, {name: 'a3', value: 3}],
    span: 6,
    $attrs: {
      onChange: (data) => {
          console.log(data);
          
      }
    },
    style: 'width: 660px',
    labelCol: { style: { width: '90px' } },
    wrapperCol: { style: { width: '200px' } },
    class: '',
  },
  {
    text: '主题名称2',
    type: 'radio',
    name: 'subjectName2',
    span: 10,
    option: [
      {name: '选项1', value: 0},
        {name: '选项2', value: 2},
        {name: '选项3', value: 3}

    ],
    value: 0,
    $attrs: {buttonStyle:"solid"},
    optionType: 'button',
    style: 'width: 560px;',
    labelCol: { style: { width: '90px' } },
    wrapperCol: { style: { width: '200px' } },
    class: '',
  },
  {
    text: '主题名称3',
    type: 'daterange',
    name: 'subjectName3',
    span: 10,

    value: [],
    $attrs: {buttonStyle:"solid"},
    optionType: 'button',
    style: 'width: 560px;',
    labelCol: { style: { width: '90px' } },
    wrapperCol: { style: { width: '200px' } },
    class: '',
  },

  {name: 'page', value: 1},
  {name: 'size', value: 10},
  {name: 'userId', value: 2,},

  // {text: '时间', type: 'date', name: 'dates', span:5,  style: 'min-width: 360px;', labelCol: {style: {width: '90px'}}, class: '',    },
];

 
// 封装页面统一数据
export default search




