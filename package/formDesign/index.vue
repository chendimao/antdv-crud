<template> 
  <a-layout style="flex-grow:1" class="form-design">
    
    <a-layout-sider v-model:collapsed="comCollapsed" :width="260" :collapsedWidth="0" style="min-height: 800px;" theme="light"  :trigger="null" collapsible>
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
                  ghostClass: 'moving'
                }"
                item-key="name"
            > 
                <template #item="{ element, index }">
                  <div
                    class="selectComponent"
                    @dragstart="$emit('add-attrs', formData, index)"
                    @click="$emit('handle-list-push', element)"
                  >
                    <component v-if="element.icon" :is="element.icon" class="component-icon" />
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
                  ghostClass: 'moving'
                }"
                item-key="name"
            > 
                <template #item="{ element, index }">
                  <div
                    class="selectComponent"
                    @dragstart="$emit('add-attrs', gridData, index)"
                    @click="$emit('handle-list-push', element)"
                  >
                    <component v-if="element.icon" :is="element.icon" class="component-icon" />
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
              @handleSelectComponent="handleSelectComponent"
              @selectAdded="handleComponentAdded"
              @selectComponent="handleSelectComponent"
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
    <a-layout-sider v-model:collapsed="configCollapsed" :width="450" :collapsedWidth="0" style="min-height: 800px;height: 100vh;overflow: hidden;" theme="light"  :trigger="null" collapsible>
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
                        v-model:currentItem="formConfig.currentItem"
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
    <codeMirror
      ref="codeEditorRef"
      v-model:value="editorValue"
      :showType="'modal'"
      :visible="jsonVisible"
      :language="'javascript'"
      :showCheckSyntax="false"
      :showSave="false"
      :showCancel="true"
      :showCopy="true"
      :showFooter="true"
      :options="{
        readOnly: true,
        theme: 'monokai',
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2,
        indentUnit: 2,
        matchBrackets: true,
        autoCloseBrackets: true,
        styleActiveLine: true
      }"
      @update:value="handleCodeEditorChange"
      @update:visible="handleEditorVisibleChange"
    />
    <a-crud-form ref="formRef"
                   @register="dataForm.register"
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
  AppstoreOutlined,
  TableOutlined,
  LayoutOutlined,
  FileTextOutlined,
  FormOutlined,
  BarsOutlined,
  PlusSquareOutlined,
  BorderOuterOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
  UnorderedListOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  StarOutlined,
  BgColorsOutlined,
  PoweroffOutlined,
  SlidersOutlined,
  FontSizeOutlined,
  Html5Outlined,
  FontColorsOutlined,
  TagsOutlined
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

import {baseComponent, gridComponent} from '../core/formItemConfig';
import draggable from 'vuedraggable';
import {deepCopy} from "../utils";

import { Row, Col } from 'ant-design-vue';
import FormControl from "./component/formControl.vue";
import FormGrid from "./component/formGrid.vue";
import FormRender from "./component/formRender.vue";
import codeMirror from "./component/codeMirror.vue";
import tableData from "../../src/applyManager2/data/table";
import searchData from "../../src/applyManager2/data/search";
import retireData from "../../src/applyManager2/data/form";
import antdCrud from 'antdv-crud';
import { onMounted } from 'vue';

const selectedKeys = ref(['1']);
const comCollapsed = ref(false); // 左边菜单收缩
const configCollapsed = ref(false); // 右边菜单收缩
const comActiveKey = ref(['1', '2']); //
const menuActiveKey = ref('1'); //

const currentIndex = ref(); // 当前选中的组件
const jsonVisible = ref(false);
const previewVisible = ref(false);
const jsonData = ref();
const previewData = ref();
const codeEditorRef = ref();
const editorValue = ref('');

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
const dataForm = new antdCrud.useForm(
   {
        title: '表单预览',
        formData: [], 
        name: 'bmgl',
      } 
) 
const methods = ref();
onMounted(() => {
})


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
  
   return {...item, 
   children: buildTreeData(treeData, item.id)}
 })
}
 
console.log(buildTreeData(data,  null));

watch(() => formConfig.value.formData, (val) => {
  console.log(val);
}, {deep: true});

watch(() => formConfig.value.currentItem, (val) => {
  console.log(val, formConfig.value.formData, formConfig.value.currentIndex);
  
  formConfig.value.formData[formConfig.value.currentIndex] = val;
}, {deep: true});


