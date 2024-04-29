
import {ref} from "vue";

export function useTable(props) {

  const tableRef = ref();
  const searchRef = ref();
  const formRef = ref();


  function registerTable(Ref) {
    tableRef.value = Ref;
    Ref.setTableProps(props.table);
  }
  function registerSearch(Ref) {
    searchRef.value = Ref;
    Ref.setSearchProps(props.search);
    console.log(searchRef.value);
  }
  function registerForm(Ref) {
    formRef.value = Ref;
    Ref.setFormProps(props.form);
    console.log(formRef.value);
  }
  function getTableRef(){
    return tableRef.value;
  }

  function getFormRef(){
    return formRef.value;
  }
  function getSearchRef(){
    return searchRef.value;
  }

  const methods = {

    // 获取表格数据
    async getData() {
      return   await getTableRef().getData();

    },

    // 设置分页
    async setCurrentPagination(page, callback) {
      return await getTableRef().setCurrentPagination(page);

    },
    // 获取分页
    async getCurrentPagination() {

      return await getTableRef().getCurrentPagination();
    },

    // 获取总页数
    async getTotalPagination() {

      return await getTableRef().getTotalPagination();
    },
    // 表格重置
    async tableReset() {

      return await getTableRef().reset();
    },

    // 设置参数
    async setTableParams(params) {

      return await getTableRef().setTableParams(params);
    },
    // 获取搜索结果
    async getSearch(params) {

      const validateRes = await getSearchRef().validateSearch();
      console.log(params);
      if(validateRes){
        await getTableRef().setTableParams(params);
        return await getTableRef().getData();
      } else {
        return false;
      }

    },

// 验证搜索参数
    async validateSearch() {

      return await getSearchRef().validateSearch();
    },

    // 重置搜索
    async resetSearch() {

      return await getSearchRef().resetSearch();
    },

    // 获取当前表单值
    async  getFormState() {

      return await getFormRef().getFormState();

    },
    // 获取当前表单 构建数据
    async  getFormRefData() {
      return await getFormRef().getFormRefData();
    },
    // 设置表单显示
    async  setFormVisible() {
      return await getFormRef().setFormVisible();
    },

    // 设置表单状态
    async  handleFormShow(type, formState) {
      return await getFormRef().handleFormShow(type, formState);
    }

  }
  return [ {registerTable,registerSearch, registerForm}, methods];




}
