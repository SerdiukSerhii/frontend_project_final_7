'use client';

import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import Link from 'next/link';
import css from './LoginForm.module.css';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '@/lib/api/auth';
import axios from 'axios';

const LoginSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .max(64, 'Email must be at most 64 characters')
    .email('Invalid email'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
    try {
      const user = await login(values);
      toast.success(`Welcome back, ${user.username}!`);
      //потрібно додати користувача у глобальний стан
      actions.resetForm();
      router.push('/profile');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            toast.error('Please check your email and password.');
            break;

          case 401:
            toast.error('Incorrect email or password.');
            break;

          case 404:
            toast.error('User not found.');
            break;

          case 500:
            toast.error('Server error. Please try again later.');
            break;

          default:
            toast.error('Something went wrong. Please try again.');
        }
      } else {
        toast.error('Something went wrong...');
      }
    }
  };

  return (
    <div className={css['form-container']}>
      <h1 className={css['login-title']}>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={css['email-field-container']}>
              <label
                htmlFor="email"
                className={css.label}
              >
                Enter your email address
              </label>

              <Field
                id="email"
                name="email"
                type="email"
                className={`${css.field} ${touched.email && errors.email ? css['error-field'] : ''}`}
                placeholder="email@gmail.com"
              />

              <ErrorMessage
                name="email"
                component="span"
                className={css['span-error']}
              />
            </div>

            <div className={css['password-field-container']}>
              <label
                htmlFor="password"
                className={css.label}
              >
                Enter a password
              </label>

              <div className={css['password-input-wrapper']}>
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`${css.field} ${touched.password && errors.password ? css.error : ''}`}
                  placeholder="*********"
                />

                <button
                  type="button"
                  className={css['password-toggle']}
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  <svg className={css['password-svg']}>
                    <use
                      href={`/icons/symbol-defs.svg#${showPassword ? 'icon-eye' : 'icon-eye-crossed'}`}
                    />
                  </svg>
                </button>
              </div>

              <ErrorMessage
                name="password"
                component="span"
                className={css['span-error']}
              />
            </div>

            <button
              type="submit"
              className={css['btn-login-form']}
            >
              Login
            </button>
            <p className={css['login-form-text']}>
              Don&apos;t have an account?{' '}
              <Link
                className={css['register-link']}
                href="/register"
              >
                Register
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
