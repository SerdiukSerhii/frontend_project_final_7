'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { addArticleToSaved, removeArticleFromSaved, getSavedArticles } from '@/lib/api/articles';

import type { ApiError } from '@/lib/api/api';
import { useAuthStore } from '@/lib/store/authStore';
import ModalErrorSave from '@/components/ModalErrorSave/ModalErrorSave';

import css from './ButtonAddToBookmarks.module.css';

interface ButtonAddToBookmarksProps {
  articleId: string;
  children: (state: { saved: boolean; isPending: boolean; onClick: () => void }) => React.ReactNode;
}

const ButtonAddToBookmarks = ({ articleId, children }: ButtonAddToBookmarksProps) => {
  const user = useAuthStore(state => state.user);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: savedArticles = [] } = useQuery({
    queryKey: ['savedArticles'],
    queryFn: getSavedArticles,
    enabled: Boolean(user),
  });

  const saved = savedArticles.some(article => article._id === articleId);

  const handleError = (error: ApiError) => {
    const message =
      error.response?.data?.error ??
      error.response?.data?.message ??
      'Something went wrong. Please try again.';

    toast.error(message);
  };

  const { mutate: addMutate, isPending: isAdding } = useMutation({
    mutationFn: () => addArticleToSaved(articleId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['savedArticles'],
      });

      toast.success('Article saved');
    },

    onError: handleError,
  });

  const { mutate: removeMutate, isPending: isRemoving } = useMutation({
    mutationFn: () => removeArticleFromSaved(articleId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['savedArticles'],
      });

      toast.success('Article removed');
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

    if (saved) {
      removeMutate();
    } else {
      addMutate();
    }
  };

  return (
    <>
      {children({ saved, isPending, onClick: handleClick })}

      {isErrorModalOpen && <ModalErrorSave onClose={() => setIsErrorModalOpen(false)} />}
    </>
  );
};

export default ButtonAddToBookmarks;
