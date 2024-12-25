'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

interface IProps {
  label?: string;
}

export default function GithubSignInButton({
  label = 'Continue with Github'
}: IProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => signIn('github', { callbackUrl: callbackUrl ?? '' })}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      {label}
    </Button>
  );
}
