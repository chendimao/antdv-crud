<template>
<a-modal :visible="modalVisible" @cancel="close">
  {{formState}}
</a-modal>
</template>

<script setup>
import {Modal as aModal } from 'ant-design-vue';
import {onMounted, ref, watch} from "vue";
const props = defineProps({
  visible: {type: Boolean, default: false},
  formState: {type: Object}
})
const modalVisible = ref(false);



onMounted(() => {
  modalVisible.value = props.visible;
})


const emits = defineEmits(['update:visible', 'update:formState']);

const close = () => {
  modalVisible.value = false;
  emits('update:visible', false);
}

</script>
<style scoped lang="less">

</style>