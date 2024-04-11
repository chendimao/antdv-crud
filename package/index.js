import commonAddForm from "./commonManage/commonAddForm.vue";
import commonTableForm from "./commonManage/commonTableForm.vue";
import searchForm from "./commonManage/searchForm.vue";

import http from './utils/http.js';

const components = [
  commonAddForm,
  commonTableForm,
  searchForm
];

const install = function(Vue, option) {
  Vue.config.globalProperties.$http = option ? option.http : http; //匹配枚举字段
  components.forEach(component => {
    Vue.component(component.name, component);
  });

};

export default {
  install
};
