<template>
      <span class="aCardInput">
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
                      :disabled="isDisabled"
                      size="default"
                      :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
                      v-model:value="inputValue"
                      v-bind="item.$attrs"
                      @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                      type="text" >
                  <template #addonAfter v-if="item.afterText">
                      {{item.afterText}}
                  </template>

                  </a-input>
                </template>
                <template v-if="item.type == 'number'">

                  <a-input-number
                      style="width: 100%;"
                      :disabled="isDisabled"
                      :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
                      v-model:value="inputValue"
                      @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                      v-bind="item.$attrs"
                        >
                  <template #addonAfter v-if="item.afterText">
                      {{item.afterText}}
                  </template>

                  </a-input-number>
                </template>
                <template v-else-if="item.type == 'textarea'">
                  <a-textarea    :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"  v-bind="item.$attrs" :disabled="isDisabled"
                                size="default"
                                 @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                                v-model:value="inputValue" :rows="item.rows" />
                </template>
                <template v-else-if="item.type == 'select'">

                  <a-select

                      size="default"
                      v-model:value="inputValue"
                      :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
                      :show-search="$crudGlobalInputConfig?.showSearch"
                      :disabled="isDisabled"
                      :options="item.option"
                      :filter-option="filterOption"
                      @change="handleSelectChange"
                      @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                      v-bind="item.$attrs"
                      style="width: 100%;border: 0;"
                      :fieldNames="{label: 'name', value: 'value'}"
                  >

<!--                    <a-select-option v-for="data in item.option" :value="data.value">{{ data.name }}</a-select-option>-->
                  </a-select>
                </template>
                <template v-else-if="item.type == 'treeSelect'">

                  <a-tree-select

                      v-model:value="inputValue"
                      :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
                      :show-search="$crudGlobalInputConfig?.showSearch"
                      :disabled="isDisabled"
                      :tree-data="item.option"
                      @change="handleTreeSelectChange"
                      @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                      v-bind="item.$attrs"
                      style="width: 100%;border: 0;"
                  >

<!--                    <a-select-option v-for="data in item.option" :value="data.value">{{ data.name }}</a-select-option>-->
                  </a-tree-select>
                </template>
                <template v-else-if="item.type == 'cascader'">
                  <a-cascader

                      size="default"
                      v-model:value="inputValue"
                      :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
                      :show-search="$crudGlobalInputConfig?.showSearch ? {filter: cascaderFilterOption} : false"
                      :disabled="isDisabled"
                      @change="changeResourceName"
                      :multiple="!!item.multiple"
                      :options="item.option"
                      @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                      style="width: 100%;border: 0;"
                      :fieldNames="{label: 'name', value: 'value'}"
                      v-bind="item.$attrs"
                  />


                  <!--                    <a-select-option v-for="data in item.option" :value="data.value">{{ data.name }}</a-select-option>-->


                </template>



                <template v-else-if="item.type == 'checkbox'">
                  <a-select

                      size="default"
                      mode="multiple"
                      v-model:value="inputValue"
                      :disabled="isDisabled"
                      @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                      style="width: 100%;border: 0;height: 30px;border-bottom: 1px solid #ccc;"
                      v-bind="item.$attrs"
                  >
                    <a-select-option v-for="data in item.option" :value="data.value">{{ data.name }}</a-select-option>
                  </a-select>


                </template>
                <template v-else-if="item.type == 'datetime'">
                  <a-date-picker    
                      style="width: 100%;" 
                      v-model:value="inputValue"
                      valueFormat="YYYY-MM-DD HH:mm:ss"
                      show-time format="YYYY-MM-DD HH:mm:ss"
                      :disabled="isDisabled"
                      size="default"
                      @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                      :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
                      v-bind="item.$attrs"/>
                </template>
                <template v-else-if="item.type == 'date'">
                  <a-date-picker
                      style="width: 100%;"
                      v-model:value="inputValue"
                      valueFormat="YYYY-MM-DD"
                      format="YYYY-MM-DD"
                      :disabled="isDisabled"
                      size="default"
                      @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                      :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
                      v-bind="item.$attrs"/>
                </template>
                <template v-else-if="item.type == 'year'">
                  <a-date-picker
                      style="width: 100%;"
                      v-model:value="inputValue"
                      valueFormat="YYYY"
                      format="YYYY"
                      picker="year"
                      :disabled="isDisabled"
                      size="default"
                      @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                      :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
                      v-bind="item.$attrs"/>
                </template>
                <template v-else-if="item.type == 'month'">
                  <a-date-picker
                      style="width: 100%;"
                      v-model:value="inputValue"
                      valueFormat="MM"
                      format="MM"
                      picker="month"
                      :disabled="isDisabled"
                      size="default"
                      @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                      :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
                      v-bind="item.$attrs"
                  />
                </template>
                <template v-else-if="item.type == 'daterange'">
                  <a-range-picker
                      style="width: 100%;"
                      :picker="item.picker"
                      v-model:value="inputValue"
                      :disabled="isDisabled"
                      size="default"
                      @blur="validateFun(item.name, { trigger: 'blur' }).catch(() => {})"
                      :format="item?.format??item.picker == 'year' ? 'YYYY' :item.picker == 'month' || item.picker == 'quarter' ? 'YYYY-MM' : 'YYYY-MM-DD' "
                      :valueFormat="item?.valueFormat??item.picker == 'year' ? 'YYYY' :item.picker == 'month' || item.picker == 'quarter' ? 'YYYY-MM' : 'YYYY-MM-DD' "
                      :allowClear="item.allowClear??$crudGlobalInputConfig?.allowClear"
                      v-bind="item.$attrs"
                  />
                </template>
                <template v-else-if="item.type == 'upload' && isArray(inputValue)">
                  <a-upload

                      v-model:file-list="inputValue"
                      :action="item.uploadField.url"
                      :maxCount="item.uploadField.maxCount??100"
                      :disabled="isDisabled"
                      list-type="picture-card"
                      @change="handleFileChange"
                      v-bind="item.$attrs"
                  >
                    <div  >
                      <plus-outlined />
                      <div style="margin-top: 8px">上传</div>
                    </div>
                  </a-upload>
                </template>

                <template v-else-if="item.type == 'switch'">
                  <a-switch      v-model:checked="inputValue"  :disabled="isDisabled"  :unCheckedValue="item.unCheckedValue" :checkedValue="item.checkedValue" :checked-children="item.checkedChildren" :un-checked-children="item.unCheckedChildren" v-bind="item.$attrs"/>
                </template>
                <template v-else-if="item.type == 'radio'">
                     <a-radio-group v-model:value="inputValue" :disabled="isDisabled"   v-bind="item.$attrs">

                      <a-radio-button v-if="item.optionType == 'button'" :value="radio.value"   v-for="radio in item.option">{{ radio.name }}</a-radio-button>
                      <a-radio v-else :value="radio.value" :style="item.vertical === true ? radioStyle : {}" v-for="radio in item.option">{{ radio.name }}</a-radio>

                    </a-radio-group>

                </template>
                <template v-else-if="item.type == 'origin'">
                  {{inputValue}}
                </template>
               <template v-else-if="item.type == 'list'">
                  <vxe-table

                      border
                      show-overflow
                      :data="inputValue"
                      ref="xTable"
                      :column-config="{resizable: true}"
                      :edit-config="!isDisabled ? {trigger: 'click', mode: 'cell'} : {}"
                      v-bind="item.$attrs"
                  >
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

                <template v-else-if="item.type == 'slot'">
                   <slot :name="item.name"  :data="{formState, inputValue, item, isDisabled, validateFun}"  ></slot>
                </template>
                <template v-else-if="item.type == 'dict'">
                  <a-crud-dict :api="item.api"
                               :params="item.params"
                               :sizeField="item.sizeField"
                               :tableField="item.tableField"
                               :callbackFun="item.callbackFun"
                               :pageField="item.pageField"
                               :name="item.name"
                               :showPage="item.showPage"
                               v-model="inputValue"
                               @change="handleDictChange"/>
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
  defineProps,
  getCurrentInstance,
  onUnmounted
} from "vue";
import {isArray, isDate, isNull, isNumber, isObject, isString} from "../../../utils/is";
import {PlusOutlined} from "@ant-design/icons-vue";
import {getOptionList, setObjToUrlParams, valueToName} from "../../../utils";
import {Api} from "../../../hooks/crud/api";
import {inputFormModel} from "../../../model";
import ACrudDict from "../../aCrudDict.vue";

