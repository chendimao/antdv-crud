<template>
 <div  >
   <a-form :model="config" v-if="current?.name"   layout="vertical" :labelAlign="'left'" :label-col="{style: {width: '100px'}}" name="basic"   autocomplete="off">
     <a-form-item label="控件" v-if="current?.type != 'grid'">
       <a-select v-model:value="current.type" @change="handleChangeCom" >
         <a-select-option v-for="(item, index) in component" :key="index" :value="item.type" >
           {{item.text}}
         </a-select-option>
       </a-select>

     </a-form-item>
     <a-form-item label="字段标识">
       <a-input :disabled="true"  v-model:value="current.id"/>
     </a-form-item>
     <a-form-item label="标签名称" v-if="current?.type != 'grid'">
       <a-input  v-model:value="current.text"/>
     </a-form-item>
     <!-- <a-form-item label="栅格数量" v-else> 
      <a-slider  v-model:value="gridLength" @change="changeGridLength"  :max="10" :min="1" /> 
     </a-form-item> -->

     <a-form-item label="标签对齐方式">
       <a-radio-group  v-model:value="current.labelAlign">
         <a-radio value="left">左对齐</a-radio>
         <a-radio value="right">左对齐</a-radio>
       </a-radio-group>
     </a-form-item>
     <a-form-item label="是否必填">
       <a-switch  v-model:checked="current.isRequired"   @change="handleChangeRequire">

       </a-switch>
     </a-form-item>
     <a-form-item label="必填提示信息" v-if="current.isRequired">
       <a-input v-model:value="requireItem.message" />

     </a-form-item>
   </a-form>
   <a-empty v-else description="未选择控件">

   </a-empty>
 </div>

</template>


<script setup>
import {defineProps, defineEmits, ref, watch} from 'vue';
import {isArray} from "../../utils/is";
const props = defineProps({
  component: {},
  formConfig:{},
  currentItem:{},
})
const config = ref();
const current = ref();
const requireItem = ref();
const requireIndex = ref();
const gridLength = ref(2);
const emits = defineEmits(['update:formConfig'  ]);

watch(() => props.formConfig, (data) => {
  config.value = data;
},{deep: true} )

watch(() => props.currentItem, (data) => {
  current.value = data;
 // gridLength.value = current.value.column.length;
  let isRequireTag = false;

  if (!isArray(current.value.rules)) {
    current.value.rules = [];
  }

  current.value.rules.some((item, index) => {
    if (item?.required === true) {
      isRequireTag = true;
      requireItem.value = item;
      requireIndex.value = index;
      return true;
    }
  })


  current.value.isRequired = isRequireTag;
} ,{deep: true })

watch(() => config, (data) => {
  emits('update:formConfig', data.value);
} )

function handleChangeCom(value, option) {
  emits('changeCom', value, option);
}

// 更改栅格数量
// function changeGridLength(value) {
//   if(current.value?.column?.length > value) {
//     current.value?.column?.splice(value, current.value?.column?.length - value);
//   } else {
//     console.log(value, current.value.column[0].span = 8);
//       current.value?.column.map(item => {
//         item.span =   Math.floor(24 / value);
//         console.log(item.span);
//         return item;
//       }); 
//       current.value?.column?.push({
//          span: 24 / value,
//          children: []
//        })
  
//   }
// }

/// 是否必填
function handleChangeRequire(ev) {
  console.log(ev);
  if (ev) {

    let isRequireTag = false;
    current.value.rules.some((item, index) => {
      if (item?.required === true) {
        isRequireTag = true;
        requireItem.value = item;
        requireIndex.value = index;
        return true;
      }
    })
    if (!isRequireTag) {
       requireItem.value = {
         required: true,
         message: `${current.value.text}不能为空`

       };
      current.value.rules.push(requireItem.value);
      requireIndex.value = current.value.rules.length - 1;
    }
  }
}

</script>
<style scoped lang="less">

</style>