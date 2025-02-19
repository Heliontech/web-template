import { auth } from '@/auth';
import { prisma } from '@pt/db';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        {
          meta: {
            code: 'E401',
            message: 'Unauthorized'
          }
        },
        { status: 401 }
      );
    }

    const user = await prisma.user.delete({
      where: {
        id: params.userId
      }
    });

    return NextResponse.json({
      meta: {
        code: 'OK'
      },
      data: user
    });
  } catch (error) {
    console.error('[USER_DELETE]', error);
    return NextResponse.json(
      {
        meta: {
          code: 'E500',
          message: 'Internal error'
        }
      },
      { status: 500 }
    );
  }
}
