import { useField } from 'formik';
import { useId } from 'react';
import css from './FormField.module.css';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export default function FormField({ name, label, type = 'text', placeholder }: FormFieldProps) {
  const [field, meta] = useField(name);
  const fieldId = useId();

  const hasError = meta.touched && meta.error;

  return (
    <div className={css.fieldLable}>
      <label htmlFor={fieldId}>{label}</label>
      <input
        {...field}
        id={fieldId}
        type={type}
        placeholder={placeholder}
        className={hasError ? `${css.field} ${css.fieldError}` : css.field}
      />
      {hasError && <span className={css.error}>{meta.error}</span>}
    </div>
  );
}
