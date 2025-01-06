import createNextIntlPlugin from "next-intl/plugin";

// const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en/home",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
