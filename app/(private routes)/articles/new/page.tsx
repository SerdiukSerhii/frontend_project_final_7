import type { Metadata } from 'next';
import NewArticlePage from './NewArticlePage';

export const metadata: Metadata = {
  title: 'Create an Article',
  description: 'Create and publish a new article on Harmoniq.',
};

const newPage = () => {
  return <NewArticlePage />;
};

export default newPage;
