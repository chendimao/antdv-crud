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
export const useGetTable = async (api, params, dataCallBack = undefined) => {
  let loading = true;
  let total = 0;
  let data;
  const res = await api(params).catch((err) => {
    loading = false;
    message.error(`查询失败:${err}`);
  });
  console.log(res);
  if (res.code == 0) {
    // message.success('查询成功');
  } else {
    message.error('查询失败');
  }

  loading = false;


  if (dataCallBack ) {
    return  dataCallBack (res);
  } else {
    if (res.data && isArray(res.data)) {
      total = res.total;
      data = res.data;
    } else if (res?.data?.content?.length > 0) {
      total = res.data.total;
      data = res.data.content;
    } else if (res?.data?.data?.content?.length > 0) {
      total = res.data.data.total;
      data = res?.data?.data.content;
    } else if (res?.data?.data?.length > 0) {
      total = res.data.total;
      data = res?.data?.data;
    } else if (res?.data?.list?.length > 0) {
      total = res.data.total;
      data = res?.data?.list;
    } else {
      total = 0;
      data =  res || [];
    }
    return {
      data,
      total,
      loading,
    };
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
