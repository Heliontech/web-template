import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Load translations using HTTP
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Bind i18next to React
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh'], // Supported languages
    ns: ['common'], // Namespaces for translations
    defaultNS: 'common',
    interpolation: {
      escapeValue: false // React already escapes
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json' // Path to translation files
    },
    detection: {
      order: ['cookie', 'navigator', 'localStorage', 'querystring'], // Changed order to prioritize cookie
      lookupCookie: 'NEXT_LOCALE', // Match your cookie name
      caches: ['cookie'],
      cookieOptions: {
        path: '/',
        maxAge: 31536000 // 1 year in seconds
      }
    }
  });

export default i18n;
