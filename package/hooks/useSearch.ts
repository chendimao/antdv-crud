import { ref } from "vue";

export default class useSearch {
    private methods: any = ref();
    private searchProps: any;
    private _searchRef = ref();

    constructor(props: any) {
        this.searchProps = props; // 初始化传入search中的参数 
        // 绑定 this 上下文
        this.register = this.register.bind(this);
    }

    register(methods: any, searchRef: any) {
        this.methods.value = methods;
        this._searchRef.value = searchRef;
      
       methods.setSearchProps(this.searchProps);
    }

    get searchMethods(): any {
        return this.methods;
    }

    set searchMethods(value: any) {
        this.methods = value; 
    }

    
    get searchRef(): any {
        return this._searchRef;
    }

}