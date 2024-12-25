import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { useLocale } from '@/hooks/use-locale';
import { LanguageSwitcher } from '@/components/layout/language-switcher';

import { SignUpForm } from './signup-form';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account'
};

// Server action
async function register(formData: FormData) {
  'use server';

  console.log('register--------------', formData);

  const data = {
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
    password_confirmation: formData.get('password_confirmation')
  };

  if (data.password !== data.password_confirmation) {
    return { error: 'Passwords do not match' };
  }

  const response = await fetch(`${process.env.API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  redirect('/auth/signin?registered=true');
}

export default async function SignUpViewPage() {
  const { t } = await useLocale('common');

  const signUpFormTranslations = {
    create_account: t('create_account'),
    enter_details_below: t('enter_details_below'),
    email: t('email'),
    username: t('username'),
    password: t('password'),
    password_confirmation: t('password_confirmation'),
    creating_account: t('creating_account'),
    or_continue_with: t('or_continue_with'),
    already_have_account: t('already_have_account'),
    sign_in: t('sign_in'),
    by_continuing: t('by_continuing'),
    terms: t('terms'),
    and: t('and'),
    privacy: t('privacy'),
    continue_with_github: t('continue_with_github'),
    continue_with_google: t('continue_with_google'),
    invalid_email: t('invalid_email'),
    invalid_username: t('invalid_username'),
    invalid_password: t('invalid_password'),
    passwords_do_not_match: t('passwords_do_not_match')
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50">
      <div className="relative m-4 w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <div className="absolute right-4 top-4">
          <LanguageSwitcher />
        </div>
        <SignUpForm register={register} translations={signUpFormTranslations} />
      </div>
    </div>
  );
}
