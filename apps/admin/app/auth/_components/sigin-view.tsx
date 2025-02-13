import { Metadata } from 'next';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

import { Mail, Lock } from 'lucide-react';
import UserAuthForm from './user-auth-form';
import EmailAuthForm from './email-auth-form';
import { useLocale } from '@/hooks/use-locale';
import GithubSignInButton from './github-auth-button';
import GoogleSignInButton from './google-auth-button';
import { LanguageSwitcher } from '@/components/layout/language-switcher';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account'
};

export default async function SignInViewPage() {
  const { t } = await useLocale();

  const userFormTranslations = {
    email: t('email'),
    password: t('password'),
    login: t('login')
  };

  const emailFormTranslations = {
    email: t('email'),
    continue_with_email: t('continue_with_email')
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-50">
      <div className="relative m-4 w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
        <div className="absolute right-4 top-4">
          <LanguageSwitcher />
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t('welcome_back')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t('choose_sign_in_method')}
            </p>
          </div>

          <Tabs defaultValue="credentials" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="credentials">
                <Lock className="mr-2 h-4 w-4" />
                {t('with_password')}
              </TabsTrigger>
              <TabsTrigger value="email">
                <Mail className="mr-2 h-4 w-4" />
                {t('with_email')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="credentials">
              <UserAuthForm translations={userFormTranslations} />
            </TabsContent>
            <TabsContent value="email">
              <EmailAuthForm translations={emailFormTranslations} />
            </TabsContent>
          </Tabs>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                {t('or_continue_with')}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <GoogleSignInButton label={t('continue_with_google')} />
            <GithubSignInButton label={t('continue_with_github')} />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            {t('no_account')}{' '}
            <Link
              href="/auth/signup"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              {t('sign_up')}
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground">
            {t('by_continuing')}{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t('terms')}
            </Link>{' '}
            {t('and')}{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              {t('privacy')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
