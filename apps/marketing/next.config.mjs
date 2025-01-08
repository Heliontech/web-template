import createNextIntlPlugin from "next-intl/plugin";

// const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["@pt/logger", "@pt/ui", "@pt/db"],
  // serverExternalPackages: ["pino"],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      worker_threads: false,
    };
    return config;
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
