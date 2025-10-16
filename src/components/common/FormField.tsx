import React from "react";

type FormFieldType = {
  name: string;
  label: string;
  placeholder?: string;
  value: string | string[];
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  validate: () => string | null;
   setValue: React.Dispatch<React.SetStateAction<string | string[]>>;
  format?: (value: string) => string;
  options?: string[];
  isMulti?: boolean;
};

const FormField: React.FC<{ field: FormFieldType }> = ({ field }) => {

  {console.log(field)}
return(
  
  
  <div className="form-group">

    <label htmlFor={field.name} className="label-fixed">
      {field.label}
    </label>
    
      <input
        id={field.name}
        name={field.name}
        placeholder={field.placeholder}
        className={`form-control${field.error ? " input-error" : ""}`}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        aria-invalid={!!field.error}
        style={{ width: "100%" }}
      />
  

    {field.error && (
      <div className="floating-error">
        <div className="error-box">{field.error}</div>
      </div>
    )}
  </div>
)
};

export default FormField;
