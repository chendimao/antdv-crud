<template>
      <span>
        <a-col :span="24" class="input-item" :class="item.class"  :offset="item.offset ? item.offset : 0">
        <template v-if="item.type == 'null'">
            <div  >
              {{item.text}}
            </div>
        </template>

        <template v-else>


              <div class="input-content" >
                <template v-if="item.type == 'text'">

                  <a-input
                      :disabled="isDisabled  || item.disabled"
                      size="default"
                      @change="inputChange(inputValue)"
                      v-model:value="inputValue"
                      v-bind="item.$attrs"
                      type="text" >
                  <template #addonAfter v-if="item.afterText">
                      {{item.afterText}}
                  </template>

                  </a-input>
                </template>
                <template v-else-if="item.type == 'textarea'">
                  <a-textarea      v-bind="item.$attrs" :disabled="isDisabled  || item.disabled"
                                size="default"

                                @change="inputChange(inputValue)"
                                v-model:value="inputValue" :rows="item.rows" />
                </template>
                <template v-else-if="item.type == 'select'">
                  <a-select
                      v-bind="item.$attrs"
                      size="default"
                      v-model:value="inputValue"
                      :allowClear="item.allowClear"
                      :show-search="item.showSearch"
                      :disabled="isDisabled  || item.disabled"
                      @change="inputChange(inputValue)"
                      :options="item.option"
                      :filter-option="filterOption"
                      style="width: 100%;border: 0;"
                      :fieldNames="{label: 'name', value: 'value'}"
                  >

<!--                    <a-select-option v-for="data in item.option" :value="data.value">{{ data.name }}</a-select-option>-->
                  </a-select>
                </template>
                <template v-else-if="item.type == 'cascader'">
                  <a-cascader
                      v-bind="item.$attrs"
                      size="default"
                      v-model:value="inputValue"
                      :allowClear="item.allowClear"
                      :show-search="item.showSearch ? {filter: filterOption} : false"
                      :disabled="isDisabled  || item.disabled"
                      @change="changeResourceName"
                      :multiple="!!item.multiple"
                      :options="item.option"
                      style="width: 100%;border: 0;"
                      :fieldNames="{label: 'name', value: 'value'}"
                  />


                  <!--                    <a-select-option v-for="data in item.option" :value="data.value">{{ data.name }}</a-select-option>-->


                </template>



                <template v-else-if="item.type == 'checkbox'">
                  <a-select
                      v-bind="item.$attrs"
                      size="default"
                      mode="multiple"
                      v-model:value="inputValue"
                      :disabled="isDisabled  || item.disabled"
                      @change="inputChange(inputValue)"
                      style="width: 100%;border: 0;height: 30px;border-bottom: 1px solid #ccc;"
                  >
                    <a-select-option v-for="data in item.option" :value="data.value">{{ data.name }}</a-select-option>
                  </a-select>


                </template>
                <template v-else-if="item.type == 'datetime'">
                  <a-date-picker      v-bind="item.$attrs" style="width: 100%;"  v-model:value="inputValue" valueFormat="YYYY-MM-DD HH:mm:ss" show-time format="YYYY-MM-DD HH:mm:ss" :disabled="isDisabled  || item.disabled" size="default" @change="inputChange(inputValue)" />
                </template>
                <template v-else-if="item.type == 'date'">
                  <a-date-picker     v-bind="item.$attrs" style="width: 100%;"  v-model:value="inputValue" valueFormat="YYYY-MM-DD" format="YYYY-MM-DD" :disabled="isDisabled  || item.disabled" size="default" @change="inputChange(inputValue)" />
                </template>
                <template v-else-if="item.type == 'year'">
                  <a-date-picker      v-bind="item.$attrs" style="width: 100%;"  v-model:value="inputValue"  valueFormat="YYYY"   format="YYYY"   picker="year" :disabled="isDisabled  || item.disabled" size="default" @change="inputChange(inputValue)" />
                </template>
                <template v-else-if="item.type == 'month'">
                  <a-date-picker      v-bind="item.$attrs" style="width: 100%;" v-model:value="inputValue"  valueFormat="MM"  format="MM"  picker="month" :disabled="isDisabled  || item.disabled" size="default" @change="inputChange(inputValue)" />
                </template>
                <template v-else-if="item.type == 'upload' && isArray(inputValue)">
                  <a-upload
                      v-bind="item.$attrs"
                      v-model:file-list="inputValue"
                      :action="item.url"
                      :maxCount="item.uploadField.maxCount??100"
                      :disabled="isDisabled  || item.disabled"
                      list-type="picture-card"
                      @change="handleChange"
                  >
                    <div  >
                      <plus-outlined />
                      <div style="margin-top: 8px">上传</div>
                    </div>
                  </a-upload>
                </template>

                <template v-else-if="item.type == 'switch'">
                  <a-switch     v-bind="item.$attrs" v-model:checked="inputValue"  :disabled="isDisabled  || item.disabled"  :unCheckedValue="item.unCheckedValue" :checkedValue="item.checkedValue" :checked-children="item.checkedChildren" :un-checked-children="item.unCheckedChildren" />
                </template>
                <template v-else-if="item.type == 'origin'">
                  {{inputValue}}
                </template>
               <template v-else-if="item.type == 'list'">
                  <vxe-table
                      v-bind="item.$attrs"
                      border
                      show-overflow
                      :data="inputValue"
                      ref="xTable"
                      :column-config="{resizable: true}"
                      :edit-config="!item.disabled ? {trigger: 'click', mode: 'cell'} : {}">
                    <vxe-column type="seq" width="60"></vxe-column>
                    <vxe-column v-for="list in item.listField" :field="list.key" :title="list.label" :edit-render="{autofocus: '.vxe-input--inner'}">
                      <template #edit="{ row }" v-if="list.type == 'text'">
                        <vxe-input v-model="row[list.key]" type="text"></vxe-input>
                      </template>
                      <template #default="{ row }" v-if="list.type == 'select'">
                        <span>{{ valueToName(list.list, row.useflag, 'value', 'label') }}</span>
                      </template>
                      <template #edit="{ row }"  v-if="list.type == 'select'">
                        <vxe-select v-model="row.useflag" transfer>
                          <vxe-option v-for="i in list.list" :key="i.value" :value="i.value" :label="i.label"></vxe-option>
                        </vxe-select>
                      </template>
                    </vxe-column>
                    <vxe-column title="操作">
                      <template #default="{ row }" >
                        <a-button type="link" style="color: orangered;" @click="handleDelete(row)">删除</a-button>
                      </template>
                    </vxe-column>
                  </vxe-table>
                  <div class="text-center" ref="testref" style="border: 1px solid #e5e5e5;border-top: 0;">
                    <a-button type="link" @click="handleAddList(-1)">插入数据</a-button>
                  </div>
                </template>

                <template v-else>

                </template>




              </div>

        </template>

      </a-col>
      <a-col v-if="item.afterSpan" :span="item.afterSpan" />
      </span>


