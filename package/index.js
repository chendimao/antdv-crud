
import aFormDesign from "./formDesign/index.vue";

import aFormItemInput from "./commonManage/InputItem/index";
import './utils/common.css';
const components = [
    aFormDesign,
    aFormItemInput
];

console.log(aFormItemInput);


const install = function(Vue, config = undefined) {

    console.log(config);
  components.forEach(component => {
    console.log(component.name);
    
    Vue.component(component.name, component);
  });

};

export default {
  install
};
