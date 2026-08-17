'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useArticleStore } from '@/lib/store/articleStore';
import { getArticleById } from '@/lib/api/articles';
import AddArticleForm from '@/components/Form/AddArticleForm/AddArticleForm';
import css from '../../new/NewArticlePage.module.css';

interface EditArticleClientPageProps {
  articleId: string;
}

export default function EditArticleClientPage({ articleId }: EditArticleClientPageProps) {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const isAuthReady = useAuthStore(state => state.isAuthReady);

  const setEditingArticle = useArticleStore(state => state.setEditingArticle);
  const clearEditingArticle = useArticleStore(state => state.clearEditingArticle);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthReady && !user) {
      router.replace('/login');
    }
  }, [isAuthReady, user, router]);

  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const data = await getArticleById(articleId);
        setEditingArticle(data);
      } catch {
        setError('Failed to load article details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();

    return () => {
      clearEditingArticle();
    };
  }, [articleId, setEditingArticle, clearEditingArticle]);

  if (!isAuthReady || !user || isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <section className="container">
      <div className={css.container}>
        <h1 className={css.title}>Edit article</h1>
        <AddArticleForm />
      </div>
    </section>
  );
}
