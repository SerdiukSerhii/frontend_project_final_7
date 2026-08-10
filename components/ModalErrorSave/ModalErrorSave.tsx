import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalErrorSaveProps {
  onClose: () => void;
  description?: string;
}

export default function ModalErrorSave({ onClose, description }: ModalErrorSaveProps) {
  const navigate = useNavigate();

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleRegister = () => {
    onClose();
    navigate('/register');
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className={css.title}>Error while saving</h2>
        <p className={css.description}> To save this article, you need to authorize first</p>

        <div className={css.actions}>
          <button
            className={css.loginBtn}
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className={css.registerBtn}
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
