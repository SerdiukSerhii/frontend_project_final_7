'use client';

import { useRouter } from 'next/navigation';
import NoteRenderDetails from '@/components/NoteRenderDetails/NoteRenderDetails';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';

const NotePreview = ({ id }: { id: string }) => {
  const router = useRouter();

  const close = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait..</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={close}>
      <NoteRenderDetails note={note} />
    </Modal>
  );
};

export default NotePreview;
