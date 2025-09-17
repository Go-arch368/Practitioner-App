import { FormFieldConfig } from "@/types/formField";


const networkField : FormFieldConfig = {
    name:"Network",
    label:"Network",
    placeholder:"Enter Network ID",
    validate : ()=>{
        return null
    }
}

export default networkField