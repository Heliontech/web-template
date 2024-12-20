import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import type { i18n } from 'i18next';

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((language: string, namespace: string) => {
        return import(`../public/locales/${language}/${namespace}.json`);
      })
    )
    .init({
      lng,
      ns,
      fallbackLng: 'en',
      supportedLngs: ['en', 'zh'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false
      }
    });
  return i18nInstance;
};

export async function getTranslation(
  lng: string,
  ns: string = 'common'
): Promise<{
  t: ReturnType<i18n['getFixedT']>;
  i18n: i18n;
}> {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, ns),
    i18n: i18nextInstance
  };
}
