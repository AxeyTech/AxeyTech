import type { Metadata } from "next";
import "./globals.css";
import RefreshRedirect from '@/components/RefreshRedirect'
import { TransitionProvider } from '@/context/TransitionContext'

export const metadata: Metadata = {
  metadataBase: new URL('https://axeytech.onrender.com'),
  title: "AKSHAY.",
  description: "Official portfolio of Akshay Sharma — Full-Stack Software Engineer. Interactive, responsive, and visually engaging web experiences.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'AKSHAY.',
    description: 'Official portfolio of Akshay Sharma — Full-Stack Software Engineer.',
    url: 'https://axeytech.onrender.com',
    siteName: 'AxeyTech',
    images: [
      {
        url: '/favicon-512x512.png',
        width: 512,
        height: 512,
        alt: 'AxeyTech Emblem',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#060608" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <RefreshRedirect />
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
