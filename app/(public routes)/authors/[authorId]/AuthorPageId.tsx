'use client';

import { use, useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ArticlesList from '@/components/ArticlesList/ArticlesList';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import { getArticlesByUser } from '@/lib/api/articles';
import { getUserById } from '@/lib/api/users';
import css from './AuthorPageId.module.css';
import type { Author } from '@/types/articles';
import Image from 'next/image';

interface PageProps {
  params: Promise<{ authorId: string }>;
}

export default function AuthorArticlesPage({ params }: PageProps) {
  const { authorId } = use(params);

  const [author, setAuthor] = useState<Author | null>(null);
  const [isAuthorLoading, setIsAuthorLoading] = useState(true);

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

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ['articles', 'user', authorId],

      queryFn: ({ pageParam }) =>
        getArticlesByUser(authorId, {
          page: pageParam,
        }),

      initialPageParam: 1,

      getNextPageParam: lastPage => {
        const { page, totalPages } = lastPage.data;

        return page < totalPages ? page + 1 : undefined;
      },
    });

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || '');
    }
  }, [isError, error]);

  const articles = data?.pages.flatMap(page => page.data.articles) ?? [];

  const firstPage = data?.pages[0];

  const totalCount = firstPage?.data.totalItems ?? articles.length;

  const handleLoadMore = () => {
    fetchNextPage();
  };

  if (isLoading || isAuthorLoading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  const avatarSrc = author?.avatarUrl || '/default-avatar.png';

  return (
    <section className={css.authorSection}>
      <div className="container">
        {author && (
          <div className={css.authorProfileHeader}>
            <Image
              src={avatarSrc}
              alt={author.name}
              width={137}
              height={137}
              className={css.avatar}
              priority
              unoptimized
            />

            <div className={css.authorInfo}>
              <h2 className={css.authorName}>{author.name}</h2>
              <p className={css.countText}>{totalCount} articles</p>
            </div>
          </div>
        )}

        <ArticlesList articles={articles} />

        {hasNextPage && (
          <Pagination
            hasMore={hasNextPage}
            isLoading={isFetchingNextPage}
            onLoadMore={handleLoadMore}
          />
        )}
      </div>
    </section>
  );
}
