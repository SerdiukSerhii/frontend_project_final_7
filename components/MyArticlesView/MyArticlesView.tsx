'use client';

import { getUserArticles } from '@/lib/api/articles';
import { useAuthStore } from '@/lib/store/authStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import ArticlesList from '../ArticlesList/ArticlesList';
import Pagination from '../Pagination/Pagination';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const LIMIT = 12;

export default function MyArticlesView() {
  const userId = useAuthStore(state => state.user?._id);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, error } =
    useInfiniteQuery({
      queryKey: ['userArticles', userId],
      queryFn: ({ pageParam }) => getUserArticles(userId as string, pageParam, LIMIT),
      initialPageParam: 1,
      getNextPageParam: lastPage =>
        lastPage.data.hasNextPage ? lastPage.data.page + 1 : undefined,
      enabled: Boolean(userId),
    });

  useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load articles');
    }
  }, [error]);

  if (isLoading) {
    return <Loader />;
  }

  const articles = data?.pages.flatMap(page => page.data.articles) ?? [];

  const handleLoadMore = () => {
    fetchNextPage();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <ArticlesList
        articles={articles}
        isOwner
      />

      <Pagination
        hasMore={Boolean(hasNextPage)}
        isLoading={isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />
    </>
  );
}
