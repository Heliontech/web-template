import { headers, cookies } from 'next/headers';
import { getTranslation } from '@/lib/i18n-server';

export const useLocale = async (namespace: string = 'common') => {
  const cookieStore = cookies();
  const headersList = headers();
  const lng =
    cookieStore.get('NEXT_LOCALE')?.value ||
    headersList.get('accept-language')?.split(',')[0] ||
    'en';
  const { t } = await getTranslation(lng, namespace);

  return { t, lng };
};
