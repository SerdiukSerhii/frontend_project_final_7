import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Manrope, DM_Sans, Noto_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import AuthProvider from '@/components/AuthProvider/AuthProvider';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

import 'modern-normalize/modern-normalize.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Harmoniq',
  description: 'Harmoniq — a simple and intuitive platform for reading articles.',

  openGraph: {
    title: 'Harmoniq',
    description: 'Harmoniq — a simple and intuitive platform for reading articles.',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Harmoniq app preview',
      },
    ],
  },
};

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'cyrillic'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin', 'latin-ext'],
});

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin', 'cyrillic'],
});

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${dmSans.variable} ${notoSans.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <div className="layout">
              <Header />

              <main>{children}</main>

              <Footer />
            </div>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
              }}
            />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
