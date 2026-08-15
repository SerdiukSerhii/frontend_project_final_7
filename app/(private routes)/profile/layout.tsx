'use client';

import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ProfileLayoutProps {
  myArticles: ReactNode;
  savedArticles: ReactNode;
}

export default function ProfileLayout({
  myArticles,
  savedArticles,
}: ProfileLayoutProps) {
  const pathname = usePathname();
  const isSaved = pathname === '/profile/saved';

  return (
    <section className="container">
      <ProfileHeader />
      <ProfileTabs />

      {isSaved ? savedArticles : myArticles}
    </section>
  );
}
