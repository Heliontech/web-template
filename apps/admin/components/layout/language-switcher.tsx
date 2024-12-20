'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import i18n from '@/lib/i18n';
import { setLanguageCookie } from '@/actions/language';

interface Language {
  code: string;
  name: string;
  flag?: string;
}

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' }
  ];

  const changeLanguage = async (locale: string) => {
    await i18n.changeLanguage(locale);
    await setLanguageCookie(locale, pathname);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              changeLanguage(lang.code);
            }}
          >
            {lang.flag && <span className="mr-2">{lang.flag}</span>}
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
