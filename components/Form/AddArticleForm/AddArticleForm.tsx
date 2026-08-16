'use client';

import { useEffect, useRef, useState } from 'react';
import { Form, Formik } from 'formik';

import { useCreateArticleSubmit } from '@/hooks/useCreateArticleSubmit';
import { createArticleSchema } from '@/lib/validation/createArticleSchema';
import { initialAddArticleFormValues } from '@/types/createArticle';

import FormField from '../FormField/FormField';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import css from './AddArticleForm.module.css';

const AddArticleForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = useCreateArticleSubmit();

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <Formik
      initialValues={initialAddArticleFormValues}
      validationSchema={createArticleSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {({ errors, isSubmitting, isValid, setFieldTouched, setFieldValue, touched, values }) => {
        const imageError = touched.image && errors.image ? String(errors.image) : null;

        const editorError =
          touched.articleText && (errors.articleText || errors.article)
            ? String(errors.articleText || errors.article)
            : null;

        const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.currentTarget.files?.[0] ?? null;

          await setFieldValue('image', file);
          await setFieldTouched('image', true, true);

          setPreviewUrl(file ? URL.createObjectURL(file) : null);
        };

        const removeImage = async () => {
          await setFieldValue('image', null);
          await setFieldTouched('image', true, true);

          setPreviewUrl(null);

          if (inputRef.current) {
            inputRef.current.value = '';
          }
        };

        return (
          <Form className={css.form}>
            <div className={css.heading}>
              <h1 className={css.title}>Create an article</h1>
            </div>

            <div className={css.fields}>
              <div className={css.titleField}>
                <FormField
                  name="title"
                  label={values.title.trim() ? 'Article Title' : 'Title'}
                  placeholder="Enter the title"
                  autoComplete="off"
                />
              </div>

              <div className={`${css.fieldGroup} ${css.imageGroup}`}>
                <div className={`${css.imageField} ${imageError ? css.fieldError : ''}`}>
                  {previewUrl ? (
                    <div className={css.previewWrapper}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className={css.preview}
                        src={previewUrl}
                        alt="Selected article preview"
                      />

                      <button
                        type="button"
                        className={css.removeImageButton}
                        aria-label="Remove selected photo"
                        onClick={removeImage}
                      >
                        <svg>
                          <use href="/icons/symbol-defs.svg#icon-close-small" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className={css.selectImageButton}
                      aria-label="Choose article photo"
                      onClick={() => inputRef.current?.click()}
                    >
                      <svg className={css.cameraIcon}>
                        <use href="/icons/symbol-defs.svg#icon-camera" />
                      </svg>
                    </button>
                  )}
                </div>

                <input
                  ref={inputRef}
                  className={css.fileInput}
                  id="article-image"
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  aria-label="Article photo"
                  onChange={handleImageChange}
                />

                {previewUrl && (
                  <button
                    type="button"
                    className={css.changeImageButton}
                    onClick={() => inputRef.current?.click()}
                  >
                    Change photo
                  </button>
                )}

                {imageError && <span className={css.error}>{imageError}</span>}
              </div>

              <div className={`${css.fieldGroup} ${css.editorGroup}`}>
                <RichTextEditor
                  value={values.article}
                  hasError={Boolean(editorError)}
                  onChange={(html, text) => {
                    void setFieldValue('article', html);
                    void setFieldValue('articleText', text);
                  }}
                  onBlur={() => {
                    void setFieldTouched('article', true, true);

                    void setFieldTouched('articleText', true, true);
                  }}
                />

                {editorError && <span className={css.error}>{editorError}</span>}
              </div>

              <button
                type="submit"
                className={css.submitButton}
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Publishing...' : 'Publish Article'}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddArticleForm;
