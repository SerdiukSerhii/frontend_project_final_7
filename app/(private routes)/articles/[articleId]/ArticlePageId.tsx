'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';

import { getArticleById, getRelatedArticles } from '@/lib/api/articles';

import { getCurrentUser } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';

import Loader from '@/components/Loader/Loader';
import ButtonAddToBookmarks from '@/components/ButtonAddToBookmarks/ButtonAddToBookmarks';

import css from './ArticlePage.module.css';

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) {
    return dateStr;
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const richTextPattern = /<(?:p|h2|ul|ol|blockquote)\b[^>]*>/i;

const sanitizeArticleHtml = (content: string) =>
  DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'h2',
      'strong',
      'em',
      'ul',
      'ol',
      'li',
      'blockquote',
    ],
    ALLOWED_ATTR: [],
  });

const ArticlePageId = () => {
  const { articleId } = useParams<{ articleId: string }>();

  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const isAuthenticated = Boolean(user);

  useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const freshUser = await getCurrentUser();
      setUser(freshUser);
      return freshUser;
    },
    enabled: isAuthenticated,
    staleTime: 0,
  });

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['article', articleId],
    queryFn: () => getArticleById(articleId),
    enabled: Boolean(articleId),
  });

  const { data: relatedArticles = [] } = useQuery({
    queryKey: ['relatedArticles', articleId],
    queryFn: () => getRelatedArticles(articleId),
    enabled: Boolean(articleId),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !article) {
    return <p className={css.notFound}>Article not found.</p>;
  }

  const author = typeof article.ownerId === 'object' ? article.ownerId : null;

  const authorName = author?.name ?? 'Harmoniq Author';
  const authorId = author?._id;

  const isRichTextArticle = richTextPattern.test(article.article);

  const sanitizedArticleHtml = isRichTextArticle
    ? sanitizeArticleHtml(article.article)
    : '';

  const descriptionParagraphs = isRichTextArticle
    ? []
    : article.article
        .split('\n')
        .filter(paragraph => paragraph.trim());

  return (
    <section className="container">
      <div className={css['article-container']}>
        <h1 className={css.title}>{article.title}</h1>

        <div className={css.imageWrapper}>
          <Image
            src={article.img}
            alt={article.title}
            fill
            priority
            className={css.image}
          />
        </div>

        <div className={css.layout}>
          <div className={css.content}>
            {isRichTextArticle ? (
              <div
                className={css.richText}
                dangerouslySetInnerHTML={{ __html: sanitizedArticleHtml }}
              />
            ) : (
              descriptionParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={css.paragraph}
                >
                  {paragraph}
                </p>
              ))
            )}
          </div>

          <aside className={css.sidebar}>
            <h2 className={css.sidebarTitle}>You can also interested</h2>

            <p className={css.meta}>
              <span className={css.metaLabel}>Author:</span>{' '}
              {authorId ? (
                <Link
                  href={`/authors/${authorId}`}
                  className={css.authorLink}
                >
                  {authorName}
                </Link>
              ) : (
                authorName
              )}
            </p>

            <p className={css.meta}>
              <span className={css.metaLabel}>Publication date:</span> {formatDate(article.date)}
            </p>

            {relatedArticles.length > 0 && (
              <ul className={css.relatedList}>
                {relatedArticles.map(related => {
                  const relatedAuthor =
                    typeof related.ownerId === 'object' ? related.ownerId.name : 'Harmoniq Author';

                  return (
                    <li
                      key={related._id}
                      className={css.relatedItem}
                    >
                      <p className={css.relatedTitle}>{related.title}</p>

                      <p className={css.relatedAuthor}>{relatedAuthor}</p>

                      <Link
                        href={`/articles/${related._id}`}
                        className={css.relatedBtn}
                        aria-label={`Read ${related.title}`}
                      >
                        <svg
                          className={css.relatedIcon}
                          aria-hidden="true"
                        >
                          <use href="/icons/symbol-defs.svg#icon-top-right" />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            <ButtonAddToBookmarks
              articleId={articleId}
              className={css.saveBtn}
              showText={true}
            />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ArticlePageId;
