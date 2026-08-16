import type { Metadata } from 'next';

import AuthorPageId from './AuthorPageId';
import { getUserById } from '@/lib/api/users';

type Props = {
  params: Promise<{
    authorId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { authorId } = await params;

  const author = await getUserById(authorId);

  return {
    title: author.name,
    description: `Discover articles by ${author.name} on Harmoniq.`,
    openGraph: {
      title: `${author.name}`,
      description: `Discover articles by ${author.name} on Harmoniq.`,
      images: author.avatarUrl ? [author.avatarUrl] : undefined,
    },
  };
}

export default function Page({ params }: Props) {
  return <AuthorPageId params={params} />;
}
