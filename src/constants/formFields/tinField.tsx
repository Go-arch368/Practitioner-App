import { FormFieldConfig } from "@/types/formField";
import { formatTIN } from "./util/formatTIN";

const tinField : FormFieldConfig = {
  name: "TIN",
  label: "TIN",
  placeholder: "Enter TIN",
  validate: (value) => {
    if (typeof value !== 'string') return 'Invalid input type'; // sanity check

    if (value.length===0) return null; // allow empty field while typing

    const raw = value.replace(/\D/g, ''); // strip non-digits

    if (raw.length !== 9) return "TIN must be exactly 9 numeric digits"

    if (!/^\d{9}$/.test(raw)) return "TIN must contain only digits"

    return null; // valid
  },
  format: formatTIN
}


export default tinField