const { proxy } = getCurrentInstance();

const props = defineProps({
  value: {},
  validateFun: {},
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
const timeout = ref();
const radioStyle = ref({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
});



watch(() => props.item, async (data) => {

  inputItem.value = data;
  // 执行额外的函数
  if (inputItem.value.computedFun?.length > 0) {
    for (const item of inputItem.value.computedFun) {
      if (item.type == 'option') {
        let params = item.params??{};
        if(item.dynamicParams) {
          params = {...params, ...item.dynamicParams(props.formState)};
        }
        inputItem.value.option = await getOptionList(item.api, params, item.relationField, item.childrenField);
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

    inputValue.value = inputItem.value.uploadField.initCallback(props.formState);
    console.log(inputValue.value);




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

watch(() => inputValue.value, (data) => {

  if (proxy.$crudGlobalInputConfig?.isTrim === true) {
    inputValue.value = data?.trim ? data.trim() : data ;
  }
  inputChange(data);
})


const filterOption = (input: string, option: any, fieldNames: any) => {

  return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const cascaderFilterOption = (inputValue, path) => {

    return path.some(option => {
      if (option.name) {
        return option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      } else {
        return false;
      }

    });

};


const handleFileChange = (ev) => {
  console.log(ev);
  if (ev.file.status === 'done' || ev.file.status === 'removed') {
    emit('change', inputItem.value, ev);
    return;
  } else {
    return;
  }
}

onMounted(() => {

  //  inputChange(props.value);
})


const handleDictChange = (value, data) => {
  console.log(value, data, 'dictchange')

    emit('change', inputItem.value, value,  data);
    return;

}
const handleTreeSelectChange = (value, label, extra) => {
  console.log(value, label,  extra, 'tree change')

    emit('change', inputItem.value, value,  extra.triggerNode?extra.triggerNode.props:extra);
    return;

}

const handleSelectChange = (value, label) => {
  console.log(value, label, 'select change')
    emit('change', inputItem.value, value, label);
    return;

}


const inputChange = async (ev) => {
  console.log(ev, inputItem.value, inputValue, 446);

  // dict  handleDictChange 方法处理
  // upload  handleFileChange 方法处理
  // select handleSelectChange 处理
  // treeSelect handleTreeSelectChange 处理
  if (['upload', 'dict', 'select', 'treeSelect'].includes(inputItem.value.type)) {
    return
  }





  let data = ev;


  if (inputItem.value.type == 'checkbox') {
    data =  ev.join(',');
    if (data &&  !data[0]  ) {
      data = null;
    }

  }




  emit('change', inputItem.value, data);

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
.ant-input[disabled], .ant-picker-input > input[disabled], span.ant-select-selection-item {
  color:#000;
}

.ant-select-multiple .ant-select-selection-item-content {
  color:#000;
}





</style>
