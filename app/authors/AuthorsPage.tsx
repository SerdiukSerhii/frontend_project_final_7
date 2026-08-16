'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import AuthorsList from '@/components/AuthorsList/AuthorsList';
import Pagination from '@/components/Pagination/Pagination';
import { getAuthors } from '@/lib/api/authors';

export default function AuthorsPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['authors'],
      queryFn: ({ pageParam = 1 }) => getAuthors(pageParam, 20),
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    });

  const allAuthors = data?.pages.flatMap(page => page.authors) ?? [];

  const handleLoadMore = async () => {
    const result = await fetchNextPage();

    if (result.isSuccess) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <SectionTitle title="Authors" />
        <p style={{ textAlign: 'center', margin: '40px 0' }}>Loading authors...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: '20px' }}>
        <SectionTitle title="Authors" />
        <p style={{ textAlign: 'center', margin: '40px 0', color: 'red' }}>
          Failed to load authors.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <SectionTitle title="Authors" />

      {/* Тимчасово */}
      <p style={{ textAlign: 'center', margin: '20px 0' }}>Loaded authors: {allAuthors.length}</p>

      <AuthorsList authors={allAuthors} />

      {Boolean(hasNextPage) && (
        <Pagination
          hasMore={Boolean(hasNextPage)}
          isLoading={isFetchingNextPage}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
}
