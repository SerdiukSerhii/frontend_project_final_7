import Link from 'next/link';
import Modal from '@/components/Modal/Modal';
import css from './ModalErrorSave.module.css';

interface ModalErrorSaveProps {
  onClose: () => void;
  description?: string;
}

const ModalErrorSave = ({
  onClose,
  description = 'To save this article, you need to authorize first',
}: ModalErrorSaveProps) => {
  return (
    <Modal onClose={onClose}>
      <div className={css.content}>
        <h2 className={css.title}>Error while saving</h2>
        <p className={css.text}>{description}</p>

        <div className={css.actions}>
          <Link href="/login" className={css.loginBtn} onClick={onClose}>
            Login
          </Link>
          <Link href="/register" className={css.registerBtn} onClick={onClose}>
            Register
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ModalErrorSave;