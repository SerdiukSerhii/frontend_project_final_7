'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import type { FormikHelpers } from 'formik';

import { createArticle } from '@/lib/api/articles';
import { buildCreateArticleFormData } from '@/lib/utils/createArticle';
import type { AddArticleFormValues } from '@/types/createArticle';

interface ApiErrorResponse {
  message?: string;
}

export const useCreateArticleSubmit = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: AddArticleFormValues,
    actions: FormikHelpers<AddArticleFormValues>
  ) => {
    try {
      const formData = buildCreateArticleFormData(values);
      const createdArticle = await createArticle(formData);

      toast.success('Article published successfully!');

      router.push(`/articles/${createdArticle._id}`);
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const backendMessage = error.response?.data?.message;

        switch (error.response?.status) {
          case 400:
            toast.error(backendMessage ?? 'Please check the entered article data.');
            break;
          case 401:
            toast.error('You need to be logged in to publish an article.');
            break;
          case 413:
            toast.error('The selected photo is too large.');
            break;
          case 500:
            toast.error('Server error. Please try again later.');
            break;

          default:
            toast.error(backendMessage ?? 'Failed to publish the article. Please try again.');
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
