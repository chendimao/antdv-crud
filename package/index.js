import aCrudForm from "./commonManage/ACrudForm/aCrudForm.vue";
import aCrudTable from "./commonManage/aCrudTable.vue";
import aCrudSearch from "./commonManage/aCrudSearch.vue";
 import crudUtil from "./utils/index.ts";
import './utils/common.less'; 
import useForm from './hooks/useForm.ts';
import useTable from './hooks/useTable.ts';
import useSearch from './hooks/useSearch.ts';
import useCrud from './hooks/useCrud.ts';
import aCrudDict from "./commonManage/aCrudDict.vue";
const components = [
    aCrudForm,
    aCrudTable,
    aCrudSearch,
    aCrudDict
];

const config = (Vue, config) => {
    Vue.config.globalProperties.$crudUtil = crudUtil; // 
    Vue.config.globalProperties.$crudGlobalTableConfig = config?.tableConfig??{}; //table全局配置
    Vue.config.globalProperties.$crudGlobalSearchConfig = config?.searchConfig??{}; //search全局配置
    Vue.config.globalProperties.$crudGlobalFormConfig = config?.formConfig??{}; //form全局配置
    Vue.config.globalProperties.$crudGlobalInputConfig = config?.inputConfig??{}; //input全局配置
}

const install = function(Vue, config = undefined) {

    console.log(config);
  components.forEach(component => {
    Vue.component(component.name, component);
  });

};

export default {
  install,
  useForm, 
  useTable,
  useSearch,
  useCrud,
    config,
  crudUtil
};
