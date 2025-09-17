import { FormFieldConfig } from "@/types/formField";


const stateField : FormFieldConfig = {
    name:'State',
    label : "State",
    placeholder:"Select State(s)",
    validate:()=>{
        // if(typeof value!== "string"){
        //     return "Invalid input type"
        // }
        return null
    // }
    }
}

export default stateField