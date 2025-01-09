"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Alert, AlertTitle } from "@pt/ui/alert";
import { Button } from "@pt/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@pt/ui/form";
import { Input } from "@pt/ui/input";
import { Textarea } from "@pt/ui/textarea";
import { MailCheckIcon, MailIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const t = useTranslations();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      // TODO: Implement contact form mutation
    } catch {
      form.setError("root", { message: t("contact.form.notifications.error") });
    }
  });

  return (
    <div>
      {form.formState.isSubmitSuccessful ? (
        <Alert variant='success'>
          <MailCheckIcon className='size-6' />
          <AlertTitle>{t("contact.form.notifications.success")}</AlertTitle>
        </Alert>
      ) : (
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className='flex flex-col items-stretch gap-4'
          >
            {form.formState.errors.root?.message && (
              <Alert variant='error'>
                <MailIcon className='size-6' />
                <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
              </Alert>
            )}

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contact.form.name")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contact.form.email")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("contact.form.message")}</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={7} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-full'
              loading={form.formState.isSubmitting}
            >
              {t("contact.form.submit")}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
