import { App, Plugin } from 'vue';
import { ComponentPublicInstance } from 'vue';

// ==================== 基础类型定义 ====================

export interface ColModel {
  style?: object;
  class?: string;
  span?: number;
}

export interface uploadFieldModel {
  url: string;
  params?: object;
  changeCallback: Function; // 上传更改回调
  initCallback: Function; // 初始化回调
  uploadCallback: Function; // 上传前回调
  maxCount?: string | number | undefined | null; // 上传最大数量
}

export interface tableFormModel {
  text: string;
  type: 'text' | 'select' | 'switch' | 'diy';
  name: string;
  style?: object;
  class?: object;
  width?: string;
  fun?: Function;
}

export interface inputFormModel {
  type: 'text' | 'textarea' | 'date' | 'dict' | 'select' | 'treeSelect' | 'cascader' | 'null' | 'checkbox' | 'datetime' | 'time' | 'year' | 'month' | 'upload' | 'switch' | 'origin' | 'list' | 'diyStyle' | 'h' | 'p' | 'seq' | 'slot';
  text?: string; // 字段显示名称
  name?: string; // 字段name
  span?: number; // 显示比例
  style?: string; // style样式
  class?: string; // class样式
  labelCol?: ColModel; // label间距
  format?: string; // 日期格式
  offset?: number;
  wrapperCol?: ColModel; // input间距
  allowClear?: boolean; // allowClear 是否可清除
  option?: object[]; // type为select时 下拉列表
  vertical?: object[]; // type为radio时 是否垂直显示
  rules?: object[]; // 校验规则
  value?: string | number | object | []; // 默认值
  width?: string | number;
  optionType?: 'button' | ''; // type为radiot时 列表样式
  multiple?: boolean; // type为select时 是否多选
  showSearch?: boolean; // 是否可搜索
  searchField?: string; // 搜索字段
  unCheckedValue?: string; // type为switch 禁用字段value
  checkedValue?: string; // type为switch 启用字段value
  checkedChildren?: string; // type为switch 启用字段
  unCheckedChildren?: string; // type为switch 禁用字段
  url?: string; // type为upload时 上传url
  computedFun?: computedFun<'function' | 'option'>[]; // 自定义操作
  initFun?: Function; // 初始化自定义方法
  dynamicParams?: Function;
  uploadField?: uploadFieldModel;
  afterSpan?: string;
  afterText?: string;
  $attrs?: object; // 表单原生属性
  picker?: 'week' | 'month' | 'year';
  show?: boolean | Function; // 是否显示
  disabled?: boolean | Function; // 是否禁用
  rows?: number; // type为textarea时 行数
  placeholder?: string; // 占位符
  accept?: string; // type为upload时 接受上传的文件类型
  slots?: object;
  h?: Function; // 自定义h函数
  css?: string; // 自定义CSS样式
  cssId?: string; // CSS样式ID
}

// computedFun model
export interface computedFun<T extends 'function' | 'option'> {
  type: T;
  api?: T extends 'option' ? Function : never;
  relationField?: T extends 'option' ? { name: string; value: string } : never;
  field?: T extends 'option' ? { name: string; value: string } : never;
  params?: T extends 'option' ? object : never;
  dynamicParams?: T extends 'option' ? Function : never; // 动态参数
  fun?: T extends 'function' ? Function : never; // 只有在 type 为 'function' 时 fun 才是必需的
  immediate?: boolean;
  childrenField?: T extends 'option' ? { field: string; name: string; value: string } : never;
}

// ==================== 全局配置接口 ====================

export interface CrudGlobalConfig {
  allowClear?: boolean;
  showSearch?: boolean;
  isTrim?: boolean;
}

export interface CrudConfig {
  tableConfig?: CrudGlobalConfig;
  searchConfig?: CrudGlobalConfig;
  formConfig?: CrudGlobalConfig;
  inputConfig?: CrudGlobalConfig;
}

// ==================== Hook 类定义 ====================

export declare class useForm {
  private methods: any;
  private formProps: any;
  private _formRef: any;

  constructor(props: any);
  register(methods: any, formRef: any): void;
  get formMethods(): any;
  set formMethods(value: any);
  get formRef(): any;
}

export declare class useTable {
  public methods: any;
  private tableProps: any;
  private _tableRef: any;

  constructor(props: any);
  register(methods: any, tableRef: any): void;
  get tableMethods(): any;
  set tableMethods(value: any);
  get tableRef(): any;
}

export declare class useSearch {
  private methods: any;
  private searchProps: any;
  private _searchRef: any;

  constructor(props: any);
  register(methods: any, searchRef: any): void;
  get searchMethods(): any;
  set searchMethods(value: any);
  get searchRef(): any;
}

