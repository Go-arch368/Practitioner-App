import { FormFieldConfig } from "@/types/formField";
import { formatSSN } from "./util/formatSSN";


const npiType1Field : FormFieldConfig = {
    name:"NPI Type 1",
    label:"NPI Type 1",
    placeholder:"Enter NPI Type 1",
    validate:(value)=>{
       
        if(typeof value !== 'string'){
            return "Invalid input type"
        }
        const isNotOnlyNumberss = !/^\d+$/.test(value)
        if(value && (value.length<10|| isNotOnlyNumberss)) return "NPI Type 1 must contain only numbers. It should have at least 10 digits in length"
    return null
    },
     
}

export default npiType1Field