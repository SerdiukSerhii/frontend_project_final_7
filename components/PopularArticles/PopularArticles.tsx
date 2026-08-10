import Link from 'next/link';
// import ArticlesItem from '@/components/ArticlesItem/ArticlesItem';
import ArticlesList from '@/components/ArticlesList/ArticlesList';
import { getArticles } from '@/lib/api/articles';
import css from './PopularArticles.module.css';

const POPULAR_ARTICLES_LIMIT = 4;

const PopularArticles = async () => {
  let articles: Awaited<ReturnType<typeof getArticles>>['articlesQuery'] = [];

  try {
    const data = await getArticles({
      category: 'popular',
      perPage: POPULAR_ARTICLES_LIMIT,
    });
    articles = data.articlesQuery;
  } catch {
    articles = [];
  }

  return (
    <section id="popular-articles">
      <div className="container">
        <div className={css.header}>
          <h2 className={css.title}>Popular Articles</h2>

          <Link
            href="/articles"
            className={css.link}
          >
            Go to all Articles
            <svg
              className={css.arrow}
              width={15}
              height={15}
              aria-hidden="true"
            >
              <use href="/icons/symbol-defs.svg#icon-top-right" />
            </svg>
          </Link>
        </div>

        {/* {articles.length > 0 ? (
          <ul className={css.list}>
            {articles.map(article => (
              <ArticlesItem
                key={article._id}
                article={article}
              />
            ))}
          </ul>
        ) : (
          <p className={css.empty}>No articles available.</p>
        )} */}
        <ArticlesList articles={articles} />
        {/* или потом тамк */}
        {/* <div className={css.popularList}>
          <ArticlesList articles={articles} />
        </div> */}
      </div>
    </section>
  );
};

export default PopularArticles;
