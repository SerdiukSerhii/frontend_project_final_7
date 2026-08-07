'use client';

import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api/clientApi';
import Link from 'next/link';
import css from './NotesPage.module.css';

type Props = {
  tag?: string;
};

function NotesClient({ tag }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isFetching } = useQuery({
    queryKey: ['notes', { search: searchQuery, page: currentPage, tag }],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  // ----------Оновлює пошук і скидає сторінку на першу----------
  const handleSearch = useDebouncedCallback((newSearchValue: string) => {
    setSearchQuery(newSearchValue);
    setCurrentPage(1);
  }, 1000);

  return (
    <section>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox
            inputValue={searchQuery}
            onChange={handleSearch}
          />

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          <Link
            href="/notes/action/create"
            className={css.button}
          >
            Create note +
          </Link>
        </header>

        {isFetching && <p>Loading...</p>}

        {notes.length > 0 && <NoteList notes={notes} />}
      </div>
    </section>
  );
}

export default NotesClient;
