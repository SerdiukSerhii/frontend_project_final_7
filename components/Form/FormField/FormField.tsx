import { useField } from 'formik';
import { useId, useState } from 'react';
import css from './FormField.module.css';

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}

export default function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  autoComplete,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [field, meta] = useField(name);
  const fieldId = useId();

  const hasError = meta.touched && meta.error;
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className={css.fieldLable}>
      <label htmlFor={fieldId}>{label}</label>
      <div className={isPassword ? css.passwordWrapper : undefined}>
        <input
          {...field}
          id={fieldId}
          type={inputType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={hasError ? `${css.field} ${css.fieldError}` : css.field}
        />
        {isPassword && (
          <button
            type="button"
            className={css.toggleBtn}
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <svg
              width="24"
              height="24"
            >
              <use
                href={`/icons/symbol-defs.svg#${showPassword ? 'icon-eye' : 'icon-eye-crossed'}`}
              />
            </svg>
          </button>
        )}
      </div>
      {hasError && <span className={css.error}>{meta.error}</span>}
    </div>
  );
}