function cloneItem(item) {
  // 先创建原始 item 的深拷贝
  const clonedItem = deepCopy(item);
  // 在拷贝上修改 name 和 id
  clonedItem.name = clonedItem.id = `${clonedItem.type}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  // 返回修改后的拷贝
  return clonedItem;
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

const FUNCTION_FLAG = 'FUNCTION_FLAG';

// 将对象转换为可编辑的字符串（函数转换为 FUNCTION_FLAG 字符串）
const convertToEditableString = (obj) => {
  try {
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'function') {
        const funcStr = value.toString();
        return `${FUNCTION_FLAG}${funcStr}`;
      }
      if (typeof value === 'string' && value.startsWith(FUNCTION_FLAG)) {
        return value;
      }
      return value;
    }, 2);
  } catch (error) {
    console.error('转换为可编辑字符串失败:', error);
    throw new Error('转换为可编辑字符串失败');
  }
};

// 处理编辑器可见性变化
const handleEditorVisibleChange = (visible) => {
  jsonVisible.value = visible;
};

// 处理代码编辑器值变化
const handleCodeEditorChange = (value) => {
  editorValue.value = value;
};

function printConfig() {
  try {
    editorValue.value = convertToEditableString(formConfig.value);
    codeEditorRef.value.show();
  } catch (error) {
    console.error('准备编辑器内容失败:', error);
    message.error('准备编辑器内容失败，请检查数据格式');
  }
}
async function formPreview() {

  
  previewData.value =formConfig.value.formData;
  console.log(previewData.value, formConfig.value.currentItem);
  
  dataForm.methods.value.setFormData(previewData.value);
  dataForm.methods.value.handleFormShow('update');

}

const iconMap = {
  AppstoreOutlined,
  TableOutlined,
  LayoutOutlined,
  FileTextOutlined,
  FormOutlined,
  BarsOutlined,
  PlusSquareOutlined,
  BorderOuterOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
  UnorderedListOutlined,
  CheckSquareOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  StarOutlined,
  BgColorsOutlined,
  PoweroffOutlined,
  SlidersOutlined,
  FontSizeOutlined,
  Html5Outlined,
  FontColorsOutlined,
  TagsOutlined
};

function handleComponentAdded(element, index) {
  console.log("index.vue: handleComponentAdded 被调用", element, index);
  
  // 在这里为新添加的组件生成唯一的 ID 和 name，确保在顶层处理时 ID 唯一
  const newId = `${element.type}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  element.id = newId;
  element.name = newId; // 通常 name 也需要唯一
  
  console.log("index.vue: Regenerated ID for added component", element);
  
  // 调用 handleSelectComponent 方法来选中新添加的组件
  // handleSelectComponent 会使用带有新 ID 的 element
  handleSelectComponent(element, index); // 保持传递 index，虽然 handleSelectComponent 可能只用 element
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
    display: flex;
    flex-wrap: wrap;
    gap: 12px 10px;
    padding: 12px 8px 4px 8px;
    background: #f8f9fb;
    border-radius: 8px;
    min-height: 40px;
  }

  .selectComponent {
    width: 110px;
    height: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e6eb;
    border-radius: 8px;
    background: #fff;
    transition: all 0.2s;
    font-size: 15px;
    color: #333;
    margin-bottom: 4px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    cursor: pointer;
    position: relative;
    font-weight: 500;
    text-align: center;
    padding: 0 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover {
      background: #e6f0ff;
      border-color: #2563eb;
      color: #2563eb;
      box-shadow: 0 2px 8px rgba(37,99,235,0.08);
    }
    > .component-icon {
      font-size: 18px;
      margin-right: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    > span {
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      width: 100%;
    }
  }

  // 分组标题样式
  :deep(.ant-collapse-header) {
    font-size: 16px;
    font-weight: bold;
    color: #222;
    background: #f4f6fa;
    border-radius: 6px 6px 0 0;
    margin-bottom: 0;
    padding: 8px 16px;
  }
  // 分组面板间距
  :deep(.ant-collapse-item) {
    margin-bottom: 16px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #f0f0f0;
  }
  // 分组内容 padding 并居中内容
  :deep(.ant-collapse-content-box) {
    padding: 0 0 8px 0;
    text-align: center;
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