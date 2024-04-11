import type { App, Plugin } from 'vue';

import { unref } from 'vue';
import { isObject } from '/@/utils/is';
import {isNumber} from "./is";

export const noop = () => {};

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
}

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}


export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as T & Plugin;
};



export const valueToName = (arr, value , targetKey, returnKey) => {

  for (const arrElement of arr) {
    if (arrElement[targetKey] == value) {
      return arrElement[returnKey];
    }
  }
}



/**
 *
 * @param api 请求接口
 * @param params 请求参数
 * @param relationField 映射关联字段
 * @param request 请求类型
 * @param paramsType 请求参数类型
 */

export const getOptionList = async (curItem) => {
  const { proxy, api, params = {}, relationField, request = 'post', paramsType, childrenField } = curItem;
  let requestParamsType = '';
  if (paramsType === '') {
    request == 'get' ? requestParamsType = 'query' : requestParamsType = 'body';
  } else {
    requestParamsType = paramsType;
  }
  const requestData = requestParamsType == 'query' ? { url: `${setObjToUrlParams(api, params)}` } : { url: `${api}`, params };

  const res: any = await proxy.$http[request](requestData);

  console.log(res);
  let data = [];
  if (res.data.length > 0) {
    data = res.data;
  } else if (res?.data?.content?.length > 0) {
    data = res?.data?.content;
  } else if (res?.data?.data?.length > 0) {
    data = res?.data.data;
  } else if (res?.data?.data?.content?.length > 0) {
    data = res.data.data.content;
  } else {
    data = [];
  }
  return data.map((item) => {
    const returnValue = {};
    if (relationField) {
      returnValue['name'] = item[relationField[0]];
      returnValue['value'] = item[relationField[1]];

      if (childrenField && item[childrenField['field']]) {
        returnValue[childrenField['field']] = item[childrenField['field']]?.map(child => {
          return {
            name: child[childrenField['name']],
            value: child[childrenField['value']]
          }
        })
      }

      return returnValue;
    } else {
      return item;
    }
  });
};
