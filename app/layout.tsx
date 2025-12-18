import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';

import { Categories, Header, Sidebar } from '@/app/components';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Eidra Fullstack Test App',
  description: 'Eidra Fullstack Test App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />

        <main className="flex flex-col md:flex-row md:h-[calc(100vh-4rem)] overflow-hidden">
          <div className="w-full md:w-[15%] md:min-w-[240px] md:max-w-[300px] md:h-full md:overflow-y-auto shrink-0">
            <Sidebar />
          </div>

          <div className="flex-1 flex flex-col overflow-y-auto md:h-full">
            <Suspense fallback={<div className="p-4 md:p-6 h-24 animate-pulse bg-gray-100 dark:bg-gray-800 rounded-lg m-4" />}>
              <Categories />
            </Suspense>

            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
