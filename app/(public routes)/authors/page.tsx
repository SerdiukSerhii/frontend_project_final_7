import type { Metadata } from 'next';

import AuthorsPage from './AuthorsPage';

export const metadata: Metadata = {
  title: 'Authors',
  description: 'Discover creators and authors on Harmoniq.',
  openGraph: {
    title: 'Authors',
    description: 'Discover creators and authors on Harmoniq.',
  },
};

export default function Page() {
  return <AuthorsPage />;
}
