<script setup>
import HelloWorld from './components/HelloWorld.vue';
import Home from './applyManager/index.vue';
import {ConfigProvider} from "ant-design-vue";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
</script>

<template>
  <ConfigProvider :locale="zhCN">

   <router-view></router-view>

  </ConfigProvider>


</template>

<style scoped>

</style>
