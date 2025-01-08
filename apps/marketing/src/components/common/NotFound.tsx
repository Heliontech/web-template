"use client";

import { Button } from "@pt/ui/button";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { i18n } from "@pt/config";
import { useTranslations } from "next-intl";

export function NotFound() {
  const t = useTranslations("404");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  // if locale is not in supported locales, force notFound
  if (!i18n.locales.includes(locale)) {
    notFound();
  }

  return (
    <div className='absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center'>
      <span className='bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent'>
        404
      </span>
      <h2 className='font-heading my-2 text-2xl font-bold'>
        {t("somethingMissing")}
      </h2>
      <p>{t("desc")}</p>
      <div className='mt-8 flex justify-center gap-2'>
        <Button onClick={() => router.back()} variant='default' size='lg'>
          {t("goBack")}
        </Button>
        <Button onClick={() => router.push("/")} variant='ghost' size='lg'>
          {t("backHome")}
        </Button>
      </div>
    </div>
  );
}
