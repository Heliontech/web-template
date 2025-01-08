import type { Metadata } from "next";
import localFont from "next/font/local";
import { getMessages } from "next-intl/server";
import { Footer } from "@/components/common/Footer";
import { i18n } from "@pt/config";
import { NavBar } from "@/components/common/NavBar";
import Providers from "@/components/providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// generateMetadata is used to generate metadata for the page
// conflict with the metadata in the root layout
// only accept one
// export const metadata: Metadata = {
//   title: {
//     absolute: "portal template marketing - Application",
//     default: "portal template marketing - Application",
//     template: "%s | portal template marketing - Application",
//   },
// };
export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const dict: any = await getMessages();
  const url = process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com";

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | ${dict.metadata.title}`,
    },
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    authors: [{ name: "Henry" }],
    metadataBase: new URL(url),
    alternates: {
      canonical: `${url}/${params.lang}`,
      languages: {
        "en-US": `${url}/en`,
        "zh-CN": `${url}/zh`,
      },
    },
    openGraph: {
      type: "website",
      locale: params.lang,
      url: `${url}/${params.lang}`,
      title: dict.metadata.title,
      description: dict.metadata.description,
      siteName: dict.common.brand,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers locale={locale}>
          <>
            <NavBar />
            <main className='min-h-screen'>{children}</main>
            <Footer />
          </>
        </Providers>
      </body>
    </html>
  );
}
