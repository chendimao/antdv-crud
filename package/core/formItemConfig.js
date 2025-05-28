

export const baseComponent  = [


    {
        text: '输入框',
        type: 'text',
        name: 'input',
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            console.log(data, form, type);
            return false;
        },

        wrapperCol: {  },
        rules:[
        ],
        labelCol: { style: { width: '100px' } },
        $attrs: { },

        class: '',
    },
    {
        text: '数字输入框',
        type: 'number',
        name: 'numberInput',
        span: 24,
        show: true,
        value: '',
        disabled: (data, form, type) => {
            console.log(data, form, type);
            return false;
        },
        labelCol: { style: { width: '100px' } },
        wrapperCol: {  },
        rules:[
        ],

        class: '',
    },{
        text: '单选框',
        type: 'radio',
        name: 'radioInput',
        span: 24,
        show: true,
        $attrs: {
            options: [
                { label: '选项1', value: 1 },
                { label: '选项2', value: 2 }
              ],
        },
        value: '',
        disabled: (data, form, type) => {
            console.log(data, form, type);
            return false;
        },
        labelCol: { style: { width: '100px' } },
        wrapperCol: {  },
        rules:[
        ],

        class: '',
    },


];

export const gridComponent  = [


    {
        text: '2列栅格',
        type: 'grid',
        name: 'grid',
        span: 24,
        show: true,
        value: '',
        columns: [
            { span: 12, children: [] },
            { span: 12, children: [] },
        ],
    } ,
    {
        text: '3列栅格',
        type: 'grid',
        name: 'grid',
        span: 24,
        show: true,
        value: '',
        columns: [
            { span: 8, children: [] },
            { span: 8, children: [] },
            { span: 8, children: [] },
        ],
    }, {
        text: '4列栅格',
        type: 'grid',
        name: 'grid',
        span: 24,
        show: true,
        value: '',
        columns: [
            { span: 6, children: [] },
            { span: 6, children: [] },
            { span: 6, children: [] },
            { span: 6, children: [] },
        ],
    } ,  
];

export const otherComponent = [
    {
        text: '输入框',
        type: 'text',
        name: 'input',
        span: 24,
        show: true,
    }
];