'use client';

import { use, useState, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ArticlesList from '@/components/ArticlesList/ArticlesList';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import { getArticlesByUser } from '@/lib/api/articles';
import { getUserById } from '@/lib/api/users';
import css from '../../(public routes)/articles/ArticlesPage.module.css';
import type { Author } from '@/types/articles';

interface PageProps {
  params: Promise<{ authorId: string }>;
}

export default function AuthorArticlesPage({ params }: PageProps) {
  const { authorId } = use(params);

  const [author, setAuthor] = useState<Author | null>(null);
  const [isAuthorLoading, setIsAuthorLoading] = useState(true);

  const listTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const data = await getUserById(authorId);
        setAuthor(data);
      } finally {
        setIsAuthorLoading(false);
      }
    }

    fetchAuthor();
  }, [authorId]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['articles', 'user', authorId],

    queryFn: ({ pageParam }) =>
      getArticlesByUser(authorId, {
        page: pageParam,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data;

      return page < totalPages ? page + 1 : undefined;
    },
  });

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || '');
    }
  }, [isError, error]);

  const articles =
    data?.pages.flatMap((page) => page.data.articles) ?? [];

  const firstPage = data?.pages[0];

  const totalCount =
    firstPage?.data.totalItems ?? articles.length;

  const handleLoadMore = async () => {
    const result = await fetchNextPage();

    if (result.isSuccess && listTopRef.current) {
      listTopRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  if (isLoading || isAuthorLoading) {
    return (
      <div className={css.container}>
        <Loader />
      </div>
    );
  }

  const avatarSrc = author?.avatarUrl || '/default-avatar.png';

  return (
    <div className={css.container} ref={listTopRef}>
      {author && (
        <div className={css.authorProfileHeader}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt=""
            className={css.authorAvatar}
          />

          <div className={css.authorMeta}>
            <h2 className={css.authorName}>
              {author.name}
            </h2>

            <span className={css.countText}>
              {totalCount} articles
            </span>
          </div>
        </div>
      )}

      <ArticlesList articles={articles} />

      {isFetchingNextPage && <Loader />}

      {hasNextPage && !isFetchingNextPage && (
        <Pagination
          hasMore={hasNextPage}
          isLoading={isFetchingNextPage}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
}