</template>

<script lang="ts" setup>
import {
  watch,
  ref,
  computed,
  onMounted,
  getCurrentInstance,
  onUnmounted
} from "vue";
import {isArray, isDate, isNull, isNumber, isObject, isString} from "../../../utils/is";
import {PlusOutlined} from "@ant-design/icons-vue";
import {getOptionList, setObjToUrlParams, valueToName} from "../../../utils";
import {Api} from "../../../hooks/crud/api";
import {inputFormModel} from "../../../model";

const { proxy } = getCurrentInstance();

const props = defineProps({
  value: {},
  item: {type: Object as () => (inputFormModel)},
  formState: {type: Object},
  isDisabled: {type: Boolean, default: false }
});
const emit =  defineEmits(['change', 'value', 'update:item']);
const inputValue = ref();
const inputItem = ref(props.item);
const table = ref();
const tableRef = ref();
const xTable = ref();





watch(() => props.item, async (data) => {

  inputItem.value = data;
  // 执行额外的函数
  if (inputItem.value.computedFun?.length > 0) {
    for (const item of inputItem.value.computedFun) {
      if (item.type == 'option') {
        let params = item.params;
        if(item.dynamicParams) {
          params = {...item.dynamicParams(props.formState)};
        }
        inputItem.value.option = await getOptionList({proxy, ...item});
      } else if (item.type == 'function') {

      }
    }
  }



}, {immediate: true})




function handleDelete(row) {
  console.log(row);
  xTable.value.remove(row);
}

async function handleAddList (row) {
  const $table = xTable.value
  let record = props.item.newData;
  record[props.item.primaryKey] = props.id;
  const { row: newRow } = await $table.insertAt(record, row)
  inputValue.value = $table.getTableData().fullData;

  console.log(inputValue.value);
  // await $table.setEditCell(newRow, 'name')
}



