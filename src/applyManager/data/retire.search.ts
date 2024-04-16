import {h} from 'vue';
// 查询表单
const searchForm = [
  {text: '单位名称',
    type: 'text',
    name: 'unitName',
    span: 5,
    style: 'min-width: 260px;',
    labelCol: {style: {width: '90px'}},
    class: '',
    $attrs: {
      defaultValue: 'test'
    },

  }, {text: '日期',
    type: 'date',
    name: 'date',
    span: 5,
    style: 'min-width: 260px;',
    labelCol: {style: {width: '90px'}},
    class: '',
    $attrs: {
      bordered: false,
      defaultValue: '2024-04-16'
    },

  },
];






// 查询表单验证
const validate =  {
  // 'unitName':  [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
};

// 表单数据初始化
const   resetForm = {
  unitName: '',
  limit: 10,
  page: 1,
  totalResult: 0
};


// 封装页面统一数据
export default {
  searchForm,
  resetForm,
  validate
}




