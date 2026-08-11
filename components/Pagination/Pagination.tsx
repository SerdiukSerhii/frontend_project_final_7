import React from 'react';
import css from './Pagination.module.css';

interface PaginationProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export default function Pagination({ hasMore, isLoading, onLoadMore }: PaginationProps) {
  // Якщо статей більше немає в БД — кнопка зникає
  if (!hasMore) return null;

  return (
    <div className={css.paginationContainer}>
      <button
        type="button"
        className={css.loadMoreBtn}
        onClick={onLoadMore}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'LoadMore'}
      </button>
    </div>
  );
}
