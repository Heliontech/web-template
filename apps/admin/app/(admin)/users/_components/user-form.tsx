'use client';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createUser, updateUser } from '../_actions/user';
import { User } from '@pt/db';

interface UserFormProps {
  initialData?: User;
}

// use factory method to create schema
const createFormSchema = (isEditing: boolean) =>
  z
    .object({
      username: z.string().min(3, {
        message: 'Username must be at least 3 characters.'
      }),
      email: z.string().email({
        message: 'Please enter a valid email address.'
      }),
      ...(isEditing
        ? {}
        : {
            password: z
              .string()
              .min(6)
              .regex(/[A-Z]/)
              .regex(/[a-z]/)
              .regex(/[0-9]/, {
                message:
                  'Password must be at least 6 characters and contain uppercase, lowercase and number.'
              }),
            password_confirmation: z.string()
          })
    })
    .refine(
      (data) => {
        if (!isEditing) {
          return data.password === data.password_confirmation;
        }
        return true;
      },
      {
        message: "Passwords don't match",
        path: ['password_confirmation']
      }
    );

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

export default function UserForm({ initialData }: UserFormProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(createFormSchema(!!initialData)),
    defaultValues: {
      username: initialData?.username || '',
      email: initialData?.email || '',
      ...(initialData
        ? {}
        : {
            password: '',
            password_confirmation: ''
          })
    }
  });

  async function onSubmit(
    values: z.infer<ReturnType<typeof createFormSchema>>
  ) {
    try {
      setLoading(true);
      if (initialData) {
        await updateUser(initialData.id, values);
        toast.success('User updated successfully');
      } else {
        // use destructuring to remove password_confirmation
        const { password_confirmation, ...createData } = values;
        await createUser(createData);
        toast.success('User created successfully');
      }
      router.push('/users');
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
      </div>
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-left text-2xl font-bold">
            {initialData ? 'Edit User' : 'Create User'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!initialData && (
                  <>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }: any) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Enter password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password_confirmation"
                      render={({ field }: any) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirm password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <div className="flex items-center justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={loading}
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading
                      ? 'Loading...'
                      : initialData
                      ? 'Save changes'
                      : 'Create user'}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
