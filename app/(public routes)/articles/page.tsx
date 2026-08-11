'use client';

import { useState, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import ArticlesList from '@/components/ArticlesList/ArticlesList';
import Pagination from '@/components/Pagination/Pagination';
import { getArticles } from '@/lib/api/articles';
import css from './ArticlesPage.module.css';

export default function ArticlesPage() {
  const [filter, setFilter] = useState<'All' | 'Popular'>('All');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const articles = data?.pages.flatMap(page => page?.articles ?? []).filter(Boolean) ?? [];
  const totalCount = data?.pages[0]?.total ?? 0;

  // Закриття дропдауна при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterSelect = (value: 'All' | 'Popular') => {
    setFilter(value);
    setIsOpen(false);
  };

  const handleLoadMore = async () => {
    const result = await fetchNextPage();
    if (result.isSuccess) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className={css.container}>
        <SectionTitle title="Articles" />
        <p style={{ textAlign: 'center', margin: '40px 0' }}>Loading articles...</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      {/* Заголовок */}
      <SectionTitle title="Articles" />

      {/* Блок лічильника та селектора */}
      <div className={css.filterHeader}>
        <span className={css.countText}>{totalCount} articles</span>

        <div
          className={css.filterWrapper}
          ref={dropdownRef}
        >
          <button
            type="button"
            className={css.selectButton}
            onClick={() => setIsOpen(prev => !prev)}
            aria-expanded={isOpen}
          >
            <span>{filter}</span>
            <svg
              className={`${css.chevronIcon} ${isOpen ? css.open : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#595D62"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isOpen && (
            <ul
              className={css.dropdownList}
              role="listbox"
            >
              <li
                role="option"
                aria-selected={filter === 'All'}
                className={`${css.dropdownItem} ${filter === 'All' ? css.active : ''}`}
                onClick={() => handleFilterSelect('All')}
              >
                All
              </li>
              <li
                role="option"
                aria-selected={filter === 'Popular'}
                className={`${css.dropdownItem} ${filter === 'Popular' ? css.active : ''}`}
                onClick={() => handleFilterSelect('Popular')}
              >
                Popular
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Список статей або Порожній стан */}
      <ArticlesList articles={articles} />

      {/* Рендеримо пагінацію тільки якщо є хоча б одна стаття */}
      {articles.length > 0 && (
        <Pagination
          hasMore={Boolean(hasNextPage)}
          isLoading={isFetchingNextPage}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
}
