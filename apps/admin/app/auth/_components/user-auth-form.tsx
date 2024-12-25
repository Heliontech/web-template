'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Remove useLocale import and pass translations as props
interface IProps {
  translations: {
    email: string;
    password: string;
    login: string;
  };
}

export default function UserAuthForm({ translations }: IProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement credential login logic
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
        <Button type="submit" className="w-full">
          {translations.login}
        </Button>
      </form>
    </div>
  );
}
