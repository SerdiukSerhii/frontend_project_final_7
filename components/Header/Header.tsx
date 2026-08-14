'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import UserBar from '@/components/UserBar/UserBar';
import { useAuthStore } from '@/lib/store/authStore';

import css from './Header.module.css';

const Header = () => {
  const pathname = usePathname();

  const user = useAuthStore(state => state.user);
  const isAuthReady = useAuthStore(state => state.isAuthReady);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const isAuthenticated = Boolean(user);

  const isAuthenticated = isAuthReady && Boolean(user);

  const isActivePath = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getNavLinkClassName = (
    href: string,
    baseClassName: string
  ) => {
    return `${baseClassName} ${
      isActivePath(href) ? css.activeNavLink : ''
    }`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(previousState => !previousState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={css.header}>
      <div className={`container ${css.headerContainer}`}>
        <Link
          href="/"
          className={css.logo}
          aria-label="Harmoniq home"
          onClick={closeMenu}
        >
          <Image
            className={css.logoImage}
            src="/logo.svg"
            alt="Harmoniq"
            width={149}
            height={35}
            priority
          />
        </Link>

        <>
          {/* Desktop navigation */}
          <nav
            className={css.desktopNavigation}
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className={getNavLinkClassName(
                '/',
                css.navLink
              )}
              aria-current={
                isActivePath('/') ? 'page' : undefined
              }
            >
              Home
            </Link>

            <Link
              href="/articles"
              className={getNavLinkClassName(
                '/articles',
                css.navLink
              )}
              aria-current={
                isActivePath('/articles') ? 'page' : undefined
              }
            >
              Articles
            </Link>

            <Link
              href="/authors"
              className={getNavLinkClassName(
                '/authors',
                css.navLink
              )}
              aria-current={
                isActivePath('/authors') ? 'page' : undefined
              }
            >
              Creators
            </Link>

            {isAuthenticated && (
              <Link
                href="/profile"
                className={getNavLinkClassName(
                  '/profile',
                  css.navLink
                )}
                aria-current={
                  isActivePath('/profile') ? 'page' : undefined
                }
              >
                My Profile
              </Link>
            )}
          </nav>

          {/* Desktop actions */}
          <div className={css.desktopActions}>
            {!isAuthReady ? (
              <div
                className={css.authPlaceholder}
                aria-hidden="true"
              />
            ) : isAuthenticated && user ? (
              <>
                <Link
                  href="/articles/new"
                  className={css.primaryLink}
                >
                  Create an article
                </Link>

                <UserBar
                  name={user.name}
                  avatar={user.avatarUrl}
                />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={css.loginLink}
                >
                  Log in
                </Link>

                <Link
                  href="/register"
                  className={css.primaryLink}
                >
                  Join now
                </Link>
              </>
            )}
          </div>

          {/* Tablet contextual action */}
          {isAuthReady && (
            <div className={css.tabletAction}>
              {isAuthenticated ? (
                <Link
                  href="/articles/new"
                  className={css.primaryLink}
                  onClick={closeMenu}
                >
                  Create an article
                </Link>
              ) : (
                <Link
                  href="/register"
                  className={css.primaryLink}
                  onClick={closeMenu}
                >
                  Join now
                </Link>
              )}
            </div>
          )}

          {/* Mobile and tablet menu button */}
          <button
            className={css.menuButton}
            type="button"
            aria-label={
              isMenuOpen ? 'Close menu' : 'Open menu'
            }
            aria-expanded={isMenuOpen}
            aria-controls="header-mobile-menu"
            onClick={toggleMenu}
          >
            {/* <svg
              className={`${css.menuIcon} ${
                isMenuOpen ? css.closeIcon : ''
                }`
              }
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use
                href={
                  isMenuOpen
                    ? '/icons/symbol-defs.svg#icon-close'
                    : '/icons/symbol-defs.svg#icon-burger-menu'
                }
              />
            </svg> */}
            <svg
              className={css.menuIcon}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <>
                  <path d="M5 5L19 19" />
                  <path d="M19 5L5 19" />
                </>
              ) : (
                <>
                  <path d="M3 6H21" />
                  <path d="M3 12H21" />
                  <path d="M3 18H21" />
                </>
              )}
            </svg>
          </button>
        </>
      </div>

      {/* Mobile and tablet navigation */}
      {isMenuOpen && (
        <div
          id="header-mobile-menu"
          className={css.mobileMenu}
        >
          <nav
            className={`container ${css.mobileNavigation}`}
            aria-label="Mobile navigation"
          >
            <Link
              href="/"
              className={getNavLinkClassName(
                '/',
                css.mobileNavLink
              )}
              aria-current={
                isActivePath('/') ? 'page' : undefined
              }
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              href="/articles"
              className={getNavLinkClassName(
                '/articles',
                css.mobileNavLink
              )}
              aria-current={
                isActivePath('/articles') ? 'page' : undefined
              }
              onClick={closeMenu}
            >
              Articles
            </Link>

            <Link
              href="/authors"
              className={getNavLinkClassName(
                '/authors',
                css.mobileNavLink
              )}
              aria-current={
                isActivePath('/authors') ? 'page' : undefined
              }
              onClick={closeMenu}
            >
              Creators
            </Link>

            {!isAuthReady ? (
              <div
                className={css.authPlaceholder}
                aria-hidden="true"
              />
            ) : isAuthenticated && user ? (
              <>
                <Link
                  href="/profile"
                  className={getNavLinkClassName(
                    '/profile',
                    css.mobileNavLink
                  )}
                  aria-current={
                    isActivePath('/profile')
                      ? 'page'
                      : undefined
                  }
                  onClick={closeMenu}
                >
                  My Profile
                </Link>

                {/* У CSS приховується від 768px */}
                <Link
                  href="/articles/new"
                  className={`${css.mobileNavLink} ${css.mobileCreateLink}`}
                  onClick={closeMenu}
                >
                  Create an article
                </Link>

                <div className={css.mobileUserBar}>
                  <UserBar
                    name={user.name}
                    avatar={user.avatarUrl}
                  />
                </div>
              </>
            ) : (
              <div className={css.mobileGuestActions}>
                <Link
                  href="/login"
                  className={css.mobileLoginLink}
                  onClick={closeMenu}
                >
                  Log in
                </Link>

                {/* У CSS приховується від 768px */}
                <Link
                  href="/register"
                  className={css.mobileJoinLink}
                  onClick={closeMenu}
                >
                  Join now
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;