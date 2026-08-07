'use client';

import { useRouter } from 'next/navigation';
import NoteRenderDetails from '@/components/NoteRenderDetails/NoteRenderDetails';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import css from './NoteDetails.module.css';

const NoteDetailsClient = ({ id }: { id: string }) => {
  const router = useRouter();

  const goBack = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait..</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <section>
      <button
        onClick={goBack}
        className={css.backButton}
      >
        Go Back
      </button>
      <NoteRenderDetails note={note} />
    </section>
  );
};

export default NoteDetailsClient;
