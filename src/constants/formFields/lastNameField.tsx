import { FormFieldConfig } from "@/types/formField";


const lastNameField : FormFieldConfig = {
    name:'lastName',
    label : "Last Name",
    placeholder:"Enter your last name",
    validate:(value)=>{
        if(typeof value!== "string"){
            return "Invalid input type"
        }
        return null
    }
}

export default lastNameField