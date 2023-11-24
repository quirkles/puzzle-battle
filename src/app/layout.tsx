import React from 'react';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { ReduxProviders } from '../redux/Provider';
import { OAuthProvider, EventsProvider } from '../services';

const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Puzzle Battle',
  description: 'Head to head puzzle battle'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <EventsProvider>
      <OAuthProvider>
        <ReduxProviders>
          <html lang="en" className={lato.className}>
            <body>{children}</body>
          </html>
        </ReduxProviders>
      </OAuthProvider>
    </EventsProvider>
  );
}
