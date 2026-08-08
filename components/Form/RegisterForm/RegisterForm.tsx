import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
export default function RegisterForm() {
  return (
    <>
      <h1>Register</h1>
      <p>Join our community of mindfulness and wellbeing!</p>
      <Formik
        initialValues={{}}
        onSubmit={() => {}}
      >
        <Form>
          <Field
            type="text"
            name="username"
          />
          <Field
            type="email"
            name="email"
          />
          <Field
            type="password"
            name="password"
          />
          <Field
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
