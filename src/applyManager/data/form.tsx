// 用户管理
import {h} from 'vue';
import { web_alterationApply_insertOrUpdate, web_alterationApply_getByList, web_archivesManagement_getManagement_details } from '../../api/index';
import http from '../../util/http';
import {getOptionList, valueToName} from "../../../package/utils";
import {web_archivesManagement_getByGb25, web_archivesManagement_getByGb147} from '../../api/index';
import dayjs from 'dayjs';
import {showDate, testValidate} from "./fun";
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
  { name: '待提交', value: '0' },
  { name: '科室主任待审核', value: '1' },
  { name: '科室主任已通过/医务处待审核', value: '3' },
  { name: '科室主任未通过', value: '2' },
  { name: '医务处未通过', value: '5' },
  { name: '医务处已通过', value: '4' },
  { name: '医务处主任待审核', value: '6' },
  { name: '医务处主任审核通过', value: '7' },
  { name: '医务处主任审核未通过', value: '8' },
];

const setUpload = (values, value) => {
  console.log(values, value);
};
const getState = (row) => {
  let label = stateList.find(item => item.value == row.state)?.name
  if (row.state == 4) {
    return { text: label, style: { color: 'green' } }
  } else if (row.state == 5) {
    return { text: label, style: { color: 'red' } }
  } else if (row.state == 7) {
    return { text: label, style: { color: 'green' } }
  } else if (row.state == 8) {
    return { text: label, style: { color: 'red' } }
  } else {
    return { text: label, style: {} };
  }
}
// 列表显示的字段

// 新增时显示字段

const base: inputFormModel[] = [


  {
    text: '职称',
    type: 'text',
    name: 'name',
    span: 24,
    labelCol: { style: { width: '100px' } },
    rules:[
      { required: true, message: '请输入姓名'},
      {  validator: testValidate, trigger: 'change'}
    ],
    computedFun: [
      {type: 'function', fun: showDate , immediate: true},
    ],
    class: '',
  },
  {
    text: '申请时间',
    type: 'text',
    name: 'time',
    span: 24,
    style: '',
    class: '',
    rules:[
      { required: true, message: '请输入姓名234234', trigger: 'blur'},
    ],
    labelCol: { style: { width: '130px' } },
  },
  {text: '退休资料上传',
    type: 'upload',
    name: 'picList',
    value: [],
    uploadField: {
      url: 'http://ywgl.tongchealth.com/basic-api/web/archivesManagement/uploadPic',
    type: 'string',
      field: {name: 'pathname', url: 'path'},
      maxCount: 1,
    },
    labelCol: {style: {width: '130px'}},
    width: '120px', class: '',   },
];

const resetForm = () => ({
  name: '',
  time: '',
  tablelist: []
});

const baseForm: Function = ((): Map =>
        new Map(base.map(item => [item.name, item]))
)


// 封装页面统一数据
export default {
  title: '退休申请管理',
  typeInfo: {
    insert: { api: web_alterationApply_insertOrUpdate, title: '新增退休申请' },
    update: { api: web_alterationApply_insertOrUpdate, title: '编辑退休申请' },
    show: { title: '查看退休申请' },
  },

  formData: [{ formList: baseForm,  title: '' }],
  resetForm,
};
