// 一些通用增删改查方法

import { message } from 'ant-design-vue';
import { useMessage } from './useMessage';
import { isArray } from "../utils/is";
import {ref} from "vue";

export function useTable(props) {

  const tableRef = ref();
  const formRef = ref();


  function register(Ref) {
    tableRef.value = Ref;
    Ref.setTableProps(props);
  }
  function getTableRef(){
    return tableRef.value;
  }

  const methods = {
    async getData() {
     return await getTableRef().getData();
    },

    async setCurrentPagination(page) {
      return await getTableRef().setCurrentPagination(page);
    },
    async getCurrentPagination() {
      return await getTableRef().getCurrentPagination();
    },
    async getTotalPagination() {
      return await getTableRef().getTotalPagination();
    },




  }
  return [register, methods];




}
