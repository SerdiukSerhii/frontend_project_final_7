import Link from 'next/link';
import type { Article } from '../../types/articles';
import ArticlesItem from '../ArticlesItem/ArticlesItem';
import css from './ArticlesList.module.css';

interface ArticlesListProps {
  articles?: Article[];
  isOwner?: boolean;
  alertTitle?: string;
  alertDescription?: string;
  alertButtonText?: string;
  alertButtonLink?: string;
}

export default function ArticlesList({
  articles = [],
  isOwner = false,
  alertTitle = 'Nothing found.',
  alertDescription = 'Be the first, who create an article',
  alertButtonText = 'Create an article',
  alertButtonLink = '/articles/new',
}: ArticlesListProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className={css.alertCard}>
        <div className={css.alertContentWrapper}>
          <div className={css.alertIcon}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={css.icon}
            >
              <path
                d="M32 40.4444V42.5556M32 21.4444V34.1111M51 32C51 42.4934 42.4934 51 32 51C21.5066 51 13 42.4934 13 32C13 21.5066 21.5066 13 32 13C42.4934 13 51 21.5066 51 32Z"
                stroke="var(--black, #070721)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h3 className={css.alertTitle}>{alertTitle}</h3>

          <p className={css.alertDescription}>{alertDescription}</p>
        </div>

        {alertButtonText && (
          <Link
            href={alertButtonLink}
            className={css.alertBtn}
          >
            {alertButtonText}
          </Link>
        )}
      </div>
    );
  }

  return (
    <ul className={css.articlesList}>
      {articles.map(article => {
        if (!article) return null;

        return (
          <ArticlesItem
            key={article._id}
            article={article}
            isOwner={Boolean(isOwner || article?.isOwner)}
          />
        );
      })}
    </ul>
  );
}
