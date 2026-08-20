'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import { getUserArticles } from '@/lib/api/articles';
import { useAuthStore } from '@/lib/store/authStore';
import ArticlesList from '@/components/ArticlesList/ArticlesList';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';

const PAGE_SIZE = 12;

export default function MyArticlesView() {
  const userId = useAuthStore(state => state.user?._id);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { data, isLoading, error } = useQuery({
    queryKey: ['userArticlesList', userId],
    queryFn: () => getUserArticles(userId as string, 1, 100),
    enabled: Boolean(userId),
  });

  useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load articles');
    }
  }, [error]);

  if (isLoading) return <Loader fullScreen={false} />;

  // 🪄 Бронебойное считывание статей в любых форматах ответа сервера:
  const rawData = data as unknown as { data?: unknown };
  const articles = Array.isArray(rawData?.data)
    ? rawData.data
    : Array.isArray((rawData?.data as { articles?: unknown })?.articles)
      ? (rawData?.data as { articles: [] }).articles
      : [];

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  return (
    <>
      <ArticlesList
        articles={visibleArticles}
        isOwner
      />

      {hasMore && (
        <Pagination
          hasMore={hasMore}
          isLoading={false}
          onLoadMore={handleLoadMore}
        />
      )}
    </>
  );
}
