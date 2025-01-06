import { getUserLocale } from "./lib/locale-cookie";

import { i18n } from "@pt/config";
// Get the messages for the shared locale
import { getMessagesForLocale } from "@pt/i18n";

// required for next-intl
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  if (!locale) {
    locale = await getUserLocale();
  }

  // Ensure that a valid locale is used
  if (!routing.locales.includes(locale as string) || !i18n.enabled) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: await getMessagesForLocale(locale),
  };
});
