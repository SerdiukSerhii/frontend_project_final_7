import type { ReactNode } from 'react';

import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs';

interface ProfileLayoutProps {
  myArticles: ReactNode;
  savedArticles: ReactNode;
}

export default function ProfileLayout({ myArticles, savedArticles }: ProfileLayoutProps) {
  return (
    <section className="container">
      <ProfileHeader />
      <ProfileTabs />

      {myArticles}
      {savedArticles}
    </section>
  );
}
