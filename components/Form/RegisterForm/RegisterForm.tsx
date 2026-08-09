'use client';

import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useId } from 'react';
export default function RegisterForm() {
  const fieldId = useId();
  return (
    <>
      <h1>Register</h1>
      <p>Join our community of mindfulness and wellbeing!</p>
      <Formik
        initialValues={{}}
        onSubmit={() => {}}
      >
        <Form>
          <label htmlFor={`${fieldId}-name`}>Enter your name</label>
          <Field
            id={`${fieldId}-name`}
            type="text"
            name="username"
          />
          <label htmlFor={`${fieldId}-email`}>Enter your name</label>
          <Field
            id={`${fieldId}-email`}
            type="email"
            name="email"
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
