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

  const editingArticle = useArticleStore(state => state.editingArticle);
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
    if (!articleId || !isAuthReady || !user) {
      return;
    }

    let isCancelled = false;

    const fetchArticle = async () => {
      clearEditingArticle();
      setIsLoading(true);
      setError(null);

      try {
        const data = await getArticleById(articleId);

        if (isCancelled) {
          return;
        }

        const articleOwnerId = typeof data.ownerId === 'object' ? data.ownerId._id : data.ownerId;

        const isOwner = data.isOwner === true || articleOwnerId === user._id;

        if (!isOwner) {
          setError('You do not have permission to edit this article.');
          return;
        }

        setEditingArticle(data);
      } catch {
        if (!isCancelled) {
          setError('Failed to load article details.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchArticle();

    return () => {
      isCancelled = true;
      clearEditingArticle();
    };
  }, [articleId, user, isAuthReady, setEditingArticle, clearEditingArticle]);

  if (!isAuthReady || !user || isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">{error}</div>;
  }

  if (!editingArticle) {
    return <div className="container">Article is unavailable for editing.</div>;
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
