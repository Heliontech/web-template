import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "./theme-provider";
// TBD
// import { SessionProvider, SessionProviderProps } from 'next-auth/react';
export default async function Providers({
  // session,
  locale,
  children,
}: {
  locale: string;
  // session: SessionProviderProps["session"];
  children: React.ReactNode;
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  // let messages;
  // try {
  //   messages = require(`@pt/i18n/${locale}.json`);
  //   console.log({ messages });
  // } catch (error) {
  //   throw new Error(`Missing translations for locale: "${locale}"`);
  // }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        {/* <SessionProvider session={session}>{children}</SessionProvider> */}
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
