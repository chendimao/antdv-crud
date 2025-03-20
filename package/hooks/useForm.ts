import { ref } from "vue";

export default class useForm {
    private methods: any = ref();
    private formProps: any;
    private _formRef = ref();

    constructor(props: any) { 
        this.formProps = props; // 初始化传入form中的参数
        // 绑定 this 上下文
        this.register = this.register.bind(this);
    }

    register(methods: any, formRef: any) {  
        
        this.methods.value = methods;
        this._formRef.value = formRef; 
        methods.setFormProps(this.formProps);
    }

    get formMethods(): any { 
        return this.methods;
    }

    set formMethods(value: any) {
        this.methods = value; 
    }

    
    get formRef(): any {
        return this._formRef;
    }

}