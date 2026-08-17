'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useArticleStore } from '@/lib/store/articleStore';
import { getArticleById } from '@/lib/api/articles';
import AddArticleForm from '@/components/Form/AddArticleForm/AddArticleForm';
import css from './EditArticlePage.module.css';

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

        // Перевірка авторства: порівнюємо ID користувача з автором статті
        // (залежно від моделі поле може називатися data.owner, data.userId або data.author._id)
        const articleOwnerId =
          typeof data.ownerId === 'object' ? (data.ownerId as { _id?: string })?._id : data.ownerId;
        const currentUserId = user?._id;

        if (articleOwnerId && currentUserId && articleOwnerId !== currentUserId) {
          setError('You do not have permission to edit this article.');
          return;
        }

        setEditingArticle(data);
      } catch {
        setError('Failed to load article details.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthReady && user) {
      fetchArticle();
    }

    return () => {
      clearEditingArticle();
    };
  }, [articleId, user, isAuthReady, setEditingArticle, clearEditingArticle]);

  if (!isAuthReady || !user || isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  return (
    <section className={css.page}>
      <div className="container">
        <h1 className={css.title}>Edit article</h1>
        <AddArticleForm />
      </div>
    </section>
  );
}
