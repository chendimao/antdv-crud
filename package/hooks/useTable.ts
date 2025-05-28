import { ref } from "vue";

export default class useTable {
    public methods: any = ref();
    private tableProps: any;
    private _tableRef = ref();

    constructor(props: any) {
        this.tableProps = props; // 初始化传入table中的参数
        // 绑定 this 上下文
        this.register = this.register.bind(this);
    }

    register(methods: any, tableRef: any) { 
        this.methods.value = methods;
        this._tableRef.value = tableRef; 
        methods.setTableProps(this.tableProps);
    }

    get tableMethods(): any {  
        return this.methods;
    }

    set tableMethods(value: any) {
        this.methods = value; 
    }

    
    get tableRef(): any {
        return this._tableRef;
    }

}