// 一些通用增删改查方法

import { message } from 'ant-design-vue';
import { useMessage } from '../web/useMessage';
import { isArray } from "../../utils/is";
const { createConfirm } = useMessage();

// 删除
export const deleteData = async (Function, id) => {
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
export const useTableGetData = async (Function, params, loading, total) => {
  loading.value = true;
  const res = await Function(params).catch((err) => {
    loading.value = false;
  });
  console.log(res);
  if (res.code == 0) {
    // message.success('查询成功');
  } else {
    message.error('查询失败');
  }

  loading.value = false;
  total.value = res?.data?.total || res?.total || res?.data?.data?.total || [];

  if (res.data && isArray(res.data)) {
    total.value = res.total;
    return res.data;
  } else if (res?.data?.content?.length > 0) {
    total.value = res.data.total;
    return res?.data?.content;
  } else if (res?.data?.data?.content?.length > 0) {
    total.value = res.data.data.total;
    return res?.data?.data.content;
  } else if (res?.data?.data?.length > 0) {
    total.value = res.data.total;
    return res?.data?.data;
  } else if (res?.data?.list?.length > 0) {
    total.value = res.data.total;
    return res?.data?.list;
  } else {
    total.value = 0;
    return  res || [];
  }
};
// 新增
export const useInsertData = async (Function, params, loading) => {
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
