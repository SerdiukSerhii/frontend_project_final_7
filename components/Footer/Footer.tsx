'use client';

import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const user = useAuthStore(state => state.user);
  const pathname = usePathname();

  const hideAccount = pathname === '/register' || pathname === '/login' || pathname === '/photo';

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

            {!hideAccount && (
              <Link
                href={user ? '/profile' : '/login'}
                className={styles.link}
              >
                Account
              </Link>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
