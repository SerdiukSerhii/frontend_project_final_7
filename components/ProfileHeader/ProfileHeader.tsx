'use client';

import { useAuthStore } from '@/lib/store/authStore';
import css from './ProfileHeader.module.css';
import Image from 'next/image';

export default function ProfileHeader() {
  const user = useAuthStore(state => state.user);
  if (!user) return null;

  return (
    <>
      <h2 className={css.title}>My Profile</h2>
      <div className={css.header}>
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={137}
          height={137}
          className={css.avatar}
          priority
        />
        <div className={css.info}>
          <p className={css.name}>{user.name}</p>
          <p className={css.count}>{user.articlesAmount} articles</p>
        </div>
      </div>
    </>
  );
}
