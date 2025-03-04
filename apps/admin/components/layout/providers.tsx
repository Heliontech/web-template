'use client';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { ReactQueryProvider } from '@/components/providers/react-query-provider';
export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SessionProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}
