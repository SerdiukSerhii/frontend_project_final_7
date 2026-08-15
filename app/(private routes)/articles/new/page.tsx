'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import AddArticleForm from '@/components/Form/AddArticleForm/AddArticleForm';
import css from './NewArticlePage.module.css';

const NewArticlePage = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const isAuthReady = useAuthStore(state => state.isAuthReady);

  useEffect(() => {
    if (isAuthReady && !user) {
      router.replace('/login');
    }
  }, [isAuthReady, user, router]);

  if (!isAuthReady || !user) {
    return null;
  }

  return (
    <div className={css.container}> 
      <h1 className={css.title}>Create an article</h1>
      <AddArticleForm />
    </div>
  );
};

export default NewArticlePage;
