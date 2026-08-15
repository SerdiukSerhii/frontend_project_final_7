import UploadForm from '@/components/Form/UploadForm/UploadForm';
import css from './photo.module.css';

const PhotoPage = () => {
  return (
    <main className={css.page}>
      <UploadForm />
    </main>
  );
};

export default PhotoPage;
