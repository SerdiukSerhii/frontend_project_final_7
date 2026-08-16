'use client';

import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

import {
  getArticleById,
  getRelatedArticles,
  addArticleToSaved,
  removeArticleFromSaved,
} from '@/lib/api/articles';
import { useAuthStore } from '@/lib/store/authStore';
import Loader from '@/components/Loader/Loader';
import ModalErrorSave from '@/components/ModalErrorSave/ModalErrorSave';
import type { ApiError } from '@/lib/api/api';
import css from './ArticlePage.module.css';

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const ArticlePage = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const user = useAuthStore(state => state.user);
  const isAuthenticated = Boolean(user);
  const queryClient = useQueryClient();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticleById(articleId),
    enabled: Boolean(articleId),
  });

  const { data: relatedArticles = [] } = useQuery({
    queryKey: ['relatedArticles', articleId],
    queryFn: () => getRelatedArticles(articleId),
    enabled: Boolean(articleId),
  });

  const isSaved = Boolean(article && user?.savedArticles?.includes(article._id));

  const handleSaveError = (error: ApiError) => {
    const message = error.response?.data?.error ?? 'Something went wrong. Please try again.';
    toast.error(message);
  };

  const { mutate: addMutate, isPending: isAdding } = useMutation({
    mutationFn: () => addArticleToSaved(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedArticles'] });
      toast.success('Article added to saved list');
    },
    onError: handleSaveError,
  });

  const { mutate: removeMutate, isPending: isRemoving } = useMutation({
    mutationFn: () => removeArticleFromSaved(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedArticles'] });
      toast.success('Article removed from saved list');
    },
    onError: handleSaveError,
  });

  const isSaving = isAdding || isRemoving;

  const handleSaveClick = () => {
    if (!isAuthenticated) {
      setIsErrorModalOpen(true);
      return;
    }

    if (isSaving) return;

    if (isSaved) {
      removeMutate();
    } else {
      addMutate();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !article) {
    return <p className={css.notFound}>Article not found.</p>;
  }

  const author = typeof article.ownerId === 'object' ? article.ownerId : null;
  const authorName = author?.name ?? 'Harmoniq Author';
  const authorId = author?._id;

  const descriptionParagraphs = article.article.split('\n').filter(Boolean);

  return (
    <div className={css.container}>
      <h1 className={css.title}>{article.title}</h1>

      <div className={css.imageWrapper}>
        <Image
          src={article.img}
          alt={article.title}
          fill
          priority
          className={css.image}
        />
      </div>

      <div className={css.layout}>
        <div className={css.content}>
          {descriptionParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={css.paragraph}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <aside className={css.sidebar}>
          <h2 className={css.sidebarTitle}>You can also interested</h2>

          <p className={css.meta}>
            <span className={css.metaLabel}>Author:</span>{' '}
            {authorId ? (
              <Link
                href={`/authors/${authorId}`}
                className={css.authorLink}
              >
                {authorName}
              </Link>
            ) : (
              authorName
            )}
          </p>

          <p className={css.meta}>
            <span className={css.metaLabel}>Publication date:</span> {formatDate(article.date)}
          </p>

          {relatedArticles.length > 0 && (
            <ul className={css.relatedList}>
              {relatedArticles.map(related => {
                const relatedAuthor =
                  typeof related.ownerId === 'object' ? related.ownerId.name : 'Harmoniq Author';

                return (
                  <li
                    key={related._id}
                    className={css.relatedItem}
                  >
                    <p className={css.relatedTitle}>{related.title}</p>
                    <p className={css.relatedAuthor}>{relatedAuthor}</p>

                    <Link
                      href={`/articles/${related._id}`}
                      className={css.relatedBtn}
                      aria-label={`Read ${related.title}`}
                    >
                      <svg
                        className={css.relatedIcon}
                        aria-hidden="true"
                      >
                        <use href="/icons/symbol-defs.svg#icon-top-right" />
                      </svg>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <button
            type="button"
            className={`${css.saveBtn} ${isSaved ? css.saveBtnActive : ''}`}
            onClick={handleSaveClick}
            disabled={isSaving}
          >
            {isSaving ? (
              'Saving...'
            ) : (
              <>
                {isSaved ? 'Saved' : 'Save'}
                <svg
                  className={css.saveIcon}
                  aria-hidden="true"
                >
                  <use href="/icons/symbol-defs.svg#icon-save-bookmark" />
                </svg>
              </>
            )}
          </button>
        </aside>
      </div>

      {isErrorModalOpen && <ModalErrorSave onClose={() => setIsErrorModalOpen(false)} />}
    </div>
  );
};

export default ArticlePage;
