
import {ref} from "vue";

export function useTable(props) {

  const tableRef = ref();
  const searchRef = ref();
  const formRef = ref();

  function getTableRef(){
    return tableRef.value;
  }

  function getFormRef(){
    return formRef.value;
  }
  function getSearchRef(){
    return searchRef.value;
  }



  function registerTable(Ref) {
    tableRef.value = Ref;
    Ref.setTableProps(props.table, {searchRef, formRef});
  }
  function registerSearch(Ref) {
    searchRef.value = Ref;
    Ref.setSearchProps(props.search, {tableRef, formRef});
    console.log(searchRef.value);
  }
  function registerForm(Ref) {
    formRef.value = Ref;
    Ref.setFormProps(props.form, {tableRef, searchRef});
    console.log(formRef.value);
  }

  const methods = {



    // 发送请求获取表格数据并返回
    async getData() {
      return   await getTableRef().getData();

    },

    // 获取当前表格数据
     getTableData() {
      return  getTableRef().getTableData();
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
    async  setFormVisible(visible = false) {
      return await getFormRef().setFormVisible(visible);
    },

    // 设置表单状态
    async  handleFormShow(type, formState = undefined) {
      return await getFormRef().handleFormShow(type, formState);
    },

    // 获取form resetForm
    async getResetFormData() {
      return await getFormRef().getResetFormData();
    },
    // 获取search resetForm
    async getSearchResetForm() {
      return await getSearchRef().getResetParams();
    },

    // 当前 search参数
    async getSearchParams() {
      return await getSearchRef().getSearchParams();
    },
    //设置search参数
    async setSearchParams(params = {}) {
      return await getSearchRef().setSearchParams(params);
    },
    // 合并form resetForm
    async mergeFormResetParams(params = {}) {
      return await getFormRef().mergeResetFormData(params);
    },
    // 合并form 参数
    async mergeFormData(params = {}) {
      return await getFormRef().mergeFormData(params);
    },
    // 保存 form
    async handleFormSubmit(params = {}) {
      return await getFormRef().handleFormSubmit(params);
    },
    // 退出 form
    async handleFormCancel(params = {}) {
      return await getFormRef().handleFormCancel();
    },
    // 合并search resetForm
    async mergeSearchResetParams(params = {}) {
      return await getSearchRef().mergeResetParams(params);
    },
    // 合并search当前参数
    async mergeSearchParams(params = {}) {
      return await getSearchRef().mergeSearchParams(params);
    },

    // 动态设置table column
    async setTableColumns(params = {}) {
      return await getTableRef().setTableColumns(params);
    },
    // 合并table props
    async mergeTableProps(props = {}) {
      return await getTableRef().mergeTableProps(props);
    },
    // 动态设置formdata
    async setFormData(params = []) {
      return await getFormRef().setFormData(params);
    },
    // 动态设置 search formdata
    async setSearchFormData(params = []) {
      return await getSearchRef().setSearchFormData(params);
    }

  }
  return [ {registerTable,registerSearch, registerForm}, methods];




}
