import aCrudForm from "./commonManage/aCrudForm.vue";
import aCrudTable from "./commonManage/aCrudTable.vue";
import aCrudSearch from "./commonManage/aCrudSearch.vue";

 import crudUtil from "./utils/index.ts";
import './utils/common.css';
import {useTable as useCrudTable} from "./hooks/useTable.ts";
const components = [
    aCrudForm,
    aCrudTable,
    aCrudSearch
];

const install = function(Vue, config = undefined) {
   Vue.config.globalProperties.$crudUtil = crudUtil; //
   Vue.config.globalProperties.$useCrudTable = useCrudTable; //
   Vue.config.globalProperties.$crudGlobalTableConfig = config?.tableConfig??{}; //table全局配置
   Vue.config.globalProperties.$crudGlobalSearchConfig = config?.searchConfig??{}; //search全局配置
   Vue.config.globalProperties.$crudGlobalFormConfig = config?.formConfig??{}; //form全局配置
    console.log(config);
  components.forEach(component => {
    Vue.component(component.name, component);
  });

};


export default {
  install,
  useCrudTable,
  crudUtil
};
