export const i18n = {
  enabled: true,
  defaultLocale: "en",
  locales: ["en", "zh"],
  localeCookieName: "@pt/i18n",
  localesWithLabel: [
    {
      locale: "en",
      label: "English",
    },
    {
      locale: "zh",
      label: "中文",
    },
  ],
};

export const config = {
  i18n,
  contactForm: {
    enabled: true,
    email: "hello@pt.com",
  },
  ui: {
    saas: {
      enabled: false,
    },
  },
};
