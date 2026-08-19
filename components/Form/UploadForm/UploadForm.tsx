'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { updateUserAvatar } from '@/lib/api/users';
import { useAuthStore } from '@/lib/store/authStore';
import css from './UploadForm.module.css';

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const openFilePicker = () => inputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;

    setSelectedFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleClose = () => {
    if (selectedFile) {
      handleReset();
      return;
    }

    router.push('/');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error('Please select a photo before continuing.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { url } = await updateUserAvatar(selectedFile);

      if (user) {
        setUser({
          ...user,
          avatarUrl: url,
        });
      }
      toast.success('Photo uploaded successfully!');
      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 400:
            toast.error('Please select a valid photo file.');
            break;

          case 401:
            toast.error('You need to be logged in to upload a photo.');
            break;

          case 500:
            toast.error('Server error. Please try again later.');
            break;

          default:
            toast.error('Something went wrong. Please try again.');
        }
      } else {
        toast.error('Something went wrong...');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.card}>
      <button
        type="button"
        className={css.cornerBtn}
        onClick={handleClose}
        aria-label={selectedFile ? 'Clear selected photo' : 'Skip photo upload'}
      >
        <svg className={css.cornerIcon}>
          <use href="/icons/symbol-defs.svg#icon-close-small" />
        </svg>
      </button>

      <form
        className={css.form}
        onSubmit={handleSubmit}
      >
        <h2 className={css.title}>Upload your photo</h2>

        <button
          type="button"
          className={css.photoCircle}
          onClick={openFilePicker}
          aria-label="Choose photo"
        >
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Selected preview"
              className={css.previewImg}
            />
          ) : (
            <svg className={css.cameraIcon}>
              <use href="/icons/symbol-defs.svg#icon-camera" />
            </svg>
          )}
        </button>

        <input
          ref={inputRef}
          id="avatar"
          name="avatar"
          type="file"
          accept="image/*"
          className={css.fileInput}
          onChange={handleFileChange}
        />

        <button
          type="submit"
          className={css.saveBtn}
          disabled={!selectedFile || isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
