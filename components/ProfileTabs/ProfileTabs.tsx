'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './ProfileTabs.module.css';

export default function ProfileTabs() {
  const pathname = usePathname();
  const isSaved = pathname === '/profile/saved';

  return (
    <div className={css.tabs}>
      <Link
        href="/profile"
        className={`${css.tab} ${!isSaved ? css.active : ''}`}
      >
        My Articles
      </Link>
      <Link
        href="/profile/saved"
        className={`${css.tab} ${isSaved ? css.active : ''}`}
      >
        Saved Articles
      </Link>
    </div>
  );
}
