<template> 
  <a-layout style="flex-grow:1" class="form-design">
    
    <a-layout-sider v-model:collapsed="comCollapsed" :width="300" :collapsedWidth="0" style="min-height: 800px;" theme="light"  :trigger="null" collapsible>
      <a-collapse v-model:activeKey="comActiveKey" :bordered="false">
        <a-collapse-panel key="1" header="基础组件">

            <draggable
                tag="div"
             
                v-model="formData"
              class="component-list"
                @end="onDragEnd"
                @start="onDragStart"
                v-bind="{
                group: { name: 'form-draggable', pull: 'clone', put: false },
                sort: false,
                clone: cloneItem,
                animation: 180,
                ghostClass: 'moving',
      }"
                item-key="name"
            > 
                <template #item="{ element, index }">
                  <div
                    class="selectComponent"
                    @dragstart="$emit('add-attrs', formData, index)"
                    @click="$emit('handle-list-push', element)"
                  >
                    <span>{{ element.text }}</span>
                  </div> 
              </template>
            </draggable>

        </a-collapse-panel>

  <a-collapse-panel key="2" header="栅格组件">

            <draggable
                tag="div"
             
                v-model="gridData"
              class="component-list"
                @end="onDragEnd"
                @start="onDragStart"
                v-bind="{
                group: { name: 'form-draggable', pull: 'clone', put: false },
                sort: false,
                clone: cloneItem,
                animation: 180,
                ghostClass: 'moving',
      }"
                item-key="name"
            > 
                <template #item="{ element, index }">
                  <div
                    class="selectComponent"
                    @dragstart="$emit('add-attrs', gridData, index)"
                    @click="$emit('handle-list-push', element)"
                  >
                    <span>{{ element.text }}</span>
                  </div> 
              </template>
            </draggable>

        </a-collapse-panel>

      </a-collapse>
    </a-layout-sider>
    <menu-unfold-outlined
        v-if="comCollapsed"
        class="trigger"
        style="z-index: 9;background: white;"
        @click="() => (comCollapsed = !comCollapsed)"
    />
    <menu-fold-outlined style="z-index:9;background: white;" v-else class="trigger" @click="() => (comCollapsed = !comCollapsed)" />
 
    <a-layout-content>
      <div class="form-actions">
        <button class="action-btn primary" @click="printConfig">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </span>
          导出JSON
        </button>
        <button class="action-btn" @click="formPreview">
          <span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </span>
          表单预览
        </button>
      </div>
      <a-form class="aCardFormItem"
              :layout="formConfig.layout"
              :model="formConfig.formData"
              labelWrap name="basic" ref="formRef"
              :label-col="formConfig.labelCol"
              :wrapper-col="formConfig.wrapperCol"
              :colon="formConfig.attribute.includes('colon')"
              autocomplete="off">
        <a-row   style="padding: 5px;margin: 2px; ">
          <form-render
              v-model:formData="formConfig.formData"
              :currentItem="formConfig.currentItem"
              :currentIndex="formConfig.currentIndex"
              @onDragChange="onDragChange"
              @handleSelectComponent="handleSelectComponent"

          >

          </form-render>

        </a-row>

      </a-form>
    </a-layout-content>
    <menu-unfold-outlined
        v-if="configCollapsed"
        class="trigger"
        @click="() => (configCollapsed = !configCollapsed)"
    />
    <menu-fold-outlined v-else class="trigger" @click="() => (configCollapsed = !configCollapsed)" />
    <a-layout-sider v-model:collapsed="configCollapsed" :width="300" :collapsedWidth="0" style="min-height: 800px;" theme="light"  :trigger="null" collapsible>
      <a-tabs v-model:activeKey="menuActiveKey">
        <a-tab-pane key="1" tab="表单" style="padding: 5px;">
          <a-form :model="formConfig" labelWrap layout="vertical" :labelAlign="'left'" :label-col="{style: {width: '100px'}}" name="basic"   autocomplete="off">
            <a-form-item label="表单布局">
              <a-radio-group v-model:value="formConfig.layout" button-style="solid">
                <a-radio-button value="horizontal">水平</a-radio-button>
                <a-radio-button value="vertical">垂直</a-radio-button>
                <a-radio-button value="inline">行内</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="全局标签宽度">
                <a-input  v-model:value="formConfig.labelCol.style.width"/>

            </a-form-item>
            <a-form-item label="表单属性">
              <a-checkbox-group v-model:value="formConfig.attribute" :options="attributeOption" />

            </a-form-item>
          </a-form>
        </a-tab-pane>
        <a-tab-pane key="2" tab="控件" force-render style="padding:5px;">
          <form-control
                        :component="formData"
                        v-model:formConfig="formConfig"
                        :currentItem="formConfig.currentItem"
                        @changeCom="handleChangeCom"
          ></form-control>

        </a-tab-pane>
        <a-tab-pane key="3" tab="栅格" style="padding:5px;">
          <form-grid
                        :component="formData"
                        v-model:formConfig="formConfig"
                        :currentItem="formConfig.currentItem"
                        @changeCom="handleChangeCom"
          ></form-grid>

        </a-tab-pane>
      </a-tabs>
    </a-layout-sider>
    <a-modal title="导出JSON" :zIndex="10" v-model:visible="jsonVisible" width="800px" @cancel="jsonVisible = false">
      <a-textarea
          v-model:value="jsonData"
          auto-size
      />
    </a-modal>
      <a-crud-form ref="formRef"
                     @register="registerForm"
      ></a-crud-form>
 



  </a-layout>
