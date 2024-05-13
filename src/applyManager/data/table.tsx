import dayjs from "dayjs";
import {h} from "vue";
import {getOptionList, valueToName} from "../../../package/utils";
import {sexList, stateList} from "./form";
import {inputFormModel} from "../../../package/model";
import {testTableOption} from "./fun";
import { web_alterationApply_getByList } from "../../api";

const table: inputFormModel[] = [
    // {
    //     text: '序号',
    //     type: 'seq',
    //     $attrs: { width: '100',fixed: 'left'},
    //     style: '',
    //     class: '',
    // },
    {
        text: '多选',
        type: 'checkbox',
        $attrs: { width: '50',fixed: 'left', disabled: true},
        style: '',

        class: '',
    },
    {
        text: '科室名称',
        type: 'h',
        width: '120',
        name: 'szks',
        h: async (data, item) => {
           // const res = await getOptionList(''xxxs);
            const colorArr = { 4: 'green', 5: 'red', 7: 'green', 8: 'red', }
            // if (!item.option) {
            //   const res =  await http.post({url: '/web/archivesManagement/getByGb25', params: {}});
            //   item.option = res.data;
            // }

             return h('span', { style: { color: colorArr[5] ?? '' }, innerHTML:  'test'})
            //return (<span style={{ color: colorArr[data.state] ?? '' }}>test</span>)
        },

        class: '',
    },
    {
        text: '人员名称',
        type: 'text',
        name: 'describe',
        width: '120',
        style: '',
        class: '',
        $attrs: {sortable: false},
    },{
        text: '住院病例号',
        type: 'select',
        name: 'id',
        width: '120',
        option: [],
        computedFun: [
            {type: 'function',fun: testTableOption},
            {type: 'option',api: web_alterationApply_getByList, params: {}, relationField: {name: 'professionalTitles', value: 'id'}},
        ],
        style: '',
        class: '',
    },{
        text: '申请会诊医师234',
        type: 'text',
        name: 'departmentCode',
        width: '180',
        style: '',
        class: '',
    },{
        text: '申请时间',
        type: 'h',
        name: 'applicationTime',
        width: '120',
        style: '',
        class: '',
        h: (data) => {
            return (<span>{dayjs(data.applicationTime).format('YYYY-MM-DD')}</span>)
        },
    },
    {
        text: '性别',
        type: 'text',
        name: 'sex',
        option: sexList,
        width: '80',
        style: '',
        class: '',
    },



    {
        text: '状态',
        type: 'h',
        name: 'state',
        width: '100',
        option: stateList,
        class: '',
        h: (data) => {
            const colorArr = { 4: 'green', 5: 'red', 7: 'green', 8: 'red', }
            return h('span', { style: { color: colorArr[data.state] ?? '' }, innerHTML:  'test' })


            // return h(Switch, {
            //     unCheckedValue: 1,
            //     checkedValue: 0,
            //     checked: data.state,
            //     checkedChildren: '启用',
            //     unCheckedChildren: '禁用',
            //     onChange: async  (e) => {
            //         data.state = e;
            //         const res = await web_subject_updateSubject(data);
            //         if (res.code == 0) {
            //             message.success('修改成功');
            //             methods.getData();
            //         } else {
            //             data.state = data.state  == 1 ? 0 : 1;
            //             message.error('修改失败');
            //         }
            //     },
            // })


            //测试代码不需要时注释
            // onClick: () => {
            //   const testDialog =  markRaw(defineAsyncComponent(() => import('../component/testDialog.vue'))) ;
            //      render(h(testDialog, {formState: data, visible: true,  ['onUpdate:visible']: (v) => {
            //        console.log(v, 96);
            //      }, ['onUpdate:formState']: (v) => {
            //        console.log(v, 97);
            //      }}), that.$el);
            //
            // }


        }
    },
];



const tableForm: Function = (() =>
        new Map(table.map(item => [item.name, item]))
)



export default {
    tableForm
};