'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
import AuthorsList from '@/components/AuthorsList/AuthorsList';
import Pagination from '@/components/Pagination/Pagination';
import { getAuthors } from '@/lib/api/authors';
import Loader from '@/components/Loader/Loader';

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
      gcTime: 0,
    });

  const allAuthors = data?.pages.flatMap(page => page.authors) ?? [];

  if (isLoading) {
    return (
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <Loader />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <SectionTitle title="Authors" />
          <p style={{ textAlign: 'center', margin: '40px 0', color: 'red' }}>
            Failed to load authors.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '48px 0' }}>
      <div className="container">
        <SectionTitle title="Authors" />

        <AuthorsList authors={allAuthors} />

        {Boolean(hasNextPage) && (
          <Pagination
            hasMore={Boolean(hasNextPage)}
            isLoading={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
          />
        )}
      </div>
    </section>
  );
}