</template>


<script lang="ts"  setup>
import {computed, ref, watch} from 'vue';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DeleteOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';


import {baseComponent, gridComponent} from '../core/formItemConfig';
import draggable from 'vuedraggable';
import {deepCopy} from "../utils";

import { Row, Col } from 'ant-design-vue';
import FormControl from "./component/formControl.vue";
import FormGrid from "./component/formGrid.vue";
import FormRender from "./component/formRender.vue";
import tableData from "../../src/applyManager2/data/table";
import searchData from "../../src/applyManager2/data/search";
import retireData from "../../src/applyManager2/data/form";
import antdCrud from 'antdv-crud';

const selectedKeys = ref(['1']);
const comCollapsed = ref(false); // 左边菜单收缩
const configCollapsed = ref(false); // 右边菜单收缩
const comActiveKey = ref(['1', '2']); //
const menuActiveKey = ref('1'); //

const currentIndex = ref(); // 当前选中的组件
const jsonVisible = ref(false);
const previewVisible = ref(false);
const jsonData = ref();
const previewData =ref();

const attributeOption = ref([
  {label: 'label后面显示冒号', value: 'colon'},
]);

const  formData = ref(baseComponent);
const  gridData = ref(gridComponent);
const formConfig = ref({
  // 表单配置
  formData: [],
  layout: 'horizontal',
  labelWidth: 100,
  labelCol: { style: {width: '150px'}},
  wrapperCol: {},
  size: 'small',
  currentItem: {},
  currentIndex: 0,
  attribute: [],
  activeKey: 1,
});

const crudTableRef = ref();
const test = ref(123);
const handleData = ref();
const [
  {
    registerForm,
     
  },
  {
    handleFormShow,
    setFormData, 
     }
]= antdCrud.useCrudTable(
    {
      form: {
        title: '表单预览',
        formData: [],
        modalType: 'modal',
        name: 'bmgl',
      },
    }
);

const data = [
  { id: 1, parentId: null, name: 'CEO' },
  { id: 2, parentId: 1, name: '技术部' },
  { id: 3, parentId: 1, name: '市场部' },
  { id: 4, parentId: 2, name: '前端组' },
  { id: 5, parentId: 2, name: '后端组' },
  { id: 6, parentId: 3, name: '推广组' },
  { id: 7, parentId: 4, name: 'React小组' },
  { id: 8, parentId: 5, name: 'Java小组' }
];
let treeData = [];
const buildTreeData = (treeData,  parentId = null) => {
   
 return treeData.filter(item => item.parentId == parentId).map(item => {
   console.log(item)
   return {...item, 
   children: buildTreeData(treeData, item.id)}
 })
}
 
