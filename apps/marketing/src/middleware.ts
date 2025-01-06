import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  ...routing,
  // Prevent infinite redirects by setting defaultLocale
  defaultLocale: "en",
  locales: ["en", "zh"],
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/",
    "/(zh|en)/:path*",
    "/((?!api|image-proxy|images|fonts|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
  // matcher: [
  //   "/((?!api|image-proxy|images|fonts|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  // ],
};
