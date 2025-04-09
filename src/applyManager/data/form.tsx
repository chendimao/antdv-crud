// 用户管理
import {h} from 'vue';
import { web_alterationApply_insertOrUpdate,GetDiagnosis, web_alterationApply_getByList, web_archivesManagement_getManagement_details } from '../../api/index';
import http from '../../util/http';
import {getOptionList, valueToName} from "../../../package/utils";
import {web_archivesManagement_getByGb25, web_archivesManagement_getByGb147} from '../../api/index';
import {showDate, testSlot, testValidate, validateEndTime, validateStartTime, validateYear} from "./fun";
import {inputFormModel} from "../../../package/model";
import {PlusCircleFilled, UserOutlined} from "@ant-design/icons-vue";
const searchForm = [
  { text: '单位名称', name: 'unitName', type: 'text',
     rules: [  
      { required: true, message: '请输入单位名称'},
    {  validator: testValidate, trigger: 'blur'}
  ], },
  // {text: '电话', name: 'phone', type: 'text' },
  // {text: '', type: 'default', name: 'category', value: 1}
];
const mentionOptions = [
  {
    value: 'afc163',
    label: 'afc163',
  },
  {
    value: 'zombieJ',
    label: 'zombieJ',
  },
  {
    value: 'yesmeck',
    label: 'yesmeck',
  },
];
const treeOption = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    pic: 'pic test',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
        pic: 'pic test2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    pic: 'pic test3',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
        pic: 'pic test4',
        disabled: true,
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
];

export const sexList = [
  { name: '男', value: '男' },
  { name: '女', value: '女' },
];

export const stateList = [
  { name: '待提交', value: '0' , type: 'type0'},
  { name: '科室主任待审核', value: '1' , type: 'type1'},
  { name: '科室主任已通过/医务处待审核', value: '3' , type: 'type3'},
  { name: '科室主任未通过', value: '2' },
  { name: '医务处未通过', value: '5' },
  { name: '医务处已通过', value: '4' },
  { name: '医务处主任待审核', value: '6' },
  { name: '医务处主任审核通过', value: '7' },
  { name: '医务处主任审核未通过', value: '8' },
];

export const autoCompleteList = [
  { value: '待提交',},
  { value: '科室主任待审核',},
  { value: '科室主任已通过/医务处待审核'},
  { value: '科室主任未通过',},
  { value: '医务处未通过',},
  { value: '医务处已通过',},
  { value: '医务处主任待审核',},
  { value: '医务处主任审核通过',},
  { value: '医务处主任审核未通过',},
];


// 列表显示的字段

// 新增时显示字段

