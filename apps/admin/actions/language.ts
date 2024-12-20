'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function setLanguageCookie(locale: string, path: string) {
  cookies().set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 31536000
  });
  revalidatePath(path);
}
