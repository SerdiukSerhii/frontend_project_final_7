import AddArticleForm from '@/components/Form/AddArticleForm/AddArticleForm';

import css from './NewArticlePage.module.css';

const NewArticlePage = () => {
  return (
    <section className={`container ${css.page}`}>
      <AddArticleForm />
    </section>
  );
};

export default NewArticlePage;
