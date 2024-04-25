// 用户管理
import {h} from 'vue';
import { web_alterationApply_insertOrUpdate, web_alterationApply_getByList, web_archivesManagement_getManagement_details } from '../../api/index';
import http from '../../util/http';
import {valueToName} from "../../../package/utils";
import {web_archivesManagement_getByGb25, web_archivesManagement_getByGb147} from '../../api/index';
import dayjs from 'dayjs';
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

const table = [
  {
    text: '序号',
    type: 'seq',
    $attrs: { width: '100',fixed: 'left'},
    style: '',
    class: '',

    labelCol: { style: { width: '130px' } },
  },
  {
    text: '科室名称',
    type: 'h',
    width: '150',
    name: 'szks',
    h: async (data, item) => {
      const colorArr = { 4: 'green', 5: 'red', 7: 'green', 8: 'red', }
      // if (!item.option) {
      //   const res =  await http.post({url: '/web/archivesManagement/getByGb25', params: {}});
      //   item.option = res.data;
      // }

     // return h('span', { style: { color: colorArr[5] ?? '' }, innerHTML: valueToName(item.option, data.szks, 'dm', 'dmmc') })
      return (<span style={{ color: colorArr[data.state] ?? '' }}>test</span>)
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
    $attrs: {sortable: false},
    labelCol: { style: { width: '130px' } },
  },{
    text: '住院病例号',
    type: 'text',
    name: 'medicalRecordNo',
    span: 8,
    style: '',
    sortable: false,
    class: '',
    labelCol: { style: { width: '100px' } },
  },{
    text: '申请会诊医师',
    type: 'text',
    name: 'applicationDoctor',
    span: 8,
    style: '',
    class: '',
    labelCol: { style: { width: '100px' } },
  },{
    text: '申请时间',
    type: 'h',
    name: 'applicationTime',
    span: 8,
    style: '',
    class: '',
    h: (data) => {
      return (<span>{dayjs(data.applicationTime).format('YYYY-MM-DD')}</span>)
  },
    labelCol: { style: { width: '100px' } },
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

const base = [

  {
    text: '人员名称',
    type: 'origin',
    name: 'name',
    span: 8,
    style: '',
    class: '',
    labelCol: { style: { width: '100px' } },
  },{
    text: '住院病例号',
    type: 'origin',
    name: 'medicalRecordNo',
    span: 8,
    style: '',
    class: '',
    labelCol: { style: { width: '100px' } },
  },{
    text: '申请会诊医师',
    type: 'origin',
    name: 'applicationDoctor',
    span: 8,
    style: '',
    class: '',
    labelCol: { style: { width: '100px' } },
  },{
    text: '申请时间',
    type: 'origin',
    name: 'applicationTime',
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
const validateForm = (() => ({
  szksName: [{ required: true, message: '请输入科室名称', trigger: 'blur' }],

  sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
  personnelCategoryName: [{ required: true, message: '请选择人员类别', trigger: 'blur' }],
  professionalTitlesName: [{ required: true, message: '请选择职称', trigger: 'blur' }],
  createTime: [{ required: true, message: '请选择申请时间', trigger: 'blur' }],
  beginTime: [{ required: true, message: '请选择退休时间', trigger: 'blur' }],
  path: [{ required: true, message: '请选择退休资料上传', trigger: 'blur' }],
}));

// 新增初始化数据
const resetForm = (()=>({"applicationDept":"","limit":10,"page":1,"roleid":3,"states":"", name: '', beginTime: ''}));

const baseForm: Function = ((): Map =>
        new Map(base.map(item => [item.name, item]))
)

const tableForm: Function = (() =>
        new Map(table.map(item => [item.name, item]))
)


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
  FORM: [{ formList: baseForm, formValidate: validateForm, title: '退休申请信息' }],
  resetForm,
  tableForm,
  baseForm,
};
