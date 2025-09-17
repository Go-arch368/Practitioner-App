import { FormFieldConfig } from "@/types/formField";
import { formatSSN } from "./util/formatSSN";


const tinField : FormFieldConfig = {
    name:"TIN",
    label:"TIN",
    placeholder:"Enter TIN",
    validate:(value)=>{
      
        if(typeof value !== 'string'){
            return "Invalid input type"
        }
        if(value && (value.length<9)){
            return "Tin must be at least 9 characters"
        }
    return null
    },
    format:formatSSN   
}

export default tinField