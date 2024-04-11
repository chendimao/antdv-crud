// 用户管理
import {h} from 'vue';
import { web_alterationApply_insertOrUpdate, web_alterationApply_getByList, web_archivesManagement_getManagement_details } from '../../api/index';
import { inputFormModel } from '/@/model';
import http from '../../util/http';
import {valueToName} from "../../../package/utils";
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

const tableForm = [
  {
    text: '一卡通号',
    type: 'text',
    name: 'userId',
    width: '100',
    style: '',
    class: '',
    labelCol: { style: { width: '130px' } },
  },
  {
    text: '科室名称',
    type: 'h',
    width: '150',
    name: 'szksName',
    h: async (data, item) => {
      const colorArr = { 4: 'green', 5: 'red', 7: 'green', 8: 'red', }
      if (!item.option) {
        console.log(item.text, item.option);
        const res =  await http.post({url: '/web/archivesManagement/getByGb25', params: {}});
        item.option = res.data;
      }
      return h('span', { style: { color: colorArr[5] ?? '' }, innerHTML: valueToName(item.option, '001', 'dmmc', 'dmmc') })
    },
    labelCol: { style: { width: '130px' } },
    class: '',
  },
  {
    text: '人员名称',
    type: 'text',
    name: 'name',
    width: '120',
    style: '',
    class: '',
    labelCol: { style: { width: '130px' } },
  },
  {
    text: '性别',
    type: 'text',
    name: 'sex',
    option: sexList,
    width: '100',
    style: '',
    class: '',
    labelCol: { style: { width: '130px' } },
  },
  {
    text: '人员类别',
    type: 'text',
    name: 'personnelCategoryName',
    width: '120',
    labelCol: { style: { width: '130px' } },
    class: '',
  },
  {
    text: '职称',
    type: 'text',
    name: 'professionalTitlesName',

    width: '120',
    labelCol: { style: { width: '130px' } },
    class: '',
  },
  {
    text: '申请时间',
    type: 'text',
    name: 'createTime',
    width: '130',
    style: '',
    class: '',
    labelCol: { style: { width: '130px' } },
  },
  {
    text: '退休时间',
    type: 'text',
    name: 'beginTime',
    width: '130',
    style: '',
    class: '',
    labelCol: { style: { width: '130px' } },
  },
  // {text: '退休资料上传', type: 'upload', name: 'picList', value: [], uploadField: {type: 'string', field: {name: 'path', url: 'path'}}, url: '/basic-api/web/archivesManagement/uploadPic',maxCount: 1,  labelCol: {style: {width: '130px'}},  width: '120px', class: '',   },
  {
    text: '状态',
    type: 'h',
    name: 'state',
    width: '130',
    option: stateList,
    labelCol: { style: { width: '90px' } },
    class: '',
    h: (data) => {
      const colorArr = { 4: 'green', 5: 'red', 7: 'green', 8: 'red', }
      return h('span', { style: { color: colorArr[data.state] ?? '' }, innerHTML: valueToName(stateList, data.state, 'value', 'name') })
    }
  },
];
// 新增时显示字段

const base: inputFormModel[] = [
  {
    text: '科室名称',
    type: 'select',
    name: 'szksName',
    computedFun: [
      { type: 'option', api: '/web/archivesManagement/getByGb25', relationField: ['dmmc', 'dm'] },
    ],
    span: 8,
    labelCol: { style: { width: '100px' } },
    class: '',
  },
  {
    text: '人员名称',
    type: 'origin',
    name: 'name',
    span: 8,
    style: '',
    class: '',
    labelCol: { style: { width: '100px' } },
  },
  {
    text: '性别',
    type: 'origin',
    name: 'sex',
    option: sexList,
    span: 8,
    style: '',
    class: '',
    labelCol: { style: { width: '130px' } },
  },
  {
    text: '人员类别',
    type: 'origin',
    name: 'personnelCategoryName',
    computedFun: [
      { type: 'option', api: '/web/archivesManagement/getByGb147', relationField: ['dmmc', 'dmmc'] },
    ],
    span: 8,
    labelCol: { style: { width: '100px' } },
    class: '',
  },
  {
    text: '职称',
    type: 'origin',
    name: 'professionalTitlesName',

    span: 8,
    labelCol: { style: { width: '100px' } },
    class: '',
  },
  {
    text: '申请时间',
    type: 'origin',
    name: 'createTime',
    span: 8,
    style: '',
    class: '',
    labelCol: { style: { width: '130px' } },
  },
  {
    text: '退休时间',
    type: 'date',
    name: 'beginTime',
    span: 8,
    style: '',
    class: '',
    labelCol: { style: { width: '100px' } },
  },

  {
    text: '上传退休资料',
    type: 'upload',
    name: 'path',
    value: [],
    uploadField: { type: 'string', field: { name: 'pathName', url: 'path' }, maxCount: 1 },
    url: '/basic-api/web/archivesManagement/uploadPic',

    labelCol: { style: { width: '110px' } },
    wrapperCol: { span: 22 },
    span: 8,
    style: '',
    class: '',
  },
];

// 新增form验证
const validate = {
  szksName: [{ required: true, message: '请输入科室名称', trigger: 'blur' }],
  name: [{ required: true, message: '请输入人员名称', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  personnelCategoryName: [{ required: true, message: '请选择人员类别', trigger: 'blur' }],
  professionalTitlesName: [{ required: true, message: '请选择职称', trigger: 'blur' }],
  createTime: [{ required: true, message: '请选择申请时间', trigger: 'blur' }],
  beginTime: [{ required: true, message: '请选择退休时间', trigger: 'blur' }],
  path: [{ required: true, message: '请选择退休资料上传', trigger: 'blur' }],
};

// 新增初始化数据
const resetForm = {
  szksName: '',
  szks: '',
  name: '',
  sex: '',
  personnelCategoryName: '',
  professionalTitlesName: '',
  createTime: '',
  beginTime: '',
  picList: [],
  state: 1,
  type: 0, // 0 退休
  userId: '006',
  path: ''
};

// 封装页面统一数据
export default {
  title: '退休申请管理',
  INFO: {
    insert: { api: web_alterationApply_insertOrUpdate, title: '新增退休申请' },
    update: { api: web_alterationApply_insertOrUpdate, title: '编辑退休申请' },
    show: { title: '查看退休申请' },
  },
  API: {
    getList: web_alterationApply_getByList,
    remove: web_alterationApply_getByList,
  },
  FORM: [{ formList: base, formValidate: validate, title: '退休申请信息' }],
  resetForm,
  searchForm,
  tableForm,
};
