import aCrudForm from "./commonManage/aCrudForm.vue";
import aCrudTable from "./commonManage/aCrudTable.vue";
import aCrudSearch from "./commonManage/aCrudSearch.vue";
 import crudUtil from "./utils/index.ts";
import './utils/common.css';
import useForm from './hooks/useForm.ts';
import useTable from './hooks/useTable.ts';
import useSearch from './hooks/useSearch.ts';
import useCrud from './hooks/useCrud.ts';
import aCrudDict from "./commonManage/aCrudDict.vue";
import { render } from "vue";
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

    Vue.directive('render', {
      mounted: async (el, binding) => {
        if (typeof binding.value === 'function' && el) {
          const result = await binding.value();
            console.log(result, el);
          if (result) {
            el.innerHTML = '';
              setTimeout(() => {
                  render(result, el);
              })
          }
        }
      },
      // updated: async (el, binding) => {
      //
      //   if (typeof binding.value === 'function' && el) {
      //     const result = await binding.value();
      //       console.log(result);
      //     if (result) {
      //       el.innerHTML = '';
      //      setTimeout(() => {
      //       render(result, el);
      //      })
      //     }
      //   }
      // }
    });
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
