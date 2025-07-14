import { App, Plugin } from 'vue';

// ==================== 工具函数类型 ====================

export interface CrudUtil {
  noop: () => void;
  getPopupContainer: (node?: HTMLElement) => HTMLElement;
  setObjToUrlParams: (baseUrl: string, obj: any) => string;
  formatDate: (dateInput: any, format?: string) => string;
  deepMerge: <T = any>(src?: any, target?: any) => T;
  openWindow: (url: string, opt?: { target?: string; noopener?: boolean; noreferrer?: boolean }) => void;
  getDynamicProps: <T, U>(props: T) => Partial<U>;
  withInstall: <T>(component: T, alias?: string) => T & Plugin;
  deepCopy: (obj: any, clones?: WeakMap<any, any>) => any;
  valueToName: (arr: any[], value: any, targetKey: string, returnKey: string) => any;
  getOptionList: (api: Function, params: any, relationField: any, childrenField?: any, dataCallback?: Function) => Promise<any[]>;
  debounceRef: (value: any, delay: number) => any;
  debounce: (func: Function, wait: number, immediate?: boolean) => Function;
}

// ==================== 类型检查函数 ====================

export function isArray(value: any): value is any[];
export function isObject(value: any): value is object;
export function isNumber(value: any): value is number;
export function isString(value: any): value is string;
export function isBoolean(value: any): value is boolean;
export function isFunction(value: any): value is Function;
export function isDate(value: any): value is Date;
export function isNull(value: any): value is null;
export function isUndefined(value: any): value is undefined;

// ==================== 样式加载函数 ====================

export interface LoadStyleOptions {
  id?: string;
  replace?: boolean;
}

export function loadStyle(css: string, id?: string, replace?: boolean): void;
export function removeStyle(id: string): void;

// ==================== 工具函数导出 ====================

export const noop: () => void;
export function getPopupContainer(node?: HTMLElement): HTMLElement;
export function setObjToUrlParams(baseUrl: string, obj: any): string;
export function formatDate(dateInput: any, format?: string): string;
export function deepMerge<T = any>(src?: any, target?: any): T;
export function openWindow(url: string, opt?: { target?: string; noopener?: boolean; noreferrer?: boolean }): void;
export function getDynamicProps<T, U>(props: T): Partial<U>;
export const withInstall: <T>(component: T, alias?: string) => T & Plugin;
export function deepCopy(obj: any, clones?: WeakMap<any, any>): any;
export const valueToName: (arr: any[], value: any, targetKey: string, returnKey: string) => any;
export const getOptionList: (api: Function, params: any, relationField: any, childrenField?: any, dataCallback?: Function) => Promise<any[]>;
export const debounceRef: (value: any, delay: number) => any;
export function debounce(func: Function, wait: number, immediate?: boolean): Function;

// ==================== 类型定义 ====================

export interface TargetContext {
  [key: string]: any;
}

export interface Recordable {
  [key: string]: any;
} 