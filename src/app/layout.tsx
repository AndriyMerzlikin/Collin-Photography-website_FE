import React from 'react';
import type { Metadata } from 'next';
import { Noticia_Text } from 'next/font/google';
import '@/theme/globals.scss';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Toaster } from 'react-hot-toast';
import {CartProvider} from "@/context/cartContext";

const noticia = Noticia_Text({
  variable: '--font-noticia-text',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Collin Photography',
  description: 'Collin`s photography website',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noticia.variable}>
      <CartProvider>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster toastOptions={{ duration: 4000 }} />
      </CartProvider>
      </body>
    </html>
  );
}
