'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';

interface RegisterButtonProps {
  className?: string;
}

const RegisterButton = ({ className }: RegisterButtonProps) => {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = Boolean(user);

  if (isAuthenticated) {
    return null;
  }

  return (
    <Link
      href="/register"
      className={className}
    >
      Register
    </Link>
  );
};

export default RegisterButton;
