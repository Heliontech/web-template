'use server';

import { prisma } from '@pt/db';
import { revalidatePath } from 'next/cache';

export async function createUser(data: any) {
  const user = await prisma.user.create({
    data
  });

  revalidatePath('/users');
  return user;
}

export async function updateUser(id: string, data: any) {
  const user = await prisma.user.update({
    where: { id },
    data
  });

  revalidatePath('/users');
  return user;
}
