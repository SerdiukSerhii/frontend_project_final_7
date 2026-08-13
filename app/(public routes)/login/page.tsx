import LoginForm from '@/components/Form/LoginForm/LoginForm';
import css from './login.module.css';

const LoginPage = () => {
  return (
    <div className={css.page}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
