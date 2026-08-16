import UploadForm from '@/components/Form/UploadForm/UploadForm';
import css from './photo.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload Photo',
  description: 'Upload your profile photo.',
};

const PhotoPage = () => {
  return (
    <main className={css.page}>
      <UploadForm />
    </main>
  );
};

export default PhotoPage;
