import { FormFieldConfig } from "@/types/formField";
import { formatSSN } from "./util/formatSSN";


const ssnField : FormFieldConfig = {
    name:"ssn",
    label:"SSN",
    placeholder:"XXX-XX-XXXX",
    validate:(value)=>{
        const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
        if(typeof value !== 'string'){
            return "Invalid input type"
        }
        if(value && !(ssnRegex.test(value))) return "SSN must of 9 digits only"
    return null
    },
    format:formatSSN   
}

export default ssnField