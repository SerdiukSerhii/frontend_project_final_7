import LoginForm from '@/components/Form/LoginForm/LoginForm';
import css from './login.module.css';

const LoginPage = () => {
  return (
    <main className={css.page}>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
