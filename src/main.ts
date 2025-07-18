import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
 import antdFormDesign from '../package/index.js';
 import antdCrud from '../package/crud.js';
 // import antdCrud from 'antdv-crud';
import VXETable from "vxe-table";
import 'vxe-table/lib/style.css';
import 'antdv-crud/dist/style.css';

import router from './router/index';

// ...可选 UI
import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'

import antd from 'ant-design-vue';
import VXETablePluginExportPDF from 'vxe-table-plugin-export-pdf';
import { jsPDF } from 'jspdf';
import 'ant-design-vue/dist/antd.css';

VXETable.use(VXETablePluginExportPDF, {
    jsPDF
});
VXETablePluginExportPDF.config({
    beforeMethod: fontBeforeMethod
})
// 安装vxe-table
const  useTable = (app) => {
    app.use(VxeUI).use(VXETable)
    // 给 vue 实例挂载内部对象，例如：
    // app.config.globalProperties.$XModal = VXETable.modal
    // app.config.globalProperties.$XPrint = VXETable.print
    // app.config.globalProperties.$XSaveFile = VXETable.saveFile
    // app.config.globalProperties.$XReadFile = VXETable.readFile
}




function fontBeforeMethod({ $pdf, options, columns, datas }) {
    $pdf.addFont('/src/assets/fonts/LXGWHeartSerifCHS-2.ttf', 'HARMONYOS', 'normal');
    $pdf.addFont('/src/assets/fonts/LXGWHeartSerifCHS-2.ttf', 'HARMONYOS', 'bold');
    $pdf.setFont('HARMONYOS');
}


const app = createApp(App)

app.use(antd);
// app.use(antdCrud.install(app, {baseUrl: 'http://zbzt.tongchealth.com/basic-api/'}));

antdCrud.config(app, {
    tableConfig: {
        isToolBox: true,
        toolBox: {
            showType: 'button',
        },
    },
    inputConfig: { showSearch: true, allowClear: true, isTrim: true }

});
app.use(antdCrud);

 app.use(antdFormDesign);

app.use(useTable);
app.use(router);
app.mount('#app');

