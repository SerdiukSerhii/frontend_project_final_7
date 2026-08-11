'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import ArticlesList from '@/components/ArticlesList/ArticlesList';
import Pagination from '@/components/Pagination/Pagination';
import { getArticles } from '@/lib/api/articles';
import css from './ArticlesPage.module.css';

export default function ArticlesPage() {
  const [filter, setFilter] = useState<'All' | 'Popular'>('All');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['articles', filter],
    queryFn: ({ pageParam = 1 }) => getArticles({ page: pageParam, limit: 12, filter }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < lastPage.totalPages) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  const articles = data?.pages.flatMap(page => page.articles) ?? [];
  const totalCount = data?.pages[0]?.total ?? 0;

  const handleFilterChange = (newFilter: 'All' | 'Popular') => {
    if (newFilter !== filter) {
      setFilter(newFilter);
    }
  };

  const handleLoadMore = async () => {
    await fetchNextPage();
  };

  return (
    <div className={css.container}>
      <SectionTitle title="Articles" />

      <div className={css.filterHeader}>
        <span className={css.countText}>{totalCount} articles</span>

        <select
          value={filter}
          onChange={e => handleFilterChange(e.target.value as 'All' | 'Popular')}
          className={css.filterSelect}
        >
          <option value="All">All</option>
          <option value="Popular">Popular</option>
        </select>
      </div>

      <ArticlesList articles={articles} />

      <Pagination
        hasMore={Boolean(hasNextPage)}
        isLoading={isLoading || isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
}
