import dayjs from "dayjs";
import {h} from "vue";
import {valueToName} from "../../../package/utils";
import {sexList, stateList} from "./form";

const table = [
    {
        text: '序号',
        type: 'seq',
        $attrs: { width: '100',fixed: 'left'},
        style: '',
        class: '',
    },  {
        text: '多选',
        type: 'checkbox',
        $attrs: { width: '50',fixed: 'left'},
        style: '',
        class: '',
    },
    {
        text: '科室名称',
        type: 'h',
        width: '120',
        name: 'szks',
        h: async (data, item) => {
            const colorArr = { 4: 'green', 5: 'red', 7: 'green', 8: 'red', }
            // if (!item.option) {
            //   const res =  await http.post({url: '/web/archivesManagement/getByGb25', params: {}});
            //   item.option = res.data;
            // }

            // return h('span', { style: { color: colorArr[5] ?? '' }, innerHTML: valueToName(item.option, data.szks, 'dm', 'dmmc') })
            return (<span style={{ color: colorArr[data.state] ?? '' }}>test</span>)
        },
        class: '',
    },
    {
        text: '人员名称',
        type: 'text',
        name: 'name',
        width: '120',
        style: '',
        class: '',
        $attrs: {sortable: false},
    },{
        text: '住院病例号',
        type: 'text',
        name: 'medicalRecordNo',
        width: '120',
        style: '',
        sortable: false,
        class: '',
    },{
        text: '申请会诊医师234',
        type: 'text',
        name: 'applicationDoctor',
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


    // {text: '退休资料上传', type: 'upload', name: 'picList', value: [], uploadField: {type: 'string', field: {name: 'path', url: 'path'}}, url: '/basic-api/web/archivesManagement/uploadPic',maxCount: 1,  labelCol: {style: {width: '130px'}},  width: '120px', class: '',   },
    {
        text: '状态',
        type: 'h',
        name: 'state',
        width: '100',
        option: stateList,
        class: '',
        h: (data) => {
            const colorArr = { 4: 'green', 5: 'red', 7: 'green', 8: 'red', }
            return h('span', { style: { color: colorArr[data.state] ?? '' }, innerHTML: valueToName(stateList, data.state, 'value', 'name') })
        }
    },
];



const tableForm: Function = (() =>
        new Map(table.map(item => [item.name, item]))
)



export default {
    tableForm
};