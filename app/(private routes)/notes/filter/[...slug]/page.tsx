import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/serverApi';
import { notFound } from 'next/navigation';
import { NOTE_TAGS, NoteTag } from '@/types/note';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type TagProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: TagProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

  const metaTag = tag ? `${tag} notes` : 'All notes';

  return {
    title: metaTag,
    description: `Notes filtered by: ${metaTag}`,

    openGraph: {
      title: metaTag,
      description: `Notes filtered by: ${metaTag}`,
      url: `/notes/filter/${slug.join('/')}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: metaTag,
        },
      ],
    },
  };
}

const NotesByTag = async ({ params }: TagProps) => {
  const { slug } = await params;
  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', page: 1, tag }],
    queryFn: () => fetchNotes('', 1, tag),
  });

  if (tag && !NOTE_TAGS.includes(tag as NoteTag)) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByTag;
