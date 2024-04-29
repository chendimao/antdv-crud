import aCrudForm from "./commonManage/aCrudForm.vue";
import aCrudTable from "./commonManage/aCrudTable.vue";
import aCrudSearch from "./commonManage/aCrudSearch.vue";

 import crudUtil from "./utils/index.ts";
import './utils/common.css';
const components = [
    aCrudForm,
    aCrudTable,
    aCrudSearch
];

const install = function(Vue, config = undefined) {
   Vue.config.globalProperties.$crudUtil = crudUtil; //匹配枚举字段
   Vue.config.globalProperties.$crudGlobalTableConfig = config?.tableConfig??{}; //table全局配置
   Vue.config.globalProperties.$crudGlobalSearchConfig = config?.searchConfig??{}; //search全局配置
   Vue.config.globalProperties.$crudGlobalFormConfig = config?.formConfig??{}; //form全局配置
    console.log(config);
  components.forEach(component => {
    Vue.component(component.name, component);
  });

};

export default {
  install
};
