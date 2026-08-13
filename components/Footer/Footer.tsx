import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <Link
              href="/home"
              aria-label="Harmoniq — home">
              <Image
                src="/logo.svg"
                alt="Harmoniq Logo"
                width={165}
                height={46}
                priority
              />
            </Link>
          </div>
          {/* Копирайт */}
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Harmoniq. All rights reserved.
          </p>

          {/* Блок навигации */}
          <nav className={styles.nav}>
            <Link
              href="/articles"
              className={styles.link}
            >
              Articles
            </Link>
            <Link
              href="/account"
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
