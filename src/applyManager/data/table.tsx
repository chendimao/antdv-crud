import { h } from "vue";


export default  [
    {
        
        type: 'checkbox', 
        name:'checkbox'
      }, {
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
            label: '主要症状',
            value: 0,
          },
          {
            label: '次要症状',
            value: 1,
          },
        ],
      },
    
      {
        text: '辨证要素积分量表体系分类编码',
        type: 'text',
        name: 'bm',
        $attrs: { minWidth: '250px', showOverflow: true },
      },  {
        text: '分组表头',
        type: 'colgroup',
        name: 'bm',
        $attrs: { minWidth: '450px', showOverflow: true },
        children: [
          {
            text: '分组表头1',
            name: 'qq',
            type: 'text',
            $attrs: { minWidth: '100px', showOverflow: true },
          }, {
            text: '分组表头2',
            name: 'bt2',
            type: 'text',
            $attrs: { minWidth: '100px', showOverflow: true },
          },
        ],
      },
      // {
      //   text: 'render',
      //   type: 'h',
      //   h: (...data) => {
      //     return h('div', {style: {color: 'red'}},'render');
      //   },
      //   name: 'render',
      //   $attrs: { minWidth: '160px' },
      // },
      {
        text: '状态',
        type: 'slot',
        name: 'bz',
        $attrs: { minWidth: '160px' },
      },

];



