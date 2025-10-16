import { FormFieldConfig } from "@/types/formField";
import { FieldLength } from "./util/FieldLength";
import { formatLengthFiedl } from "./util/formatLengthField";

const lastNameField: FormFieldConfig = {
  name: 'lastName',
  label: "Last Name",
  placeholder: "Enter your last name",
  validate: (value) => {
    if (typeof value !== "string") {
      return "Invalid input type";
    }
    // Only letters, space, hyphen
    if (!/^[A-Za-z\s-]*$/.test(value)) {
      return "Last Name should only contain letters, space, or hyphen";
    }
    return null;
  },
  format: (value) => {
    // Keep letters, space, hyphen, and limit length
    return formatLengthFiedl(value, FieldLength.LastName);
  },
};

export default lastNameField;
