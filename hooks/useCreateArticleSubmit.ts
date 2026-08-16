import type { AddArticleFormValues } from '@/types/createArticle';
import type { FormikHelpers } from 'formik';

export const useCreateArticleSubmit = () => {
  return async (
    _values: AddArticleFormValues,
    actions: FormikHelpers<AddArticleFormValues>,
  ) => {
    actions.setSubmitting(false);
  };
};
