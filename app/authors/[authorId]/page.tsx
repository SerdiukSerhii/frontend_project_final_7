'use client';

import { use, useState, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import ArticlesList from '@/components/ArticlesList/ArticlesList';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';
import { getArticles } from '@/lib/api/articles';
import { getUserById } from '@/lib/api/users';
import css from '../../(public routes)/articles/ArticlesPage.module.css';

interface PageProps {
  params: Promise<{ authorId: string }>;
}

interface Author {
  name: string;
  photoUrl?: string;
  avatar?: string;
  image?: string;
  picture?: string;
}

interface ArticlePageResponse {
  articles: Array<unknown>;
  totalPages?: number;
  totalArticles?: number;
  totalItems?: number;
}

export default function AuthorArticlesPage({ params }: PageProps) {
  const { authorId } = use(params);

  const [author, setAuthor] = useState<Author | null>(null);
  const [isAuthorLoading, setIsAuthorLoading] = useState(true);

  const listTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const data = (await getUserById(authorId)) as Author;
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
    queryKey: ['articles', authorId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getArticles({ page: pageParam as number, authorId } as Record<string, unknown>);
      return response as ArticlePageResponse;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: ArticlePageResponse | undefined, allPages) => {
      if (!lastPage) return undefined;

      const totalPages =
        lastPage.totalPages ??
        Math.ceil((lastPage.totalArticles ?? 0) / 12);

      if (allPages.length < totalPages) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || 'Сталася помилка під час запиту');
    }
  }, [isError, error]);

  const articles = data?.pages.flatMap((page) => (page as ArticlePageResponse)?.articles ?? []) ?? [];

  const firstPage = data?.pages[0] as ArticlePageResponse | undefined;
  const totalCount =
    firstPage?.totalArticles ??
    firstPage?.totalItems ??
    articles.length;

  const handleLoadMore = async () => {
    const result = await fetchNextPage();
    if (result.isSuccess) {
      if (listTopRef.current) {
        listTopRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (isLoading || isAuthorLoading) {
    return (
      <div className={css.container}>
        <Loader />
      </div>
    );
  }

  const avatarSrc = author?.photoUrl || author?.avatar || author?.image || author?.picture || '/default-avatar.png';

  return (
    <div className={css.container} ref={listTopRef}>
      {author && (
        <div className={css.authorProfileHeader}>
          {/* Використовуємо стандартний img з директивою ігнорування ESLint для простоти */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt=""
            className={css.authorAvatar}
          />
          <div className={css.authorMeta}>
            <h2 className={css.authorName}>{author.name}</h2>
            <span className={css.countText}>{totalCount} articles</span>
          </div>
        </div>
      )}

      <ArticlesList articles={articles as Array<never>} />

      {isFetchingNextPage && <Loader />}

      {Boolean(hasNextPage) && !isFetchingNextPage && (
        <Pagination
          hasMore={Boolean(hasNextPage)}
          isLoading={isFetchingNextPage}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
}