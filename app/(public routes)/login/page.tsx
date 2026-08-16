import LoginForm from '@/components/Form/LoginForm/LoginForm';
import css from './login.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Log in to your Harmoniq account.',
};

const LoginPage = () => {
  return (
    <div className={css.page}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