// 显示空格
const itemXa0 = computed(() => {
  let html = '';
  for (let i = 0; i < inputItem.value.beforeXa0; i++) {
    html += '\xa0';
  }
  return html;
});
watch(() => props.value, async (data) => {
  //  inputValue.value = (isNumber(data) ? String(data) : isNull(data) &&  props.item.type != 'checkbox' ? '' : data);
  inputValue.value = ( isNull(data) &&  inputItem.value.type != 'checkbox' ? '' : data);

  if (inputItem.value.type == 'checkbox') {

    inputValue.value = String(inputValue.value).split(',');
    if (inputValue.value &&  inputValue.value[0] == ''  ) {
      inputValue.value = [];
    }

  } else if (inputItem.value.type == 'upload') {



    if (inputItem.value?.uploadField.type == 'string') {

      // 存放图片路径的字符串字段有值，则生成图片数组回显
      if (props.formState[inputItem.value.uploadField.field?.url]) {
        inputValue.value = [];
        inputValue.value[0] = { name: props.formState[inputItem.value.uploadField.field?.name]??'', url: props.formState[inputItem.value.uploadField.field?.url]??''};
        if (inputItem.value.uploadField.params) {
          Object.keys(inputItem.value.uploadField.params).forEach(key => {
            inputValue.value[0][key] = inputItem.value.uploadField.params[key];
          })
        }

      } else {
        inputValue.value = [];
      }

    } else  if (inputItem.value?.uploadField.type == 'list') {

      // 存放图片路径的数组字段有值，则生成图片数组回显
      if (props.formState[inputItem.value['name']]?.length > 0) {
        inputValue.value = [];
        inputValue.value = props.formState[inputItem.value['name']].map(item => {
          const data = {name: item[inputItem.value.uploadField.field?.name]??'', url: item[inputItem.value.uploadField.field?.url]??''}

          if (inputItem.value.uploadField.params) {
            Object.keys(inputItem.value.uploadField.params).forEach(key => {
              data[key] = inputItem.value.uploadField.params[key];
            })
          }
          return data;
        })
      }
    }



  }
  // 执行额外的函数
  // if (inputItem.value.computedFun?.length > 0) {
  //   for (const item of inputItem.value.computedFun) {
  //     if (item.type == 'option') {
  //       inputItem.value.option = await getOptionList(item.api, item.params, item.relationField);
  //     } else if (item.type == 'function') {
  //       console.log(item);
  //       item(props.formState, inputItem.value);
  //     }
  //   }
  // }


}, {immediate: true})
const filterOption = (input: string, option: any, fieldNames: any) => {
  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
function handleChange(ev) {

  if (ev.file.status == 'done') {
    console.log(ev);
    const data = ev.file?.response?.data??ev.file.response.data;
    console.log(data);
    const fileList  = ev.fileList.map(item => {
      if (item.uid == ev.file.uid) {
        return isString(data) ? {name: data, url: data} : data ;
      } else {
        return item;
      }
    })

    inputChange(fileList);
  } else  if (ev.file.status == 'removed') {

    inputChange(ev.fileList);
  }
}


onMounted(() => {

  //  inputChange(props.value);
})




const inputChange = async (ev) => {
  console.log(inputItem.value);
  let data = ev;
  if (inputItem.value.type == 'checkbox') {
    data =  ev.join(',');
    if (data &&  !data[0]  ) {
      data = null;
    }

  }
  if (inputItem.value.type == 'upload') {

    // 存放图片路径的字符串字段有值，则生成图片数组回显
    if (inputItem.value.uploadField.params) {
      Object.keys(inputItem.value.uploadField.params).forEach(key => {

        data[key] = inputItem.value.uploadField.params[key];
      })
    }

  }


  emit('change', inputItem.value, data)
}



// type为
const selectData = ref<any>([])
// （注意）树形结构平铺，且仅获取有完整上下级节点的，没有下级的需要提前disabled 掉，否则会出现意想不到的bug
// 利用递归循环，组合数据结构，最终是一个二维数组
const treeToArr = (_tree: any[], _parent: any['options'] = []) => {
  _tree.forEach((item) => {
    if (!item.children) {
      // value_type 就是你要级联选择器上绑定的 value 键
      selectData.value.push(_parent.concat(item.value))
    } else {
      treeToArr(item.children, _parent.concat(item.value))
    }
  })
}

const changeResourceName = (
    value: string[],
    selectedOptions: Record<string, any>[],
) => {
  selectData.value = []
  selectedOptions.forEach((item: any) => {
    const _parent = item.map((item: any) => item.value)
    // 删除最后一项
    _parent.pop()
    // item[item.length - 1] 传入最后一项，也就是最后选择的那一项
    treeToArr([item[item.length - 1]], _parent)
  })
  // 最终的赋值
  inputValue.value = selectData.value
  console.log(inputValue.value);
  emit('change', inputItem.value, inputValue.value)
}


function handleTableSelectChange(ev,op,  re) {
  console.log(ev, op, re, inputItem);
}




</script>

<style scoped lang="less">
:deep(.ant-input[disabled]), :deep(.ant-picker-input > input[disabled]), :deep(span.ant-select-selection-item) {
  color:#000;
}





</style>
