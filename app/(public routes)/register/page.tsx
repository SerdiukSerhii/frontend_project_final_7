import RegisterForm from '@/components/Form/RegisterForm/RegisterForm';
import css from './RegisterPage.module.css';
export default function RegisterPage() {
  return (
    <div className={css.page}>
      <RegisterForm />
    </div>
  );
}
