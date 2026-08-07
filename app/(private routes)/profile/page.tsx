import { getMe } from '@/lib/api/serverApi';
import Link from 'next/link';
import Image from 'next/image';

import css from './ProfilePage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'Your personal profile page.',

  openGraph: {
    title: 'Profile Page',
    description: 'Your personal profile page.',
    url: 'https://09-auth-pearl-xi.vercel.app/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile Page',
      },
    ],
  },
};

const Profile = async () => {
  const user = await getMe();

  return (
    <section>
      <div className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link
              href="/profile/edit"
              className={css.editProfileButton}
            >
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user?.username}</p>
            <p>Email: {user?.email}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
