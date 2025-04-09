import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
 import antdCrud from '../package/index.js';
 //import antdCrud from '../dist/antdv-crud.es.js';
import VXETable from "vxe-table";
import 'vxe-table/lib/style.css';

import router from './router/index';

// ...可选 UI
import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'

import antd from 'ant-design-vue';
import VXETablePluginExportPDF from 'vxe-table-plugin-export-pdf';
import { jsPDF } from 'jspdf';
import 'ant-design-vue/dist/reset.css';

import hljs from 'highlight.js/lib/core';
import   'highlight.js/styles/atom-one-dark.css';
import   'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';

import json from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', json);
// or
// components: {JsonViewer}

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
        pageSizeField: 'size',
        pageField: 'page',
        pagination: {
            isPagination: true,
            pageSizeField: 'size',
            pageSizeOptions: ['10', '20', '30', '40', '50'],
            showQuickJumper: true,
            showSizeChanger: true,
        },
        isToolBox: true,
        toolBox: {
            showType: 'button',
        },
        },
    formConfig: {FooterCancelText: '退出', FooterSubmitText: '确定', },
    searchConfig: {searchText: '搜索', resetText: '重载234'},
    inputConfig: {showSearch: true, allowClear: true}
});
 app.use(antdCrud);

app.use(useTable);
app.use(router);
app.use(hljsVuePlugin)
app.mount('#app');
