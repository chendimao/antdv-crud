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
   
  {
    type: 'p',
    name: 'limit',
    value: 123
  }


];


 


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
