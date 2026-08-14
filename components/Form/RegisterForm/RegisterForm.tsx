'use client';

import axios from 'axios';
import * as Yup from 'yup';
import {
  Form,
  Formik,
  type FormikHelpers,
} from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { register } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';

import FormField from '../FormField/FormField';
import css from './RegisterForm.module.css';

const RegisterFormSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(32, 'Name must be at most 32 characters long'),

  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Invalid email address')
    .max(64, 'Email must be at most 64 characters long'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(64, 'Password must be at most 64 characters long'),

  repeatPassword: Yup.string()
    .required('Please repeat your password')
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

const RegisterForm = () => {
  const router = useRouter();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>,
  ) => {
    try {
      const user = await register({
        name: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      setUser(user);
      toast.success(`Welcome, ${user.name}!`);

      actions.resetForm();
      router.replace('/photo');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data as
          | { message?: string }
          | undefined;

        switch (error.response?.status) {
          case 400:
            toast.error(
              responseData?.message ??
                'Please check the entered information.',
            );
            break;

          case 409:
            toast.error(
              responseData?.message ??
                'A user with this email already exists.',
            );
            break;

          case 500:
            toast.error(
              'Server error. Please try again later.',
            );
            break;

          default:
            toast.error(
              responseData?.message ??
                'Registration failed. Please try again.',
            );
        }
      } else {
        toast.error(
          'Something went wrong. Please try again.',
        );
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterFormSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <h1 className={css.title}>Register</h1>

          <p className={css.subtitle}>
            Join our community of mindfulness and wellbeing!
          </p>

          <div className={css.fieldsGroup}>
            <FormField
              name="username"
              label="Enter your name"
              placeholder="Max"
              autoComplete="name"
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
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Creating account...'
              : 'Create account'}
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
      )}
    </Formik>
  );
};

export default RegisterForm;