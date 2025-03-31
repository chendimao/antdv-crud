
import {defineAsyncComponent, h, markRaw, render} from "vue";
import {getOptionList, valueToName} from "../../../package/utils";
import {sexList, stateList} from "./form";
import {inputFormModel} from "../../../package/model";
import {testTableOption} from "./fun";
import { web_alterationApply_getByList } from "../../api";

const table: inputFormModel[] = [
    { text: '主题名称', $attrs: {fixed: 'left'}, type: 'text', name: 'subjectName', span: 8, style: '', class: '' },
    { text: '主题描述',$attrs: {fixed: 'left'},  type: 'text', name: 'remark',  span: 8, style: '', class: '' },
    { text: '预警值', $attrs: {fixed: 'left'}, type: 'text', name: 'warningValue',span: 8, style: '', class: '' },
    { text: '修改时间', type: 'date',   name: 'uTime', span: 8, style: '', class: '' },
    { text: '修改人', type: 'slot', name: 'updateuser', span: 8, style: '', class: '' },

];





export default table;