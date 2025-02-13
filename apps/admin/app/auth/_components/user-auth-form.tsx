'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSession, signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Remove useLocale import and pass translations as props
interface IProps {
  translations: {
    email: string;
    password: string;
    login: string;
  };
}

export default function UserAuthForm({ translations }: IProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Implement credential login logic
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (!result) {
        toast.error(
          'Invalid email or password. Please check your credentials.',
          { duration: 10000 }
        );
        return;
      }

      // for example: {"error":"CredentialsSignin","status":200,"ok":true,"url":null}
      if (result && result.error) {
        // toast.error(
        //   "Failed to sign in. please try again later or contact support for assistance.",
        //   { position: "top-right" }
        // );
        switch (result.error) {
          case 'AccessDenied':
            toast.error(
              'Access denied. Please verify your email before signing in.',
              { duration: 10000 }
            );
            break;
          case 'CredentialsSignin':
            toast.error(
              'Invalid email or password. Please check your credentials.',
              { duration: 10000 }
            );
            break;
          default:
            toast.error(
              'Failed to sign in. Please try again later or contact support.',
              { duration: 10000 }
            );
        }
      } else {
        toast.success('Signed In Successfully!');
        router.push('/overview');
      }
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder={translations.email}
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />
        <Input
          type="password"
          placeholder={translations.password}
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {translations.login}
        </Button>
      </form>
    </div>
  );
}
