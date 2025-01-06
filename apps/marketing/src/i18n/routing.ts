import { i18n } from "@pt/config";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  //Object.keys(i18n.locales),
  locales: i18n.locales,
  // Used when no locale matches
  defaultLocale: i18n.defaultLocale,
  localeCookie: {
    name: i18n.localeCookieName,
  },
  localePrefix: i18n.enabled ? "always" : "never",
  localeDetection: i18n.enabled,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
// export const {Link, redirect, usePathname, useRouter, getPathname} =
//   createNavigation(routing);
export const {
  Link: LocaleLink,
  redirect: localeRedirect,
  usePathname: useLocalePathname,
  useRouter: useLocaleRouter,
} = createNavigation(routing);
