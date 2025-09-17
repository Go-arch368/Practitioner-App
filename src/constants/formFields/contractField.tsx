import { FormFieldConfig } from "@/types/formField";

const contractField : FormFieldConfig = {
    name:"Contract",
    label:"Contract #"
,
 placeholder:'Enter Contract #',
 validate : ()=>{
     return null
 }
}

export default contractField