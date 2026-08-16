import type { Metadata } from 'next';
import AddArticleForm from '@/components/Form/AddArticleForm/AddArticleForm';
import css from './NewArticlePage.module.css';

export const metadata: Metadata = {
  title: 'Create an Article',
  description: 'Create and publish a new article on Harmoniq.',
};

const NewArticlePage = () => {
  return (
    <section className={`container ${css.page}`}>
      <AddArticleForm />
    </section>
  );
};

export default NewArticlePage;

