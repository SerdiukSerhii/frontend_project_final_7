import type { Metadata } from 'next';
import EditArticleClientPage from './EditArticleClientPage';

export const metadata: Metadata = {
  title: 'Edit Article',
  description: 'Edit your article on Harmoniq.',
};

interface EditArticlePageProps {
  params: Promise<{
    articleId: string;
  }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { articleId } = await params;

  return <EditArticleClientPage articleId={articleId} />;
}
