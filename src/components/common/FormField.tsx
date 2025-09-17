import React from "react";

type FormFieldType = {
  name: string;
  label: string;
  placeholder?: string;
  value: string | string[];
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  validate: () => string|null;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  format?: (value: string) => string;
  options?: string[];
  isMulti?: boolean;
};

const FormField: React.FC<{ field: FormFieldType }> = ({ field }) => (
  <div className="form-group">
    <label htmlFor={field.name} className="label-fixed">
      {field.label}
    </label>
    {!field.isMulti ? (
      <input
        id={field.name}
        name={field.name}
        placeholder={field.placeholder}
        className={`form-control${field.error ? ' input-error' : ''}`}
        value={typeof field.value === 'string' ? field.value : ''}
        onChange={field.onChange}
        onBlur={field.onBlur}
        style={{ width: '100%' }}
      />
    ) : (
      <select
        id={field.name}
        name={field.name}
        multiple
        value={Array.isArray(field.value) ? field.value : []}
        onChange={(e) => {
          const selected = Array.from(e.target.selectedOptions, o => o.value);
          field.setValue(selected);
        }}
        className={`form-control${field.error ? ' input-error' : ''}`}
        style={{ width: '100%' }}
      >
        {field.options?.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    )}
    {field.error && (
      <div className="floating-error">
        <div className="error-box">{field.error}</div>
      </div>
    )}
  </div>
);

export default FormField;