export declare class useCrud {
  private methods: any;
  private crudProps: any;
  private _crudRef: any;

  constructor(props: any);
  register(methods: any, crudRef: any): void;
  get crudMethods(): any;
  set crudMethods(value: any);
  get crudRef(): any;
}

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

// ==================== 组件类型定义 ====================

export interface ACrudFormInstance extends ComponentPublicInstance {
  // 表单相关方法
  validate: (callback?: (valid: boolean) => void) => Promise<boolean>;
  validateField: (props?: string | string[], callback?: (valid: boolean) => void) => Promise<boolean>;
  resetFields: (props?: string | string[]) => void;
  clearValidate: (props?: string | string[]) => void;
  scrollToField: (prop: string) => void;
  getFieldsValue: (nameList?: string[]) => any;
  setFieldsValue: (values: any) => void;
}

export interface ACrudTableInstance extends ComponentPublicInstance {
  // 表格相关方法
  refresh: () => void;
  reload: () => void;
  getTableData: () => any[];
  setTableData: (data: any[]) => void;
  getSelection: () => any[];
  clearSelection: () => void;
  toggleRowSelection: (row: any, selected?: boolean) => void;
  toggleAllSelection: () => void;
  sort: (prop: string, order: string) => void;
  filter: (filters: any) => void;
}

export interface ACrudSearchInstance extends ComponentPublicInstance {
  // 搜索相关方法
  search: () => void;
  reset: () => void;
  getSearchForm: () => any;
  setSearchForm: (values: any) => void;
}

export interface ACrudDictInstance extends ComponentPublicInstance {
  // 字典相关方法
  refresh: () => void;
  getValue: () => any;
  setValue: (value: any) => void;
  getOptions: () => any[];
  setOptions: (options: any[]) => void;
}

// ==================== 组件 Props 类型 ====================

export interface ACrudFormProps {
  model?: any;
  rules?: any;
  labelWidth?: string | number;
  labelPosition?: 'left' | 'right' | 'top';
  size?: 'large' | 'default' | 'small';
  disabled?: boolean;
  showMessage?: boolean;
  inlineMessage?: boolean;
  statusIcon?: boolean;
  validateOnRuleChange?: boolean;
  hideRequiredAsterisk?: boolean;
  scrollToError?: boolean;
  scrollIntoViewOptions?: any;
  [key: string]: any;
}

export interface ACrudTableProps {
  columns?: any[];
  dataSource?: any[];
  pagination?: any;
  loading?: boolean;
  rowKey?: string | Function;
  rowSelection?: any;
  scroll?: any;
  bordered?: boolean;
  size?: 'large' | 'middle' | 'small';
  tableLayout?: 'auto' | 'fixed';
  [key: string]: any;
}

export interface ACrudSearchProps {
  items?: inputFormModel[];
  formState?: any;
  formData?: any;
  [key: string]: any;
}

export interface ACrudDictProps {
  api?: Function;
  params?: any;
  valueField?: string;
  labelField?: string;
  childrenField?: string;
  multiple?: boolean;
  [key: string]: any;
}

// ==================== 事件类型 ====================

export interface CrudEvents {
  'form-change': (formData: any) => void;
  'form-submit': (formData: any) => void;
  'form-reset': () => void;
  'table-change': (pagination: any, filters: any, sorter: any) => void;
  'table-selection-change': (selection: any[]) => void;
  'search-change': (searchData: any) => void;
  'search-submit': (searchData: any) => void;
  'dict-change': (value: any, option: any) => void;
}

// ==================== 主模块导出 ====================

declare const _default: {
  install: (app: App, config?: CrudConfig) => void;
  useForm: typeof useForm;
  useTable: typeof useTable;
  useSearch: typeof useSearch;
  useCrud: typeof useCrud;
  config: (Vue: any, config: CrudConfig) => void;
  crudUtil: CrudUtil;
};

export default _default;

// ==================== 全局类型扩展 ====================

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $crudUtil: CrudUtil;
    $crudGlobalTableConfig: CrudGlobalConfig;
    $crudGlobalSearchConfig: CrudGlobalConfig;
    $crudGlobalFormConfig: CrudGlobalConfig;
    $crudGlobalInputConfig: CrudGlobalConfig;
  }
}

// ==================== 工具函数类型断言 ====================

export function isComputedFunction(item: computedFun<"function" | "option">): item is computedFun<"function">;
export function assertIsFunction(item: computedFun<'function'>): asserts item is computedFun<'function'> & { fun: Function };
export function assertIsOption(item: computedFun<'option'>): asserts item is computedFun<'option'> & { api: Function; params: object; relationField: { name: string; value: string } }; 