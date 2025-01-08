import { routing } from "@/i18n/routing";
import { getMessagesForLocale } from "@pt/i18n/lib/messages";

interface Post {
  id: string;
  title: string;
  date: string;
  description: string;
  slug: string;
  readTime: string;
}

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://your-domain.com";
  const sitemapEntries = [];
  const locales = routing.locales;

  // add base pages for each language version
  for (const locale of locales) {
    const dict = await getMessagesForLocale(locale);
    // get posts from the dictionary
    const posts: Post[] = dict.blog.posts;

    // add home page
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    });

    // add fixed pages
    const staticPages = ["blog", "pricing"];
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    // add blog posts pages
    for (const post of posts) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return sitemapEntries;
}
