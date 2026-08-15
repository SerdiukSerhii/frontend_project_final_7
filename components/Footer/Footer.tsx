'use client';

import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';

export default function Footer() {
  const user = useAuthStore(state => state.user);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <Link
              href="/"
              aria-label="Harmoniq home"
            >
              <Image
                src="/logo.svg"
                alt="Harmoniq Logo"
                width={165}
                height={46}
                priority
              />
            </Link>
          </div>

          <p className={styles.copyright}>
            © {new Date().getFullYear()} Harmoniq. All rights reserved.
          </p>

          <nav className={styles.nav}>
            <Link
              href="/articles"
              className={styles.link}
            >
              Articles
            </Link>

            <Link
              href={user ? '/profile' : '/login'}
              className={styles.link}
            >
              Account
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
