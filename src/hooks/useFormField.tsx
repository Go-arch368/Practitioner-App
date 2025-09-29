import { useState } from "react";
import { FormFieldConfig } from "@/types/formField";


/**
 * Hook to manage a single form field's value, error, formatting, and validation.
 */
export function useFormField(config: FormFieldConfig) {
  const [value, setValue] = useState<string | string[]>('');
  const [error, setError] = useState<string | null>(null);
  console.log(value)

  // Handles input change, applies formatting if provided.
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = config.format ? config.format(rawValue) : rawValue;
    setValue(formattedValue);
    setError(null); // Clear error on change
  };

  // Handles input blur, triggers validation.
  const onBlur = () => {
    const validationError = config.validate?.(value) ?? null;
    setError(validationError);
  };

  // Validates and updates error state.
  const validate = () => {
    const validationError = config.validate ? config.validate(value) : null;
    setError(validationError);
    return validationError;
  };

  // Validates without updating error state.
  const validateWithoutError = () => {
    return config.validate ? config.validate(value) : null;
  };

  // Removes the current error.
  const removeError = () => {
    setError(null);
  };

  return {
    ...config,
    name: config.name,
    label: config.label,
    placeholder: config.placeholder,
    value,
    error,
    setValue,
    setError,
    onChange,
    onBlur,
    validate,
    validateWithoutError,
    removeError
  };
}