const base: inputFormModel[] = [

  { text: '数字输入框', name: 'szsrk', type: 'number',
    span: 12,
    labelCol: { style: { width: '100px' } },
    rules: [  
     { required: true, message: '请输入单位名称'},
   {  validator: testValidate, trigger: 'blur'}
 ], 
 $attrs: {
  onInput: (...data) => {
    console.log(...data);
  },
  onChange:( item, formState, formData, value) => {
    console.log(item, formState, formData, value);
  }
 }
},
  {
    text: 'input输入框',
    type: 'text',
    name: 'srk',
    span: 12,
    show: true,
    value: '',
    disabled: (data, form, type) => {
      return false;
    },
    $attrs: {
      onMounted: (...data) => {
        console.log(data);
      },

    },
    labelCol: { style: { width: '100px' } },
    wrapperCol: {  },
    rules:[
      { required: true, message: '请输入姓名'},
      {  validator: testValidate, trigger: 'blur'}
    ],

    class: '',
  },
  {
    text: '提及',
    type: 'mention',
    name: 'mention',
    span: 12,
    show: true,
    value: '',
    disabled: (data, form, type) => {
      console.log(data, form, type);
      return false;
    },
    option: mentionOptions,
    labelCol: { style: { width: '100px' } },
    wrapperCol: {  },
    rules:[
      { required: true, message: '请输入search'},
      {  validator: testValidate, trigger: 'blur'}
    ],

    class: '',
  },
  {
    text: '下拉框',
    type: 'select',
    name: 'select',
    span: 12,
    value: '',
    style: '',
    class: '',
     option: stateList,
    computedFun: [
      {type: 'function', fun: (formState, Data, inputItem, value, type, otherData ) => {
          console.log(formState, otherData);
        }}
    ],
    rules:[
      { required: true, message: '请输入select'},
    ],
    labelCol: { style: { width: '100px' } },
  },
  {
    text: '  多选',
    type: 'checkbox',
    name: 'checkbox',
    span: 12,
    value: '',
    style: '',
    class: '',
     option: stateList,
    
    rules:[
      { required: true, message: '请输入select'},
    ],
    labelCol: { style: { width: '130px' } },
  }, {
    text: '单选',
    type: 'radio',
    name: 'radio',
    span: 12,
    value: '',
    style: '',
    class: '',
     option: stateList,
    
    rules:[
      { required: true, message: '请选择单选'},
      {  validator: testSlot, trigger: 'blur'}
    ],
    labelCol: { style: { width: '100px' } },
  },

  {
    text: '日期',
    type: 'date',
    name: 'date',
    span: 12,
    value: '',
    style: '',
    class: '',
    rules:[
      { validator: validateStartTime, trigger: 'blur',},
    ],
    labelCol: { style: { width: '130px' } },
  },{
    text: '年',
    type: 'year',
    name: 'year',
    span: 12,
    value: '',
    style: '',
    class: '',
    rules:[
      { validator: validateYear, trigger: 'blur',},
    ],
    labelCol: { style: { width: '130px' } },
  },{
    text: '月',
    type: 'month',
    name: 'month',
    span: 12,
    value: '2025-03',
    style: '',
    class: '',
    rules:[
      { validator: validateEndTime, trigger: 'blur',},
    ],
    labelCol: { style: { width: '130px' } },
  },{
    text: '时间范围',
    type: 'daterange',
    name: 'daterange',
    span: 12,
    value: [],
    style: '',
    class: '',
    rules:[
      { validator: validateEndTime, trigger: 'blur',},
    ],
    labelCol: { style: { width: '130px' } },
  },{
    text: '时间日期',
    type: 'datetime',
    name: 'datetime',
    span: 12,
    value: '',
    style: '',
    class: '',
    rules:[
      { validator: validateEndTime, trigger: 'blur',},
    ],
    labelCol: { style: { width: '130px' } },
  },{
    text: '时间',
    type: 'time',
    name: 'time',
    span: 12,
    value: '',
    style: '',
    class: '',
    rules:[
      { validator: validateEndTime, trigger: 'blur',},
    ],
    labelCol: { style: { width: '130px' } },
  },
  {
    text: '树形下拉选',
    type: 'treeSelect',
    name: 'treeselect',
    span: 12,
    value: [],
    style: '',
    class: '',
     option: treeOption,
     multiple: true,
     fieldNames: {
      label: 'title',
      value: 'value',
      children: 'children'
    },
    title: (...data) => {
      console.log(data);
      return h('div', {style: {color: 'red'}}, 'title test');
    },
   $attrs: {
     treeNodeFilterProp: 'title'
   },
    computedFun: [
      {type: 'function', fun: (formState, Data, inputItem, value, type, otherData ) => {
          console.log(otherData);
        }}
    ],
    labelCol: { style: { width: '130px' } },
  },
  {
    text: '字典选择',
    type: 'dict',
    name: 'dmmc',
    api: GetDiagnosis,
    params: {"page":1,"rows":30,"limit":30,"code":1},
    span: 12,
    value: '123555',
    style: '',
    class: '',
    searchField: 'dmmc',
    valueField: {dmmc: 'dmmc', dm: 'dm1'},
    tableField: [ {field: 'dmmc', title: '名称', width: 100}, {field: 'dm', title: '代码', width: 100}],
    labelCol: { style: { width: '130px' } },
    computedFun: [
      {type: 'function', fun: (formState, Data, inputItem, value, type, otherData ) => {
          console.log(otherData);
        }}
    ],
  },
  {
    text: '自动完成输入框',
    type: 'autoComplete',
    name: 'autoComplete',
    span: 12,
    value: '',
    style: '',
    class: '',
    option: [],
    $attrs: {
      onSearch: (...data) => {
        data[0].option = autoCompleteList.filter(item => item.value.includes(data[3]))
      }
    },
    $slots: {
      clearIcon: (...data) => {
        console.log(data);
        return (
            <UserOutlined/>
        )
      },
      placeholder: (...data) => {
        return 'test';
      }
    },

    rules:[
      { required: true, message: '请输入select'},
      {  validator: testSlot, trigger: 'blur'}
    ],
    labelCol: { style: { width: '100px' } },
  },
  {
    text: '头像',
    type: 'avatar',
    name: 'avatar',
    span: 4,
    size: 50,
    style: 'background: red;',
    value:"https://www.antdv.com/assets/logo.1ef800a8.svg",
    $slots: {
      icon: (...data) => {
        return (
            <div>
              test
            </div>
        )
      }
    },
    labelCol: { style: { width: '130px' } },

  }, {
    text: '徽标数',
    type: 'badge',
    name: 'badge',
    span: 4,
    value: 20,
    dot: true,
    style: 'background: red;',
    $attrs: {
 numberStyle:  {
      backgroundColor: 'red',
          color: 'white',
          boxShadow: '0 0 0 1px #d9d9d9 inset',
      }
    },

    labelCol: { style: { width: '130px' } },

  },{
    text: '级联选择器',
    type: 'cascader',
    name: 'cascader',
    span: 12,
    value: '',
    option: treeOption,
    fieldNames: {label: 'title', value: 'value'},
    labelCol: { style: { width: '130px' } },

  },{
    text: '描述列表',
    type: 'descriptions',
    name: 'descriptions',
    span: 12,
    layout:"vertical",
    bordered: true,
    value: {cpmc: '蛋糕', cpsl: '20'},
    list: [
        {label: "产品名称", field: 'cpmc'},
      { label: "数量",
        field: 'cpsl' ,
        $slots: {
        label: (...data) => {
          return (<div style={{color: 'green'}}>这是slot label</div>);
        }
        }
      }
    ],
    $slots :{
      title: (...data) => {
        return (<div style={{color: 'red'}}>这是标题</div>);
      },
      extra: (...data) => {
        return (<div>这是描述列表的extra</div>);
      }
    },
    fieldNames: {label: 'title', value: 'value'},
    labelCol: { style: { width: '130px' } },

  },{
    text: '进度条',
    type: 'progress',
    name: 'progress',
    span: 12,
    value: 20,
    labelCol: { style: { width: '130px' } },

  },{
    text: '评分',
    type: 'rate',
    name: 'rate',
    span: 12,
    value: 20,
    labelCol: { style: { width: '130px' } },

  },{
    text: '滑动条',
    type: 'slider',
    name: 'slider',
    span: 12,
    value: 20,
    $attrs: {
      onChange: (...data) => {
        console.log(data);
      }
    },
    labelCol: { style: { width: '130px' } },

  },{
    text: '统计数值',
    type: 'statistic',
    name: 'statistic',
    span: 12,
    value: 20,
     title: 'tset 统计数值',
    labelCol: { style: { width: '130px' } },

  },
  {
    text: '可编辑表格',
    type: 'table',
    name: 'table',
    isForm: true,

    columns: [
        {
      text: '下拉选',
      type: 'select',
      name: 'zkbm',
      option: [
        {name:"选项1", value: '1'},
        {name:"选项2", value: '2'},
        {name:"选项3", value: '3'},
        {name:"选项4", value: '4'},
      ],
      $attrs: { minWidth: '200px', showOverflow: true,   editRender: {} },
    }, {
      text: '多选',
      type: 'formCheckbox',
      name: 'checkbox',
        split: '，',
      option: [
        {name:"选项1", value: '1'},
        {name:"选项2", value: '2'},
        {name:"选项3", value: '3'},
        {name:"选项4", value: '4'},
      ],
      $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
    },{
      text: '单选',
      type: 'formRadio',
      name: 'radio',
        split: '，',
      option: [
        {name:"选项1", value: '1'},
        {name:"选项2", value: '2'},
        {name:"选项3", value: '3'},
        {name:"选项4", value: '4'},
      ],
      $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
    },

      {
        text: '文字输入',
        type: 'text',
        name: 'bmbm',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },
      {
        text: 'switch',
        type: 'switch',
        name: 'switch',
        openLabel: '启用',
        closeLabel: '禁用',
        openValue: '1',
        closeValue: '0',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },

      {
        text: 'rate',
        type: 'rate',
        name: 'rate',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },
      {
        text: 'slider',
        type: 'slider',
        name: 'slider',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },
      {
        text: 'textarea',
        type: 'textarea',
        name: 'textarea',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },
      {
        text: '病名名称',
        type: 'text',
        name: 'ysmc',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },{
        text: '日期',
        type: 'date',
        name: 'date',
        $attrs: { minWidth: '100px', showOverflow: true , editRender: {} },
        $formAttrs: {
          clearable: true,
          labelFormat: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          onChange: (...data) => {
            console.log(data);
          },
          onDateToday: (...data) => {
            console.log(data);
          }
        },
      },{
        text: '文件上传',
        type: 'upload',
        name: 'upload',

        $attrs: { minWidth: '200px', height: '200px',  showOverflow: true , editRender: {} },
        $formAttrs: {
          uploadMethod: (e) => {
            console.log(e);
          },
          downloadMethod: (e) => {
            console.log(e);
          },
          onChange: (...data) => {
            console.log(data);
          },
        },
      },
      {
        text: 'table插槽',
        type: 'slot',
        name: 'testSlot3',
        $attrs: { minWidth: '200px', },

      },
      {
        text: '操作',
        type: 'slot',
        name: 'opera',
        $attrs: { minWidth: '200px', },

      },
      ],
    value: [
      {

        "zkbm": "",
        "bmbm": "BA00.Y",
        "zhbm": "B04.02.01.04.02.01",
        "ysbm": "Z01",
        "ysmc": "头痛",
        "checkbox": ['1','2', 3],
        "date": "2025-04-03",
        'switch': '1',
        'radio': '1',
        'rate': '1',
        'slider': '12',
        'textarea': 'textarea1',
        'upload': [
          { name: 'fj577.jpg', url: 'https://vxeui.com/resource/img/fj577.jpg' },
          { name: 'fj581.jpeg', url: 'https://vxeui.com/resource/img/fj581.jpeg' }
        ],
      },{

        "zkbm": "2",
        "bmbm": "BA00.Y",
        "zhbm": "B04.02.01.04.02.01",
        "ysbm": "Z01",
        "ysmc": "头痛",
        "checkbox": ['1','2', 3],
        "date": "2025-04-03",
        'switch': '1',
        'radio': '1',
        'rate': '2',
        'slider': '22',
        'textarea': 'textarea2',
        'upload': [
          { name: 'fj577.jpg', url: 'https://vxeui.com/resource/img/fj577.jpg' },
          { name: 'fj581.jpeg', url: 'https://vxeui.com/resource/img/fj581.jpeg' }
        ],
      },{

        "zkbm": "",
        "bmbm": "BA00.Y",
        "zhbm": "B04.02.01.04.02.01",
        "ysbm": "Z01",
        "ysmc": "头痛",
        "checkbox": ['3','2', 4],
        "date": "2025-04-03",
        'switch': '0',
        'radio': '2',
        'rate': '3',
        'slider': '33',
        'textarea': 'textarea',
        'upload': [
          { name: 'fj577.jpg', url: 'https://vxeui.com/resource/img/fj577.jpg' },
          { name: 'fj581.jpeg', url: 'https://vxeui.com/resource/img/fj581.jpeg' }
        ],
      },
    ],
   $attrs: {
     beforeEditMethod: (...e) => {
       console.log(e);
       return true;
     },
     editRules: {
       "zkbm": [
         { required: true, message: '请选择质控编码' },
       ],
     },
     editConfig: { trigger: 'click', mode: 'cell'},
     validConfig: {
       msgMode: 'full'
     },
   },
    // $slots: {
    //   testSlot: (...data) => {
    //     console.log('zheshi   table slot ')
    //     return (<div>这是table slot测试</div>);
    //   }
    // },
    span: 24,
    labelCol: { style: { width: '130px' } },

  },
  {
    text: '可编辑表格2',
    type: 'table',
    name: 'table2',
    isForm: true,

    columns: [
        {
      text: '下拉选',
      type: 'select',
      name: 'zkbm',
      option: [
        {name:"选项1", value: '1'},
        {name:"选项2", value: '2'},
        {name:"选项3", value: '3'},
        {name:"选项4", value: '4'},
      ],
      $attrs: { minWidth: '200px', showOverflow: true,   editRender: {} },
    }, {
      text: '多选',
      type: 'formCheckbox',
      name: 'checkbox',
        split: '，',
      option: [
        {name:"选项1", value: '1'},
        {name:"选项2", value: '2'},
        {name:"选项3", value: '3'},
        {name:"选项4", value: '4'},
      ],
      $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
    },{
      text: '单选',
      type: 'formRadio',
      name: 'radio',
        split: '，',
      option: [
        {name:"选项1", value: '1'},
        {name:"选项2", value: '2'},
        {name:"选项3", value: '3'},
        {name:"选项4", value: '4'},
      ],
      $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
    },

      {
        text: '文字输入',
        type: 'text',
        name: 'bmbm',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },
      {
        text: 'switch',
        type: 'switch',
        name: 'switch',
        openLabel: '启用',
        closeLabel: '禁用',
        openValue: '1',
        closeValue: '0',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },

      {
        text: 'rate',
        type: 'rate',
        name: 'rate',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },
      {
        text: 'slider',
        type: 'slider',
        name: 'slider',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },
      {
        text: 'textarea',
        type: 'textarea',
        name: 'textarea',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },
      {
        text: '病名名称',
        type: 'text',
        name: 'ysmc',
        $attrs: { minWidth: '100px', showOverflow: true,   editRender: {} },
      },{
        text: '日期',
        type: 'date',
        name: 'date',
        $attrs: { minWidth: '100px', showOverflow: true , editRender: {} },
        $formAttrs: {
          clearable: true,
          labelFormat: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          onChange: (...data) => {
            console.log(data);
          },
          onDateToday: (...data) => {
            console.log(data);
          }
        },
      },{
        text: '文件上传',
        type: 'upload',
        name: 'upload',

        $attrs: { minWidth: '200px', height: '200px',  showOverflow: true , editRender: {} },
        $formAttrs: {
          uploadMethod: (e) => {
            console.log(e);
          },
          downloadMethod: (e) => {
            console.log(e);
          },
          onChange: (...data) => {
            console.log(data);
          },
        },
      },
      {
        text: 'table插槽',
        type: 'slot',
        name: 'testSlot3',
        $attrs: { minWidth: '200px', },

      },
      {
        text: '操作',
        type: 'slot',
        name: 'opera',
        $attrs: { minWidth: '200px', },

      },
      ],
    value: [
      {

        "zkbm": "",
        "bmbm": "BA00.Y",
        "zhbm": "B04.02.01.04.02.01",
        "ysbm": "Z01",
        "ysmc": "头痛",
        "checkbox": ['1','2', 3],
        "date": "2025-04-03",
        'switch': '1',
        'radio': '1',
        'rate': '1',
        'slider': '12',
        'textarea': 'textarea1',
        'upload': [
          { name: 'fj577.jpg', url: 'https://vxeui.com/resource/img/fj577.jpg' },
          { name: 'fj581.jpeg', url: 'https://vxeui.com/resource/img/fj581.jpeg' }
        ],
      },{

        "zkbm": "2",
        "bmbm": "BA00.Y",
        "zhbm": "B04.02.01.04.02.01",
        "ysbm": "Z01",
        "ysmc": "头痛",
        "checkbox": ['1','2', 3],
        "date": "2025-04-03",
        'switch': '1',
        'radio': '1',
        'rate': '2',
        'slider': '22',
        'textarea': 'textarea2',
        'upload': [
          { name: 'fj577.jpg', url: 'https://vxeui.com/resource/img/fj577.jpg' },
          { name: 'fj581.jpeg', url: 'https://vxeui.com/resource/img/fj581.jpeg' }
        ],
      },
    ],
   $attrs: {
     beforeEditMethod: (...e) => {
       console.log(e);
       return true;
     },
     editRules: {
       "zkbm": [
         { required: true, message: '请选择质控编码' },
       ],
     },
     editConfig: { trigger: 'click', mode: 'cell'},
     validConfig: {
       msgMode: 'full'
     },
   },
    // $slots: {
    //   testSlot: (...data) => {
    //     console.log('zheshi   table slot ')
    //     return (<div>这是table slot测试</div>);
    //   }
    // },
    span: 24,
    labelCol: { style: { width: '130px' } },

  },
  {
    text: 'tabs',
    type: 'tabs',
    name: 'tabs',
    columns: [
      {
        title: '标题1', key: '1', children: [
          {
            text: '下拉框',
            type: 'select',
            name: 'select2',
            span: 6,
            value: '',
            style: '',
            class: '',
            option: stateList,
            computedFun: [
              {type: 'function', fun: (formState, Data, inputItem, value, type, otherData ) => {
                  console.log(formState, otherData);
                }}
            ],
            rules:[
              { required: true, message: '请输入select'},
              {  validator: testSlot, trigger: 'blur'}
            ],
            labelCol: { style: { width: '100px' } },
          },
        ]
      },{
        title: '标题2', key: '2', children: [
          {
            text: '统计数值',
            type: 'statistic',
            name: 'statistic',
            span: 12,
            value: 20,
            title: 'tset 统计数值',
            labelCol: { style: { width: '130px' } },

          },
        ]
      },{
        title: '标题3', key: '3', children: [
          {
            text: '滑动条',
            type: 'slider',
            name: 'slider',
            span: 12,
            value: 20,
            $attrs: {
              onChange: (...data) => {
                console.log(data);
              }
            },
            labelCol: { style: { width: '130px' } },

          }
        ]
      },
    ],
  },

  {
    text: '插槽',
    type: 'slot',
    name: 'testSlot',
    span: 12,
    value: '',
    style: '',
    class: '',
    labelCol: { style: { width: '130px' } },

  },
  {
    text: '插槽2',
    type: 'slot',
    name: 'testSlot2',
    span: 12,
    value: '',
    style: '',
    class: '',
    labelCol: { style: { width: '130px' } },

  },
  {text: '文件上传',
    type: 'upload',
    name: 'filePath',
    value: [],
    $attrs: {
      action: 'http://ywgl.tongchealth.com/basic-api/web/archivesManagement/uploadPic',
      
    beforeUpload: (file) => {
      console.log(file);
    },
    onChange: ( item, formState, formData, value) => {
      console.log(item,  value);
       if (value.file.status == 'done') {
         formState.filePath.push({name: value.file.response.data.name, url: value.file.response.data.url});
       } 
       console.log(formState)
    },
  },
    initFun: (formState) => {
      if (formState.filePath?.length > 0) {
        return   [{name: '', url: ''}];
      } else {
        return [{name: 'test', url: 'test'}];
      }

    },
    labelCol: {style: {width: '130px'}},
    width: '120px', class: '',   },
  {
    text: '日历',
    type: 'calendar',
    name: 'calendar',
    span: 12,
    value: '',
    fullscreen: false,
    labelCol: { style: { width: '130px' } },

  },
  {
    type: 'p',
    name: 'limit',
    value: 123
  }


];


 


// 封装页面统一数据
export default base;
