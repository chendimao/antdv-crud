
import {defineAsyncComponent, h, markRaw, render} from "vue";
import {getOptionList, valueToName} from "../../../package/utils";
import {sexList, stateList} from "./form";
import {inputFormModel} from "../../../package/model";
import {testTableOption} from "./fun";
import { web_alterationApply_getByList } from "../../api";

const table: inputFormModel[] = [
    {
        text: '专科编码',
        type: 'text',
        name: 'zkbm',
        $attrs: { minWidth: '100px', showOverflow: true },
      },
    
      {
        text: '专科名称',
        type: 'text',
        name: 'zkmc',
        $attrs: { minWidth: '100px', showOverflow: true },
      },
    
      {
        text: '病名编码',
        type: 'text',
        name: 'bmbm',
        $attrs: { minWidth: '100px', showOverflow: true },
      },
      {
        text: '病名名称',
        type: 'text',
        name: 'bmmc',
        $attrs: { minWidth: '100px', showOverflow: true },
      },
    
      {
        text: '证候编码',
        type: 'text',
        name: 'zhbm',
        $attrs: { minWidth: '100px', showOverflow: true },
      },
    
      {
        text: '证候名称',
        type: 'text',
        name: 'zhmc',
        $attrs: { minWidth: '100px', showOverflow: true },
      },
    
      {
        text: '要素编码',
        type: 'text',
        name: 'ysbm',
        $attrs: { minWidth: '100px', showOverflow: true },
      },
    
      {
        text: '要素名称',
        type: 'text',
        name: 'ysmc',
        $attrs: { minWidth: '100px', showOverflow: true },
      },
      {
        text: '症状类型',
        type: 'select',
        name: 'zzlx',
        $attrs: { minWidth: '120px', showOverflow: true },
        option: [
          {
            name: '主要症状',
            value: 0,
          },
          {
            name: '次要症状',
            value: 1,
          },
        ],
      },
      {
        text: '权重',
        type: 'text',
        name: 'qq',
        $attrs: { minWidth: '80px', showOverflow: true },
      },
      {
        text: '辨证要素积分量表体系分类编码',
        type: 'text',
        name: 'bm',
        $attrs: { minWidth: '250px', showOverflow: true },
      },
      {
        text: '状态',
        type: 'slot',
        name: 'bz',
        $attrs: { minWidth: '160px' },
      },

];



const tableForm: Function = (() =>
        new Map(table.map(item => [item.name, item]))
)



export default {
    tableForm
};