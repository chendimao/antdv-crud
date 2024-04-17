import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import antdCrud from '../package/index.js';
import VXETable from "vxe-table";
import antd from 'ant-design-vue';
import 'vxe-table/lib/style.css'
import 'ant-design-vue/dist/antd.css';
import http from "../package/utils/http.js";

// 安装vxe-table
const  useTable = (app) => {
    app.use(VXETable)
    // 给 vue 实例挂载内部对象，例如：
    // app.config.globalProperties.$XModal = VXETable.modal
    // app.config.globalProperties.$XPrint = VXETable.print
    // app.config.globalProperties.$XSaveFile = VXETable.saveFile
    // app.config.globalProperties.$XReadFile = VXETable.readFile
}
const app = createApp(App)
app.use(useTable);
app.use(antd);
// app.use(antdCrud.install(app, {baseUrl: 'http://zbzt.tongchealth.com/basic-api/'}));
 app.use(antdCrud.install(app, {http: new http('http://zbzt.tongchealth.com/basic-api/')}));


app.mount('#app');
