import { useField } from 'formik';
import { useId } from 'react';
import css from './FormTextarea.module.css';

interface FormTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

export default function FormTextarea({
  name,
  label,
  placeholder,
  rows = 6,
}: FormTextareaProps) {
  const [field, meta] = useField(name);
  const fieldId = useId();

  const hasError = meta.touched && meta.error;

  return (
    <div className={css.fieldLable}>
      <label htmlFor={fieldId}>{label}</label>
      <textarea
        {...field}
        id={fieldId}
        rows={rows}
        placeholder={placeholder}
        className={hasError ? `${css.field} ${css.fieldError}` : css.field}
      />
      {hasError && <span className={css.error}>{meta.error}</span>}
    </div>
  );
}