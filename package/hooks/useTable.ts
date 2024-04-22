// 一些通用增删改查方法

import { message } from 'ant-design-vue';
import { useMessage } from './useMessage';
import { isArray } from "../utils/is";
import {ref} from "vue";
const { createConfirm } = useMessage();

// 删除
export const useDeleteTable = async (Function, id) => {
  return new Promise((resolve) => {
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '确定删除吗？',
      onOk: async () => {
        const res = await Function(id);

        if (res.code == 0) {
          message.success('删除成功');
        } else {
          message.error('删除失败');
        }
        resolve(true);
      },
    });
  });
};

// 查询
export const useGetTable = async (api, params, total = ref(), loading = ref(),dataCallBack = undefined ) => {

  let data;
  loading.value = true;
  const res = await api(params);
  loading.value = false;
  console.log(res);

  if (dataCallBack ) {
    console.log(dataCallBack);
    return  dataCallBack (res, total);
  } else {

    if (res.code != 0) {
      message.error('查询失败');
      return;
    }
    console.log(res);

    if (res.data && isArray(res.data)) {
      total.value = res.total;
      data = res.data;
    } else if (res?.data?.content?.length > 0) {
      total.value = res.data.total;
      data = res.data.content;
    } else if (res?.data?.data?.content?.length > 0) {
      total.value = res.data.data.total;
      data = res?.data?.data.content;
    } else if (res?.data?.data?.length > 0) {
      total.value = res.data.total;
      data = res?.data?.data;
    } else if (res?.data?.list?.length > 0) {
      total = res.data.total;
      data = res?.data?.list;
    } else {
      total.value = 0;
      data =    [];
    }
    console.log(data, total.value);
    return data;
  }


};
// 新增
export const useInsertTable = async (Function, params, loading) => {
  loading.value = true;
  const res = await Function(params);

  if (res.code == 0) {
    message.success('保存成功');
  } else {
    message.error('保存失败');
  }
  loading.value = false;
  return res;
};
