import { ref } from "vue";

export default class useForm {
    public methods: any = {};
    private formProps: any;
    private _formRef = ref();

    constructor(props) {
        const {form, table, search} = props; 
        this.methods = {};
       if (form && table) {
            form.formMethods.value.setFormPropsValue('tableMethods', table.tableMethods);
            table.tableMethods.value.setTablePropsValue('formMethods', form.formMethods);
       }
       
       if (search && table) {
           
           search.searchMethods.value.setSearchPropsValue('tableMethods', table.tableMethods);
           table.tableMethods.value.setTablePropsValue('searchMethods', search.searchMethods);
           table.tableMethods.value.setTablePropsValue('params',search.searchMethods.value.getResetParams());
           

       }
       
       if (form) {
        this.methods = {...this.methods, ...form.formMethods.value};
       }
       if (table) {
        this.methods = {...this.methods, ...table.tableMethods.value};
       }
       if (search) { 
        
        this.methods = {...this.methods, ...search.searchMethods.value};
       } 
 
       

    }

     
 
    
    get formRef(): any {
        return this._formRef;
    }

}