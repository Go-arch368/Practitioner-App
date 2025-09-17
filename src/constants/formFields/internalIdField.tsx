import { FormFieldConfig } from "@/types/formField";


const internalIdField : FormFieldConfig = {
    name:'Internal ID',
    label : "Internal ID",
    placeholder:"Enter your Internal ID",
    validate:(value)=>{
        if(typeof value!== "string"){
            return "Invalid input type"
        }
        const isOnlyNumberss = !/^\d+$/.test(value)
       
        if(value && isOnlyNumberss) {
            return "Internal ID must contain only numbers"
        }
        return null
    }
}

export default internalIdField