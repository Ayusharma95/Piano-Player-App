import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Piano Player Application',
  description: 'A simple piano player application to explore your musical creativity.',
  keywords: 'piano, music, piano player, musical app, piano application',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon_io/favicon.ico" />
        <meta name="description" content="A simple piano player application to explore your musical creativity." />
        <meta name="keywords" content="piano, music, piano player, musical app, piano application" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:title" content="Piano Player Application" />
        <meta property="og:description" content="A simple piano player application to explore your musical creativity." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://piano-player-app.vercel.app/" />
        <meta property="og:image" content="/favicon_io/favicon-512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Piano Player Application" />
        <meta name="twitter:description" content="A simple piano player application to explore your musical creativity." />
        <meta name="twitter:image" content="/favicon_io/favicon-512x512.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
