import React from 'react';
import type { Metadata } from 'next';

import { ReduxProviders } from '../redux';
import { OAuthProvider, EventsProvider } from '../services';

import './globals.css';
import { lato } from './fonts';

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
            <body className="w-full h-full bg-gray-light">{children}</body>
          </html>
        </ReduxProviders>
      </OAuthProvider>
    </EventsProvider>
  );
}
