import React from 'react';
import type { Metadata } from 'next';
import { Lato, Merriweather } from 'next/font/google';

import { ReduxProviders } from '../redux';
import { OAuthProvider, EventsProvider } from '../services';

import './globals.css';

const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
});

const merriweather = Merriweather({
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
          <html lang="en" className={`${lato.className} ${merriweather.className}`}>
            <body className="w-full h-full bg-gray-light">
              <div className="">{children}</div>
            </body>
          </html>
        </ReduxProviders>
      </OAuthProvider>
    </EventsProvider>
  );
}
