import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '@/providers/AuthProvider';
import { LocaleProvider } from '@/providers/LocaleProvider';

export const metadata: Metadata = {
  title: 'Hamdam — Global Iranian Connections',
  description:
    'A cinematic dating experience connecting Iranians across Iran and the United States with deep compatibility and long-distance ready tools.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-deepNavy antialiased">
        <LocaleProvider>
          <AuthProvider>
            <main className="min-h-screen bg-transparent">{children}</main>
          </AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
