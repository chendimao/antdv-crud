import {ref} from "vue";
import {message} from "ant-design-vue";
import {isArray} from "../utils/is";

export const   useGetTable = async  (api, params, total = ref(), loading = ref(), dataCallBack = undefined) => {

    let data;
    loading.value = true;
    const res = await api(params).catch((err) => {
        loading.value = false;
    });
    loading.value = false;

    if (dataCallBack) {
        return dataCallBack(res, total);
    } else {

        if (res.code != 0) {
            message.error('查询失败');
            return;
        }
        if (res.data && isArray(res.data)) {
            total.value = res.total || res.data.length;
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
            data = [];
        }
        return data;
    }

}
