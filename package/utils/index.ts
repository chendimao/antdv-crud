import type { App, Plugin } from 'vue';

import { unref, customRef} from 'vue';
import {isArray, isObject} from './is';
import {isNumber} from "./is";
import {useGetTable} from "../hooks/useGetData";

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



export function formatDate(dateInput, format = 'yyyy-MM-dd') {

  if (!dateInput) {
    return;
  }
  let date;

  // 如果 dateInput 是字符串，且格式为 YYYY-MM-DD HH:mm:ss
  if (typeof dateInput === 'string') {
    const dateTimeParts = dateInput.split(' ');
    if (dateTimeParts.length === 2) {
      const dateParts = dateTimeParts[0].split('-');
      const timeParts = dateTimeParts[1].split(':');

      if (dateParts.length === 3 && timeParts.length === 3) {
        date = new Date(
            parseInt(dateParts[0], 10),    // 年
            parseInt(dateParts[1], 10) - 1, // 月，从0开始计数
            parseInt(dateParts[2], 10),    // 日
            parseInt(timeParts[0], 10),    // 时
            parseInt(timeParts[1], 10),    // 分
            parseInt(timeParts[2], 10)     // 秒
        );
      }
    }
  }

  // 如果 dateInput 是 Date 对象或无效字符串，则直接转换
  if (!date || isNaN(date.getTime())) {
    date = new Date(dateInput);
  }

  // 检查 date 是否为有效的 Date 对象
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const map = {
    'MM': ('0' + (date.getMonth() + 1)).slice(-2),
    'dd': ('0' + date.getDate()).slice(-2),
    'yyyy': date.getFullYear(),
    'YYYY': date.getFullYear(),  // 添加对 YYYY 的支持
    'HH': ('0' + date.getHours()).slice(-2),
    'mm': ('0' + date.getMinutes()).slice(-2),
    'ss': ('0' + date.getSeconds()).slice(-2)
  };
  return format.replace(/MM|dd|yyyy|YYYY|HH|mm|ss/gi, matched => map[matched]);
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

export function deepCopy(obj, clones = new WeakMap()) {
  // 如果不是对象或者是 null，则直接返回该值
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // 如果已经复制过该对象，则直接返回复制后的对象
  if (clones.has(obj)) {
    return clones.get(obj);
  }

  // 创建一个新对象，用于存储深拷贝的结果
  let newObj = Array.isArray(obj) ? [] : {};

  // 将当前对象记录到 clones 中，防止循环引用
  clones.set(obj, newObj);

  // 复制函数
  if (typeof obj === 'function') {
    // 如果是函数，则直接复制函数
    newObj = obj.bind({});
  } else {
    // 遍历对象的每个属性
    for (let key in obj) {
      // 递归地对每个属性进行深拷贝
      newObj[key] = deepCopy(obj[key], clones);
    }
  }

  return newObj;
}

export const valueToName = (arr, value , targetKey, returnKey) => {

  if (isArray(value)) {
    let valueArr = [];

    value.forEach(item => {
      arr.some(cItem => {
        const flag =  cItem[targetKey] === item
        if (flag) {
          valueArr.push(cItem[returnKey]);
        }
        return flag;
      });

    })
    return valueArr;
  } else {
    for (const arrElement of arr) {
      if (arrElement[targetKey] == value) {
        return arrElement[returnKey];
      }
    }
  }


}



/**
 *
 * @param api 请求接口
 * @param params 请求参数
 * @param relationField 映射关联字段
 * @param childrenField 树结构列表参数
 */

export const getOptionList = async (api, params, relationField, childrenField = {field: 'children', label: 'label', value: 'value'}) => {
  console.log(api);
  const data = await useGetTable(api, params);
  return data.map((item) => {
    const returnValue = {};
    if (relationField) {
      returnValue['label'] = item[relationField.label];
      returnValue['value'] = item[relationField.value];

      for (const relationFieldKey in relationField) {
        if (relationFieldKey !== 'label' && relationFieldKey !== 'label') {
          returnValue[relationFieldKey] = item[relationField[relationFieldKey]];
        }
      }


      if (childrenField && item[childrenField['field']]) {
        returnValue[childrenField['field']] = item[childrenField['field']]?.map(child => {
          return {
            label: child[childrenField['label']],
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



/**
 * @description 自定义ref实现防抖
 * @param {String} value
 * @param {Number} delay
 * @returns
 */
export const debounceRef  = (value,delay) => {
  let timer;
  return customRef((track,trigger) => ({
    get(){
      // 依赖收集
      track();
      return value
    },
    set(val){
      clearTimeout(timer);
      timer = setTimeout(() => {
        value = val;
        // 派发更新
        trigger()
      },delay)
    }
  }))
}

export function debounce(func, wait, immediate = false) {
  let timeout; // 定义一个计时器变量，用于延迟执行函数
  return function (...args) { // 返回一个包装后的函数
    const context = this; // 保存函数执行上下文对象
    const later = function () { // 定义延迟执行的函数
      timeout = null; // 清空计时器变量
      if (!immediate) func.apply(context, args); // 若非立即执行，则调用待防抖函数
    };
    const callNow = immediate && !timeout; // 是否立即调用函数的条件
    clearTimeout(timeout); // 清空计时器
    timeout = setTimeout(later, wait); // 创建新的计时器，延迟执行函数
    if (callNow) func.apply(context, args); // 如果满足立即调用条件，则立即执行函数
  };
}
export default {
  valueToName,
  getOptionList
}
