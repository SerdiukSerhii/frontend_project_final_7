'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { addArticleToSaved, removeArticleFromSaved } from '@/lib/api/articles';
import type { ApiError } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import ModalErrorSave from '@/components/ModalErrorSave/ModalErrorSave';
import css from './ButtonAddToBookmarks.module.css';

interface ButtonAddToBookmarksProps {
  articleId: string;
  isSaved?: boolean;
}

const ButtonAddToBookmarks = ({ articleId, isSaved = false }: ButtonAddToBookmarksProps) => {
  const user = useAuthStore(state => state.user);
  const [saved, setSaved] = useState(isSaved);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleError = (error: ApiError) => {
    const message =
      error.response?.data?.error ?? 'Something went wrong. Please try again.';
    toast.error(message);
  };

  const { mutate: addMutate, isPending: isAdding } = useMutation({
    mutationFn: () => addArticleToSaved(articleId),
    onSuccess: () => {
      setSaved(true);
      queryClient.invalidateQueries({ queryKey: ['savedArticles'] });
    },
    onError: handleError,
  });

  const { mutate: removeMutate, isPending: isRemoving } = useMutation({
    mutationFn: () => removeArticleFromSaved(articleId),
    onSuccess: () => {
      setSaved(false);
      queryClient.invalidateQueries({ queryKey: ['savedArticles'] });
    },
    onError: handleError,
  });

  const isPending = isAdding || isRemoving;

  const handleClick = () => {
    if (!user) {
      setIsErrorModalOpen(true);
      return;
    }

    if (isPending) return;

    saved ? removeMutate() : addMutate();
  };

  return (
    <>
      <button
        type="button"
        className={`${css.button} ${saved ? css.saved : ''}`}
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={saved}
        aria-label={saved ? 'Remove article from bookmarks' : 'Add article to bookmarks'}
      >
        {isPending ? (
          <span className={css.spinner} aria-hidden="true" />
        ) : (
          <svg className={css.icon} aria-hidden="true">
            <use href="/icons/symbol-defs.svg#icon-bookmark" />
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