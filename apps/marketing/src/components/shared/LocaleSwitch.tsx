"use client";

import { updateLocale } from "@/i18n/lib/update-locale";
import { useLocalePathname, useLocaleRouter } from "@/i18n/routing";
import { config } from "@pt/config";
import type { Locale } from "@pt/i18n";
import { Button } from "@pt/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@pt/ui/dropdown-menu";
import { LanguagesIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const { locales, localesWithLabel } = config.i18n;

export function LocaleSwitch({
  withLocaleInUrl = true,
}: {
  withLocaleInUrl?: boolean;
}) {
  const localeRouter = useLocaleRouter();
  const localePathname = useLocalePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();
  const [value, setValue] = useState<string>(currentLocale);

  console.log({ locales });
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' aria-label='Language'>
          <LanguagesIcon className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            setValue(value);

            if (withLocaleInUrl) {
              localeRouter.replace(
                `/${localePathname}?${searchParams.toString()}`,
                {
                  locale: value,
                }
              );
            } else {
              updateLocale(value as Locale);
              router.refresh();
            }
          }}
        >
          {localesWithLabel.map(({ locale, label }) => {
            return (
              <DropdownMenuRadioItem key={locale} value={locale}>
                {label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
