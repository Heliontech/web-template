import { NextRequest, NextResponse } from 'next/server';
import { registerUserSchema } from '@/lib/schema';
import { createUser } from '@/models/user';

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.json();
    const validation = registerUserSchema.safeParse(payload);
    if (!validation.success) {
      return NextResponse.json(
        {
          meta: {
            code: 400,
            message: validation.error.errors
              ?.map((item: { message: string }) => item.message)
              .join(', ')
          }
        },
        { status: 400 }
      );
    }

    const result = await createUser(validation.data);

    if (result.meta.code === 'OK') {
      return NextResponse.json(result, { status: 200 });
    }

    return NextResponse.json(result, { status: 400 });
  } catch (error: unknown) {
    // TODO: Log error
    return NextResponse.json(
      {
        meta: {
          code: 'OK',
          message:
            error instanceof Error
              ? error.message
              : 'Bad request, please try again.'
        }
      },
      {
        status: 500
      }
    );
  }
};
