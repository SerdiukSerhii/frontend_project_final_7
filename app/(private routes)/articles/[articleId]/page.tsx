import type { Metadata } from 'next';

import ArticlePageId from './ArticlePageId';
import { getArticleById } from '@/lib/api/articles';

type Props = {
  params: Promise<{
    articleId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { articleId } = await params;

  const article = await getArticleById(articleId);

  return {
    title: article.title,
    description: article.article.slice(0, 160),
    openGraph: {
      title: article.title,
      description: article.article.slice(0, 160),
      images: [article.img],
    },
  };
}

export default function Page() {
  return <ArticlePageId />;
}
