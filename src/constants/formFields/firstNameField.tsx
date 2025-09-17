import { FormFieldConfig } from "@/types/formField";


const firstNameField : FormFieldConfig = {
    name:'firstName',
    label : "First Name",
    placeholder:"Enter your first name",
    validate:(value)=>{
        if(typeof value!== "string"){
            return "Invalid input type"
        }
        return null
    }
}

export default firstNameField