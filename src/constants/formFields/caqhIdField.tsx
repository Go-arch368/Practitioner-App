import { FormFieldConfig } from "@/types/formField";
import { formatSSN } from "./util/formatSSN";


const caqhIdField : FormFieldConfig = {
    name:"CAQH Provider ID",
    label:"CAQH ID",
    placeholder:"Enter CAQH Provider ID",
    validate:(value)=>{
       
        if(typeof value !== 'string'){
            return "Invalid input type"
        }
        const isOnlyNumberss = !/^\d+$/.test(value)
        if(value && (value.length<10|| isOnlyNumberss)) return "CAQH Provider ID must contain only numbers"
    return null
    },
     
}

export default caqhIdField