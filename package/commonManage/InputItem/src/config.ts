import { inject } from 'vue';

// 全局配置接口
export interface CrudGlobalConfig {
  allowClear?: boolean;
  showSearch?: boolean;
  isTrim?: boolean;
}

// 全局配置 key
export const CRUD_GLOBAL_CONFIG = Symbol('crudGlobalConfig');

// 获取全局配置
export function useCrudGlobalConfig() {
  return inject<CrudGlobalConfig>(CRUD_GLOBAL_CONFIG, {
    allowClear: true,
    showSearch: true,
    isTrim: true
  });
} 