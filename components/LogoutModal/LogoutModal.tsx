'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { logout } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';

import Modal from '../Modal/Modal';
import css from './LogoutModal.module.css';

interface LogoutModalProps {
  onClose: () => void;
}

const LogoutModal = ({ onClose }: LogoutModalProps) => {
  const router = useRouter();
  const clearUser = useAuthStore(state => state.clearUser);

  const logoutMutation = useMutation({
    mutationFn: logout,

    onError: () => {
      toast.error('Server logout failed, but you were logged out on this device.');
    },

    onSettled: () => {
      clearUser();
      onClose();
      router.replace('/');
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Modal onClose={onClose}>
      <div className={css.content}>
        <h2 className={css.title}>Are you sure?</h2>

        <p className={css.text}>We will miss you!</p>

        <div className={css.actions}>
          <button
            type="button"
            className={css.logoutButton}
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            {logoutMutation.isPending ? 'Logging out...' : 'Log out'}
          </button>

          <button
            type="button"
            className={css.cancelButton}
            onClick={onClose}
            disabled={logoutMutation.isPending}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
