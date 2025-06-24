import { ref } from 'vue';

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

// ==================== 其他 Hook 类型 ====================

export interface UseGetDataOptions {
  api: Function;
  params?: any;
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export interface UseMessageOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose?: () => void;
}

// ==================== Hook 函数类型 ====================

export function useGetTable(options: UseGetDataOptions): {
  data: any;
  loading: boolean;
  error: any;
  refresh: () => void;
  run: (params?: any) => void;
};

export function useMessage(): {
  success: (message: string, options?: Partial<UseMessageOptions>) => void;
  error: (message: string, options?: Partial<UseMessageOptions>) => void;
  warning: (message: string, options?: Partial<UseMessageOptions>) => void;
  info: (message: string, options?: Partial<UseMessageOptions>) => void;
}; 