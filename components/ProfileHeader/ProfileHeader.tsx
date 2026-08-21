'use client';

import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSavedArticles, getUserArticles } from '@/lib/api/articles';
import { useAuthStore } from '@/lib/store/authStore';
import css from './ProfileHeader.module.css';
import Image from 'next/image';

export default function ProfileHeader() {
  const pathname = usePathname();
  const user = useAuthStore(state => state.user);

  const isSavedTab = pathname === '/profile/saved';

  const { data: countData } = useQuery({
    queryKey: ['userArticlesCount', user?._id],
    queryFn: () => getUserArticles(user?._id as string, 1, 1),
    enabled: Boolean(user?._id),
  });

  const { data: savedArticlesData } = useQuery({
    queryKey: ['savedArticles'],
    queryFn: getSavedArticles,
    enabled: isSavedTab && Boolean(user?._id),
  });

  if (!user) return null;

  const createdCount = countData?.data?.totalItems ?? user.articlesAmount ?? 0;
  const savedCount = savedArticlesData?.length ?? user.savedArticles?.length ?? 0;

  const articlesCount = isSavedTab ? savedCount : createdCount;

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
          unoptimized
        />
        <div className={css.info}>
          <p className={css.name}>{user.name}</p>
          <p className={css.count}>{articlesCount} articles</p>
        </div>
      </div>
    </>
  );
}
