'use client';

import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useId } from 'react';
import css from './RegisterForm.module.css';

const RegisterFormSchema = Yup.object().shape({
  username: Yup.string().required().min(2).max(32),
  email: Yup.string().required().max(64),
  password: Yup.string().required().min(8).max(64),
  repeatPassword: Yup.string().required().min(8).max(64),
});

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}
const initialValues: RegisterFormValues = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
};

export default function RegisterForm() {
  const fieldId = useId();

  const handleSubmit = (values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>) => {
    actions.resetForm();
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterFormSchema}
      >
        <Form className={css.form}>
          <h1 className={css.title}>Register</h1>
          <p className={css.subtitle}>Join our community of mindfulness and wellbeing!</p>
          <div className={css.fieldsGroup}>
            <div className={css.fieldLable}>
              <label htmlFor={`${fieldId}-name`}>Enter your name</label>
              <Field
                className={css.field}
                id={`${fieldId}-name`}
                type="text"
                name="username"
                placeholder="Max"
              />
            </div>
            <div className={css.fieldLable}>
              <label htmlFor={`${fieldId}-email`}>Enter your name</label>
              <Field
                className={css.field}
                id={`${fieldId}-email`}
                type="email"
                name="email"
                placeholder="email@gmail.com"
              />
            </div>
            <div className={css.fieldLable}>
              <label htmlFor={`${fieldId}-password`}>Enter your email address</label>
              <Field
                className={css.field}
                id={`${fieldId}-password`}
                type="password"
                name="password"
              />
            </div>
            <div className={css.fieldLable}>
              <label htmlFor={`${fieldId}-repeatPassword`}>Repeat your password</label>
              <Field
                className={css.field}
                id={`${fieldId}-repeatPassword`}
                type="password"
                name="repeatPassword"
              />
            </div>
          </div>
          <button
            className={css.btn}
            type="submit"
          >
            Create account
          </button>

          <span className={css.loginRedirect}>
            Already have an account?{' '}
            <Link
              className={css.loginLink}
              href="/login"
            >
              Log in
            </Link>
          </span>
        </Form>
      </Formik>
    </>
  );
}
