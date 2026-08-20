'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import { getSavedArticles } from '@/lib/api/articles';
import ArticlesList from '@/components/ArticlesList/ArticlesList';
import Pagination from '@/components/Pagination/Pagination';
import Loader from '@/components/Loader/Loader';

const PAGE_SIZE = 12;

export default function SavedArticlesView() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { data, isLoading, error } = useQuery({
    queryKey: ['savedArticles'],
    queryFn: getSavedArticles,
  });

  useEffect(() => {
    if (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load saved articles');
    }
  }, [error]);

  if (isLoading) {
    return <Loader fullScreen={false} />;
  }

  const articles = data ?? [];
  const visibleArticles = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  };

  return (
    <>
      <ArticlesList
        articles={visibleArticles}
        alertTitle="Nothing found."
        alertDescription="Save your first article"
        alertButtonText="Go to articles"
        alertButtonLink="/articles"
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
