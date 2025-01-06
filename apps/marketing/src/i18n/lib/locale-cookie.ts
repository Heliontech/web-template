// This is only working in next.js application
import "server-only";

import { i18n } from "@pt/config";
import { cookies } from "next/headers";

export async function getUserLocale() {
  const cookie = (await cookies()).get(i18n.localeCookieName);
  return cookie?.value ?? i18n.defaultLocale;
}

export async function setLocaleCookie(locale: string) {
  (await cookies()).set(i18n.localeCookieName, locale);
}
