import { FormFieldConfig } from "@/types/formField";

const labelField : FormFieldConfig = {
    name:"label",
    label:"Label",
    placeholder:"Enter Label",
    validate:(value)=>{
        if(typeof value !== "string"){
            return "Invalid format"
        }
        if(value.trim()===""){
            return "Label cannot be empty"
        }
        return null
    }
}

export default labelField