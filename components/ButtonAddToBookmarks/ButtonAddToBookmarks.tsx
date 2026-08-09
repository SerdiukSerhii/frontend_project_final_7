'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addArticleToSaved } from '@/lib/api/articles';
import type { ApiError } from '@/lib/api/api';
import ModalErrorSave from '@/components/ModalErrorSave/ModalErrorSave';
import css from './ButtonAddToBookmarks.module.css';

interface ButtonAddToBookmarksProps {
  articleId: string;
  isSaved?: boolean;
  isAuthenticated: boolean;
}

const ButtonAddToBookmarks = ({
  articleId,
  isSaved = false,
  isAuthenticated,
}: ButtonAddToBookmarksProps) => {
  const [saved, setSaved] = useState(isSaved);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => addArticleToSaved(articleId),
    onSuccess: () => {
      setSaved(true);
      queryClient.invalidateQueries({ queryKey: ['savedArticles'] });
    },
    onError: (error: ApiError) => {
      const message =
        error.response?.data?.error ?? 'Something went wrong. Please try again.';
      toast.error(message);
    },
  });

  const handleClick = () => {
    if (!isAuthenticated) {
      setIsErrorModalOpen(true);
      return;
    }

    if (saved || isPending) return;

    mutate();
  };

  return (
    <>
      <button
        type="button"
        className={`${css.button} ${saved ? css.saved : ''}`}
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={saved}
        aria-label={saved ? 'Article saved to bookmarks' : 'Add article to bookmarks'}
      >
        {isPending ? (
          <span className={css.spinner} aria-hidden="true" />
        ) : (
          <svg
            className={css.icon}
            viewBox="0 0 20 20"
            fill={saved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 3.5C5 2.67157 5.67157 2 6.5 2H13.5C14.3284 2 15 2.67157 15 3.5V17L10 14L5 17V3.5Z"
            />
          </svg>
        )}
      </button>

      {isErrorModalOpen && (
        <ModalErrorSave onClose={() => setIsErrorModalOpen(false)} />
      )}
    </>
  );
};

export default ButtonAddToBookmarks;