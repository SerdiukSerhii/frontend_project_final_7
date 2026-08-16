import RegisterForm from '@/components/Form/RegisterForm/RegisterForm';
import css from './RegisterPage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create your Harmoniq account.',
};

export default function RegisterPage() {
  return (
    <div className={css.page}>
      <RegisterForm />
    </div>
  );
}
