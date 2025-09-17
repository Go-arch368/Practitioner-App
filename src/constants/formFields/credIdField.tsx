import { FormFieldConfig } from "@/types/formField";
import { formatSSN } from "./util/formatSSN";


const credIdField : FormFieldConfig = {
    name:"Cred ID",
    label:"Cred ID",
    placeholder:"Enter Cred ID",
    validate:(value)=>{
       
        if(typeof value !== 'string'){
            return "Invalid input type"
        }
        const isOnlyNumberss = !/^\d+$/.test(value)
        if(value && isOnlyNumberss) return "Cred ID must contain only numbers"
    return null
    },
     
}

export default credIdField