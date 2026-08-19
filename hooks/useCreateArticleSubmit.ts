'use client';

import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import type { FormikHelpers } from 'formik';

import { createArticle, updateArticle } from '@/lib/api/articles';
import { useArticleStore } from '@/lib/store/articleStore';
import { buildCreateArticleFormData } from '@/lib/utils/createArticle';
import type { AddArticleFormValues } from '@/types/createArticle';

interface ApiErrorResponse {
  message?: string;
  response?: {
    message?: string;
  };
}

export const useCreateArticleSubmit = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const editingArticle = useArticleStore(state => state.editingArticle);
  const clearEditingArticle = useArticleStore(state => state.clearEditingArticle);

  const handleSubmit = async (
    values: AddArticleFormValues,
    actions: FormikHelpers<AddArticleFormValues>
  ) => {
    const isEditing = Boolean(editingArticle);

    try {
      const formData = buildCreateArticleFormData(values, {
        requireImage: !isEditing,
        includeDate: !isEditing,
      });

      const savedArticle = editingArticle
        ? await updateArticle(editingArticle._id, formData)
        : await createArticle(formData);

      queryClient.setQueryData(['article', savedArticle._id], savedArticle);

      await queryClient.invalidateQueries({
        queryKey: ['articles'],
      });

      toast.success(
        isEditing ? 'Article updated successfully!' : 'Article published successfully!'
      );

      router.push(`/articles/${savedArticle._id}`);

      if (isEditing) {
        clearEditingArticle();
      }
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const backendMessage =
          error.response?.data?.message ?? error.response?.data?.response?.message;

        switch (error.response?.status) {
          case 400:
            toast.error(backendMessage ?? 'Please check the entered article data.');
            break;

          case 401:
            toast.error(
              `You need to be logged in to ${isEditing ? 'update' : 'publish'} an article.`
            );
            break;

          case 403:
            toast.error(backendMessage ?? 'You do not have permission to edit this article.');
            break;

          case 404:
            toast.error(backendMessage ?? 'Article not found.');
            break;

          case 413:
            toast.error('The selected photo is too large.');
            break;

          case 500:
            toast.error('Server error. Please try again later.');
            break;

          default:
            toast.error(
              backendMessage ??
                `Failed to ${isEditing ? 'update' : 'publish'} the article. Please try again.`
            );
        }
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return handleSubmit;
};
