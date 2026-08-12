'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import SectionTitle from '@/components/SectionTitle/SectionTitle';
//import AuthorsList from '@/components/AuthorsList/AuthorsList';
import Pagination from '@/components/Pagination/Pagination';
import { getAuthors } from '@/lib/api/authors';

export default function AuthorsPage() {
  // 1. Отримуємо дані з бекенду через React Query
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['authors'],
      queryFn: ({ pageParam = 1 }) => getAuthors(pageParam, 20),
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        // Якщо є наступна сторінка — повертаємо її номер
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined; // Якщо це остання сторінка — зупиняємо пагінацію
      },
    });

  // 2. Об'єднуємо всі завантажені сторінки авторів в один масив для накопичення
  const allAuthors = data?.pages.flatMap(page => page.authors) ?? [];

  // 3. Обробка кліку на "Load More"
  const handleLoadMore = async () => {
    const result = await fetchNextPage();
    // При успішному завантаженні скролимо сторінку догори
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
      {/* А. Заголовок */}
      <SectionTitle title="Authors" />

      {/* Тимчасово */}
      <p style={{ textAlign: 'center', margin: '20px 0' }}>Loaded authors: {allAuthors.length}</p>

      {/* Б. Список, який рендерить картки авторів 
      <AuthorsList authors={allAuthors} /> */}

      {/* В. Кнопка "Load More", яка з'являється тільки за наявності нових даних */}
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
