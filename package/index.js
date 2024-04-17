import aCrudForm from "./commonManage/aCrudForm.vue";
import aCrudTable from "./commonManage/aCrudTable.vue";
import aCrudSearch from "./commonManage/aCrudSearch.vue";

import http from './utils/http.js';
 import crudUtil from "./utils/index.ts";

const components = [
    aCrudForm,
    aCrudTable,
    aCrudSearch
];

const install = function(Vue) {
   Vue.config.globalProperties.$crudUtil = crudUtil; //匹配枚举字段
  components.forEach(component => {
    Vue.component(component.name, component);
  });

};

export default {
  install
};