console.log(buildTreeData(data,  null));

watch(() => formConfig.value.formData, (val) => {
  console.log(val);
}, {deep: true});


function cloneItem(item) {
  item.id = `${item.type}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  return deepCopy(item);
}

function componentEnd(e){
  if (e.pullMode) {
    formConfig.value.currentItem = formConfig.value.formData[e.newIndex];
    formConfig.value.currentIndex = e.newIndex;
   // formConfig.value.formData[e.newIndex] = formConfig.value.currentItem;
    console.log(e,formConfig.value.formData, formConfig.value.currentItem);
  }

}
function handleSelectComponent(e, index){
 formConfig.value.currentItem = e;
 formConfig.value.currentIndex = index;
}

const onDragChange = (event) => {
  console.log(event)
  if (event.added) {
    // formConfig.value.currentItem = event.added.element;
    // formConfig.value.currentIndex = event.added.newIndex;
  }
  if (event.moved) {

  }
};
function componentEnd2(e){
  console.log(e);

}

function onDragStart(event) {
  // 你可以做一些自定义的操作，比如禁用某些拖动区域
  console.log("拖动开始", event);
}
function onDragEnd(event) {
  // 拖动结束后的一些处理逻辑
  console.log("拖动结束", event);
}

// 右边控件菜单切换组件
function handleChangeCom(value, option) {
  console.log(value, option, formConfig.value.currentIndex);
  formConfig.value.currentItem = cloneItem(formData.value[option.key]);
  formConfig.value.formData[formConfig.value.currentIndex] = formConfig.value.currentItem;

}

function printConfig() {
  console.log(formConfig.value);
  jsonData.value = JSON.stringify(formConfig.value, null, 2);
  jsonVisible.value = true;
}
async function formPreview() {

  jsonData.value = JSON.stringify(formConfig.value, null, 2);
  previewData.value = JSON.parse(jsonData.value).formData;
  setFormData(previewData.value);
  handleFormShow('show');

}



</script>

<script lang="ts">
export default {
  name: "aFormDesign"
}
</script>

<style scoped lang="less">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.selectComponent {
  width: 95px;
  height: 60px;
  list-style: none;
}

.selectComponent:hover {
  background: dodgerblue;
  cursor: all-scroll;
  text-align: center;
  border-radius: 5px;
  color: #fff;
}
.moving {
  opacity: 0.6;
  border: 1px dashed #ccc;
}

.form-design ::v-deep(.ant-form-item) {
  margin-bottom: 15px !important;
}
.form-design {
  .component-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 8px;
  }

  .selectComponent {
    width: auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
    padding: 8px;
    text-align: center;
    font-size: 14px;
    word-break: break-all;
    line-height: 1.2;
    
    // 文字超出显示省略号
    > span {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; // 最多显示两行
      -webkit-box-orient: vertical;
    }
    
    &:hover {
      background: #1890ff;
      border-color: #1890ff;
      cursor: move;
      color: #fff;
    }
  }

  .form-actions {
  background: white;
  padding: 12px 16px;  // 减小上下内边距
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  gap: 8px;  // 减小按钮间距

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;  // 减小图标和文字的间距
    padding: 6px 12px;  // 减小按钮内边距
    border: none;
    border-radius: 6px;  // 稍微减小圆角
    font-size: 13px;  // 减小字体大小
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #f5f5f5;
    color: #333;

    .icon {
      display: flex;
      align-items: center;
      width: 14px;  // 减小图标尺寸
      height: 14px;  // 减小图标尺寸
    }

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);  // 减小阴影
    }

    &:active {
      transform: translateY(0);
    }

    &.primary {
      background: #2563eb;
      color: white;

      &:hover {
        background: #1d4ed8;
      }
    }
  }
}
}



</style>