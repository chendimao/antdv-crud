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


// 列表显示的字段

// 新增时显示字段

const base: inputFormModel[] = [


  {
    text: '职称',
    type: 'text',
    name: 'describe',
    span: 24,
    show: true,
    value: '',
    disabled: (data, form, type) => {
      console.log(data, form, type);
      return false;
    },
    labelCol: { style: { width: '100px' } },
    rules:[
      { required: true, message: '请输入姓名'},
      {  validator: testValidate, trigger: 'change'}
    ],

    class: '',
  },
  {
    text: '申请时间',
    type: 'text',
    name: 'department',
    span: 24,
    value: '',
    style: '',
    class: '',
    rules:[
      { required: true, message: '请输入姓名234234', trigger: 'blur'},
    ],
    labelCol: { style: { width: '130px' } },
  }, {
    text: 'test',
    type: 'slot',
    name: 'testSlot',
    span: 24,
    value: '',
    style: '',
    class: '',

  },
  {text: '退休资料上传',
    type: 'upload',
    name: 'filePath',
    value: [],
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
  title: '退休申请管理',
  typeInfo: {
    insert: { api: web_alterationApply_insertOrUpdate, title: '新增退休申请' },
    update: { api: web_alterationApply_insertOrUpdate, title: '编辑退休申请' },
    show: { title: '查看退休申请' },
  },

  formData: [{ formList: baseForm,  title: '' }],
};
