// 用户管理
import {h} from 'vue';
import { web_alterationApply_insertOrUpdate,GetDiagnosis, web_alterationApply_getByList, web_archivesManagement_getManagement_details } from '../../api/index';
import http from '../../util/http';
import {getOptionList, valueToName} from "../../../package/utils";
import {web_archivesManagement_getByGb25, web_archivesManagement_getByGb147} from '../../api/index';
import {showDate, testSlot, testValidate, validateEndTime, validateStartTime} from "./fun";
import {inputFormModel} from "../../../package/model";
const searchForm = [
  { text: '单位名称', name: 'unitName', type: 'text' },
  // {text: '电话', name: 'phone', type: 'text' },
  // {text: '', type: 'default', name: 'category', value: 1}
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


// 列表显示的字段

// 新增时显示字段

const base: inputFormModel[] = [


  {
    text: '职称',
    type: 'text',
    name: 'describe',
    span: 12,
    show: true,
    value: '',
    disabled: (data, form, type) => {
      console.log(data, form, type);
      return false;
    },
    labelCol: { style: { width: '300px' } },
    wrapperCol: {  },
    rules:[
      { required: true, message: '请输入姓名'},
      {  validator: testValidate, trigger: 'blur'}
    ],

    class: '',
  },
  {
    text: '申请时间',
    type: 'date',
    name: 'startTime',
    span: 12,
    value: '',
    style: '',
    class: '',
    rules:[
      { validator: validateStartTime, trigger: 'blur',},
    ],
    labelCol: { style: { width: '130px' } },
  },{
    text: '结束时间',
    type: 'date',
    name: 'endTime',
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
    text: 'tree select',
    type: 'treeSelect',
    name: 'treetest',
    span: 24,
    value: '',
    style: '',
    class: '',
     option: treeOption,
   $attrs: {
     treeNodeFilterProp: 'title'
   },
    computedFun: [
      {type: 'function', fun: (formState, Data, inputItem, value, type, otherData ) => {
          console.log(otherData);
        }}
    ],
    labelCol: { style: { width: '130px' } },
  }, {
    text: '  select',
    type: 'select',
    name: 'select',
    span: 24,
    value: '',
    style: '',
    class: '',
     option: stateList,
    computedFun: [
      {type: 'function', fun: (formState, Data, inputItem, value, type, otherData ) => {
          console.log(otherData);
        }}
    ],
    rules:[
      { required: true, message: '请输入select'},
      {  validator: testSlot, trigger: 'blur'}
    ],
    labelCol: { style: { width: '130px' } },
  },
  {
    text: '字典选择',
    type: 'dict',
    name: 'dmmc',
    api: GetDiagnosis,
    params: {"page":1,"rows":30,"limit":30,"code":1},
    span: 24,
    value: '',
    style: '',
    class: '',
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
    text: 'test',
    type: 'slot',
    name: 'testSlot',
    span: 24,
    value: '',
    style: '',
    class: '',
    labelCol: { style: { width: '130px' } },
    rules:[
      { required: true, message: '请输入slot'},
      {  validator: testSlot, trigger: 'blur'}
    ],
  },
  {text: '退休资料上传',
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
    labelCol: {style: {width: '130px'}},
    width: '120px', class: '',   },
  {
    type: 'p',
    name: 'limit',
    value: 123
  }


];



const baseForm: Function = ((): Map =>
        new Map(base.map(item => [item.name, item]))
)


// 封装页面统一数据
export default {
  typeInfo: {
    insert: { api: web_alterationApply_insertOrUpdate, title: '新增退休申请' },
    update: { api: web_alterationApply_insertOrUpdate, title: '编辑退休申请' },
    check: { api: web_alterationApply_insertOrUpdate, title: '审核退休申请' },
    show: { title: '查看退休申请' },
  },

  formData: base,
};
