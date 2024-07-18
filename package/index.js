import aCrudForm from "./commonManage/ACrudForm/aCrudForm.vue";
import aCrudTable from "./commonManage/aCrudTable.vue";
import aCrudSearch from "./commonManage/aCrudSearch.vue";
 import crudUtil from "./utils/index.ts";
import './utils/common.less';
import {useTable as useCrudTable} from "./hooks/useTable.ts";
import aCrudDict from "./commonManage/aCrudDict.vue";
const components = [
    aCrudForm,
    aCrudTable,
    aCrudSearch,
    aCrudDict
];

const config = (Vue, config) => {
    Vue.config.globalProperties.$crudUtil = crudUtil; //
    Vue.config.globalProperties.$useCrudTable = useCrudTable; //
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
  useCrudTable,
    config,
  crudUtil
};
