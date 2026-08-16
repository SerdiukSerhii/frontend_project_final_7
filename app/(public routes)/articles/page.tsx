import type { Metadata } from 'next';
import ArticlesPage from './ArticlesPage';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Discover inspiring articles on Harmoniq.',
  openGraph: {
    title: 'Articles',
    description: 'Discover inspiring articles on Harmoniq.',
  },
};

export default function Page() {
  return <ArticlesPage />;
}
