// ==================== 基础模型定义 ====================

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

// ==================== computedFun 模型 ====================

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

// ==================== 类型断言函数 ====================

export function isComputedFunction(item: computedFun<"function" | "option">): item is computedFun<"function">;

export function assertIsFunction(item: computedFun<'function'>): asserts item is computedFun<'function'> & { fun: Function };

export function assertIsOption(item: computedFun<'option'>): asserts item is computedFun<'option'> & { 
  api: Function; 
  params: object; 
  relationField: { name: string; value: string } 
};

// ==================== 扩展类型 ====================

export interface ExtendedInputFormModel extends Omit<inputFormModel, 'computedFun' | 'uploadField'> {
  $attrs?: any;
  computedFun?: computedFun<'function' | 'option'>[];
  uploadField?: {
    url: string;
    maxCount?: number;
    initCallback: (formState: any) => any;
    changeCallback?: Function;
    uploadCallback?: Function;
  };
  newData?: Record<string, any>;
  primaryKey?: string;
  beforeXa0?: number;
  option?: Array<{
    value: string | number;
    name: string;
  }>;
  listField?: Array<{
    key: string;
    label: string;
    type: string;
  }>;
  api?: string;
  params?: Record<string, any>;
  sizeField?: string;
  tableField?: string;
  callbackFun?: Function;
  pageField?: string;
  name?: string;
  debounceTime?: number;
  showPage?: boolean;
  searchField?: string;
  css?: string;
  cssId?: string;
} 