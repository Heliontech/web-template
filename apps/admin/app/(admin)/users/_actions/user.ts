'use server';

import { prisma } from '@pt/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { registerUserSchema } from '@/lib/schema';
import { auth } from '@/auth';

// define response type
type ActionResponse<T> = {
  data?: T;
  error?: {
    code: number;
    message: string;
  };
};

export async function createUser(data: any): Promise<ActionResponse<any>> {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        error: {
          code: 401,
          message: 'Unauthorized'
        }
      };
    }

    // validate input data
    const validated = registerUserSchema.parse(data);
    // roles: ['admin', 'user']
    const { email, username, password } = validated;

    // check if user already exists
    // findFirst is high performance
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return {
        error: {
          code: 400,
          message: 'User already exists'
        }
      };
    }

    // find role id or throw error
    const role = await prisma.role.findFirstOrThrow({
      where: {
        name: data.role
      }
    });

    // default salt rounds is 10
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        ...validated,
        password: hashedPassword,
        verification_token: nanoid(),
        roles: {
          create: {
            role_id: role.id,
            assigned_at: new Date(),
            assigned_by: session.user.username || session.user.email || 'system'
          }
        }
      },
      include: {
        roles: true
      }
    });

    revalidatePath('/users');
    return { data: newUser };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: {
          code: 400,
          message: error.errors[0]?.message || 'Invalid input'
        }
      };
    }

    console.error('[USER_CREATE]', error);
    return {
      error: {
        code: 500,
        message: 'Internal server error'
      }
    };
  }
}

export async function updateUser(id: string, data: any) {
  const user = await prisma.user.update({
    where: { id },
    data
  });

  revalidatePath('/users');
  return user;
}
