import textareaConfig from '../formDesign/component/formControlConfig/textareaConfig.vue';
import selectConfig from '../formDesign/component/formControlConfig/selectConfig.vue';
import treeSelectConfig from '../formDesign/component/formControlConfig/treeSelectConfig.vue';
import cascaderConfig from '../formDesign/component/formControlConfig/cascaderConfig.vue';
import autoCompleteConfig from '../formDesign/component/formControlConfig/autoCompleteConfig.vue';
import checkboxConfig from '../formDesign/component/formControlConfig/checkboxConfig.vue';
import switchConfig from '../formDesign/component/formControlConfig/switchConfig.vue';
import dateConfig from '../formDesign/component/formControlConfig/dateConfig.vue';
import datetimeConfig from '../formDesign/component/formControlConfig/datetimeConfig.vue';
import yearConfig from '../formDesign/component/formControlConfig/yearConfig.vue';
import monthConfig from '../formDesign/component/formControlConfig/monthConfig.vue';
import progressConfig from '../formDesign/component/formControlConfig/progressConfig.vue';
import badgeConfig from '../formDesign/component/formControlConfig/badgeConfig.vue';
import avatarConfig from '../formDesign/component/formControlConfig/avatarConfig.vue';
import descriptionsConfig from '../formDesign/component/formControlConfig/descriptionsConfig.vue';
import statisticConfig from '../formDesign/component/formControlConfig/statisticConfig.vue';
import tagConfig from '../formDesign/component/formControlConfig/tagConfig.vue';
import rateConfig from '../formDesign/component/formControlConfig/rateConfig.vue';
import sliderConfig from '../formDesign/component/formControlConfig/sliderConfig.vue';
import colorPickerConfig from '../formDesign/component/formControlConfig/colorPickerConfig.vue';
import tabsConfig from '../formDesign/component/formControlConfig/tabsConfig.vue';
import stepsConfig from '../formDesign/component/formControlConfig/stepsConfig.vue';
import calendarConfig from '../formDesign/component/formControlConfig/calendarConfig.vue';
import uploadConfig from '../formDesign/component/formControlConfig/uploadConfig.vue';


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
                { label: '选项1', value: '1' },
                { label: '选项2', value: '2' }
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
    {
        text: '多行文本',
        type: 'textarea',
        name: 'textarea',
        configComponent: textareaConfig,
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
    },
    {
        text: '下拉选择',
        type: 'select',
        name: 'select',
        configComponent: selectConfig,
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
    },
    {
        text: '树选择',
        type: 'treeSelect',
        name: 'treeSelect',
        configComponent: treeSelectConfig,
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
    },
    {
        text: '级联选择',
        type: 'cascader',
        name: 'cascader',
        configComponent: cascaderConfig,
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
        $attrs: {
            options: [],
            optionsValueType: 'string',
        },

        class: '',
    },
    {
        text: '自动完成',
        type: 'autoComplete',
        name: 'autoComplete',
        configComponent: autoCompleteConfig,
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
    },
    {
        text: '多选框',
        type: 'checkbox',
        name: 'checkbox',
        configComponent: checkboxConfig,
        span: 24,
        show: true,
        value: [],
        disabled: (data, form, type) => {
            console.log(data, form, type);
            return false;
        },
        labelCol: { style: { width: '100px' } },
        wrapperCol: {  },
        rules:[
        ],
        $attrs: {
            options: [
                { label: '选项1', value: '1' },
                { label: '选项2', value: '2' }
            ],
            optionsValueType: 'string',
        },
        class: '',
    },
    {
        text: '开关',
        type: 'switch',
        name: 'switch',
        configComponent: switchConfig,
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
    },
    {
        text: '日期',
        type: 'date',
        name: 'date',
        configComponent: dateConfig,
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
    },
    {
        text: '日期时间',
        type: 'datetime',
        name: 'datetime',
        configComponent: datetimeConfig,
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
    },
    {
        text: '年份',
        type: 'year',
        name: 'year',
        configComponent: yearConfig,
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
    },
    {
        text: '月份',
        type: 'month',
        name: 'month',
        configComponent: monthConfig,
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
    },
    {
        text: '进度条',
        type: 'progress',
        name: 'progress',
        configComponent: progressConfig,
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
    },
    {
        text: '徽标',
        type: 'badge',
        name: 'badge',
        configComponent: badgeConfig,
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
    },
    {
        text: '头像',
        type: 'avatar',
        name: 'avatar',
        configComponent: avatarConfig,
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
    },
    {
        text: '描述列表',
        type: 'descriptions',
        name: 'descriptions',
        configComponent: descriptionsConfig,
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
    },
    {
        text: '统计数值',
        type: 'statistic',
        name: 'statistic',
        configComponent: statisticConfig,
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
    },
    {
        text: '标签',
        type: 'tag',
        name: 'tag',
        configComponent: tagConfig,
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
    },
    {
        text: '评分',
        type: 'rate',
        name: 'rate',
        configComponent: rateConfig,
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
    },
    {
        text: '滑块',
        type: 'slider',
        name: 'slider',
        configComponent: sliderConfig,
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
    },
    {
        text: '颜色选择',
        type: 'colorPicker',
        name: 'colorPicker',
        configComponent: colorPickerConfig,
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
    },
   
    {
        text: '步骤条',
        type: 'steps',
        name: 'steps',
        configComponent: stepsConfig,
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
    },
    {
        text: '日历',
        type: 'calendar',
        name: 'calendar',
        configComponent: calendarConfig,
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
    },
    {
        text: '上传',
        type: 'upload',
        name: 'upload',
        configComponent: uploadConfig,
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
    {
        text: '标签页',
        type: 'tabs',
        name: 'tabs',
        configComponent: tabsConfig,
        span: 24,
        columns: [
            { title: '标签1', key: '1', children: [] },
            { title: '标签2', key: '2', children: [] },
        ],
        show: true,
        value: '',
        $attrs: {
            type: 'line',
            centered: false,
            animated: true,
            tabPosition: 'top',
        },
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

export const otherComponent = [
    {
        text: '输入框',
        type: 'text',
        name: 'input',
        span: 24,
        show: true,
    }
];