<template>
 <div>
   <a-space :size="8">
     <a-button @click="handleFormCancel"  style="margin-right: 5px;" :loading="loading" v-if="aCardFormRef.type != 'show' || aCardFormRef.showDefaultFooterCancel === true">
       {{ aCardFormRef.FooterCancelText }}</a-button>
     <a-button type="primary" @click="handleFormSubmit" :loading="loading"   v-if="aCardFormRef.type != 'show' || aCardFormRef.showDefaultFooterSubmit === true">
       {{ aCardFormRef.FooterSubmitText }}</a-button>
   </a-space>

 </div>
</template>

<script setup>

const props = defineProps({
  aCardFormRef: {},
  loading: {default: false},
})

const emits = defineEmits('handleFormCancel', 'handleFormSubmit')

function handleFormCancel() {
  emits('handleFormCancel');
}

function handleFormSubmit() {
  emits('handleFormSubmit');
}

</script>
<style scoped lang="less">

</style>