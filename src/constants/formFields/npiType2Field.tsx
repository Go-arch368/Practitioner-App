import { FormFieldConfig } from "@/types/formField";
import { formatSSN } from "./util/formatSSN";


const npiType2Field : FormFieldConfig = {
    name:"NPI Type 2",
    label:"NPI Type 2",
    placeholder:"Enter NPI Type 2",
    validate:(value)=>{
       
        if(typeof value !== 'string'){
            return "Invalid input type"
        }
        const isNotOnlyNumberss = !/^\d+$/.test(value)
        if(value && (value.length<10)) return "NPI Type 2 should have at atleast 10 digits in length"
        if(value && isNotOnlyNumberss) {
            return "NPI Type 2 msut contain only numbers"
        }
    return null
    },
     
}

export default npiType2Field