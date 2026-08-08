'use client';

import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import Link from 'next/link';
import css from './LoginForm.module.css';
// import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleSubmit = async (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
    try {
      console.log(values);
      // const user = await login(values);
      // авторизація (успішна відпвідь => зберегти/встановити auth/session)
      //   router.push('/profile');
      actions.resetForm();
    } catch (error) {
      //   toast.error(`Something went wrong ${error.message}`);
      // ДОДАТИ <Toaster /> в LAYOUT
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.field}>
            <label htmlFor="email">Enter your email address</label>

            <Field
              id="email"
              name="email"
              type="email"
            />

            <ErrorMessage
              name="email"
              component="span"
            />
          </div>

          <div className={css.field}>
            <label htmlFor="password">Enter a password</label>

            <Field
              id="password"
              name="password"
              type="password"
            />

            <ErrorMessage
              name="password"
              component="span"
            />
          </div>

          <button type="submit">Login</button>
          <p>
            Don&apos;t have an account? <Link href="/register">Register</Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
