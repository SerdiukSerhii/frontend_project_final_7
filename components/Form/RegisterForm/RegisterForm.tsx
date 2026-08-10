'use client';

import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { useId } from 'react';

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
      <h1>Register</h1>
      <p>Join our community of mindfulness and wellbeing!</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterFormSchema}
      >
        <Form>
          <label htmlFor={`${fieldId}-name`}>Enter your name</label>
          <Field
            id={`${fieldId}-name`}
            type="text"
            name="username"
            placeholder="Max"
          />
          <label htmlFor={`${fieldId}-email`}>Enter your name</label>
          <Field
            id={`${fieldId}-email`}
            type="email"
            name="email"
            placeholder="email@gmail.com"
          />
          <label htmlFor={`${fieldId}-password`}>Enter your email address</label>
          <Field
            id={`${fieldId}-password`}
            type="password"
            name="password"
          />
          <label htmlFor={`${fieldId}-repeatPassword`}>Repeat your password</label>
          <Field
            id={`${fieldId}-repeatPassword`}
            type="password"
            name="repeatPassword"
          />
          <button type="submit">Create account</button>
        </Form>
      </Formik>
      <span>
        Already have an account? <Link href="/login">Log in</Link>
      </span>
    </>
  );
}
