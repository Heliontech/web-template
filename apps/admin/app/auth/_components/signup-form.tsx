'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import GithubSignInButton from './github-auth-button';
import GoogleSignInButton from './google-auth-button';

// const signUpSchema = z
//   .object({
//     email: z.string().email('Invalid email address'),
//     username: z.string().min(3, 'Username must be at least 3 characters'),
//     password: z
//       .string()
//       .min(6, 'Password must be at least 6 characters')
//       .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
//       .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
//       .regex(/[0-9]/, 'Password must contain at least one number'),
//     password_confirmation: z.string()
//   })
//   .refine((data) => data.password === data.password_confirmation, {
//     message: "Passwords don't match",
//     path: ['password_confirmation']
//   });

const createSignUpSchema = (translations: Record<string, string>) =>
  z
    .object({
      email: z.string().email(translations.invalid_email),
      username: z.string().min(3, translations.invalid_username),
      password: z
        .string()
        .min(6, translations.invalid_password)
        .regex(/[A-Z]/, translations.invalid_password)
        .regex(/[a-z]/, translations.invalid_password)
        .regex(/[0-9]/, translations.invalid_password),
      password_confirmation: z.string()
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: translations.passwords_do_not_match,
      path: ['password_confirmation']
    });

type SignUpFormValues = z.infer<ReturnType<typeof createSignUpSchema>>;

interface SignUpFormProps {
  register: (formData: FormData) => Promise<{ error?: string }>;
  translations: {
    email: string;
    username: string;
    password: string;
    password_confirmation: string;
    create_account: string;
    enter_details_below: string;
    creating_account: string;
    or_continue_with: string;
    already_have_account: string;
    sign_in: string;
    by_continuing: string;
    terms: string;
    and: string;
    privacy: string;
    continue_with_github: string;
    continue_with_google: string;
    invalid_email: string;
    invalid_username: string;
    invalid_password: string;
    passwords_do_not_match: string;
  };
}

export function SignUpForm({ register, translations }: SignUpFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(createSignUpSchema(translations)),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      password_confirmation: ''
    }
  });

  const onSubmit = async (values: SignUpFormValues) => {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await register(formData);
      if (result?.error) {
        form.setError('root', { message: result.error });
      }
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {translations.create_account}
        </h1>
        <p className="text-sm text-muted-foreground">
          {translations.enter_details_below}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {form.formState.errors.root && (
            <div className="text-center text-sm text-red-500">
              {form.formState.errors.root.message}
            </div>
          )}

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={translations.email}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={translations.username}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={translations.password}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={translations.password_confirmation}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending
              ? translations.creating_account
              : translations.create_account}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            {translations.or_continue_with}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <GoogleSignInButton label={translations.continue_with_google} />
        <GithubSignInButton label={translations.continue_with_github} />
      </div>

      {/* Links */}
      <p className="text-center text-sm text-muted-foreground">
        {translations.already_have_account}{' '}
        <Link
          href="/auth/signin"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          {translations.sign_in}
        </Link>
      </p>

      <p className="text-center text-xs text-muted-foreground">
        {translations.by_continuing}{' '}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          {translations.terms}
        </Link>{' '}
        {translations.and}{' '}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          {translations.privacy}
        </Link>
      </p>
    </div>
  );
}
