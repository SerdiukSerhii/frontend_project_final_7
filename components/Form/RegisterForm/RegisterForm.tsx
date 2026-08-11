'use client';

import * as Yup from 'yup';
import { Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import css from './RegisterForm.module.css';
import FormField from '../FormField/FormField';
import { useRouter } from 'next/navigation';
import { register } from '@/lib/api/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const RegisterFormSchema = Yup.object().shape({
  username: Yup.string()
    .required('Name is required')
    .min(2, 'must be at least 2 characters long')
    .max(32, 'Username is too long'),
  email: Yup.string().required('Email is required').max(64, 'Email is too long'),
  password: Yup.string()
    .required()
    .min(8, 'Password must be at least 8 characters long')
    .max(64, 'Password is too long'),
  repeatPassword: Yup.string()
    .required()
    .min(8, 'Password must be at least 8 characters long')
    .max(64, 'Password is too long')
    .oneOf([Yup.ref('password')], 'Passwords do not match'),
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
  const router = useRouter();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      console.log(values);
      await register(values);
      router.push('/photo');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? 'Registration failed. Please try again.';
        toast.error(message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
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
            <FormField
              name="username"
              label="Enter your name"
              placeholder="Max"
              autoComplete="nickname"
            />
            <FormField
              name="email"
              label="Enter your email address"
              type="email"
              placeholder="email@gmail.com"
              autoComplete="email"
            />
            <FormField
              name="password"
              label="Create a strong password"
              type="password"
              placeholder="*********"
              autoComplete="new-password"
            />
            <FormField
              name="repeatPassword"
              label="Repeat your password"
              type="password"
              placeholder="*********"
              autoComplete="new-password"
            />
          </div>
          <button
            className={css.btn}
            type="submit"
          >
            Create account
          </button>

          <span className={css.loginRedirect}>
            Already have an account?
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
