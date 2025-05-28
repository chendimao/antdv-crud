<template>
  <div >
    <a-form :model="config"  v-if="current?.name"   layout="vertical" :labelAlign="'left'" :label-col="{style: {width: '100px'}}" name="basic"   autocomplete="off">
      <a-form-item :label="`栅格数(${current.span})`" style="padding: 10px;">
        <a-slider id="test" v-model:value="current.span"  :max="24" :min="1" />

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
const emits = defineEmits(['update:formConfig'  ]);

watch(() => props.formConfig, (data) => {
  config.value = data;
},{deep: true, immediate: true} )

watch(() => props.currentItem, (data) => {
  current.value = data;


} ,{deep: true, immediate: true })

watch(() => config, (data) => {
  emits('update:formConfig', data.value);
} )

function handleChangeCom(value, option) {
  emits('changeCom', value, option);
}

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