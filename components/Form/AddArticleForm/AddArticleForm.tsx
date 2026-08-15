'use client';

import { useRef, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Form, Formik, type FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { createArticle } from '@/lib/api/articles';
import { useAuthStore } from '@/lib/store/authStore';

import FormField from '../FormField/FormField';
import FormTextarea from '../FormTextarea/FormTextarea';
import css from './AddArticleForm.module.css';

const today = new Date().toISOString().split('T')[0];

const AddArticleSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, 'At least 3 characters')
    .max(48, 'At most 48 characters')
    .required('Title is required'),
  desc: Yup.string()
    .trim()
    .min(100, 'At least 100 characters')
    .max(4000, 'At most 4000 characters')
    .required('Description is required'),
  article: Yup.string().trim().required('Article text is required'),
  date: Yup.string().required('Date is required'),
});

interface AddArticleFormValues {
  title: string;
  desc: string;
  article: string;
  date: string;
}

const initialValues: AddArticleFormValues = {
  title: '',
  desc: '',
  article: '',
  date: today,
};

const AddArticleForm = () => {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;

    setSelectedFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    values: AddArticleFormValues,
    actions: FormikHelpers<AddArticleFormValues>,
  ) => {
    if (!selectedFile) {
      toast.error('Please select a photo for the article.');
      return;
    }

    try {
      const response = await createArticle({
        ...values,
        author: user?.name ?? 'Anonymous',
        img: selectedFile,
      });

      toast.success('Article published successfully!');
      actions.resetForm();
      setSelectedFile(null);
      setPreviewUrl(null);

      router.push(`/articles/${response.data._id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data as { message?: string } | undefined;
        toast.error(responseData?.message ?? 'Failed to publish the article. Please try again.');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddArticleSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <FormField name="title" label="Article title" placeholder="Enter title" />

          <FormTextarea
            name="desc"
            label="Short description"
            placeholder="Write a short description (min. 100 characters)"
            rows={4}
          />

          <FormTextarea
            name="article"
            label="Article text"
            placeholder="Write the full article text"
            rows={10}
          />

          <button
            type="button"
            className={css.uploadBtn}
            onClick={() => inputRef.current?.click()}
          >
            {previewUrl ? 'Change photo' : 'Upload photo'}
          </button>

          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Preview" className={css.preview} />
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className={css.fileInput}
            onChange={handleFileChange}
          />

          <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddArticleForm;