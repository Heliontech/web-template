import { prisma, catchPrismaError } from '@pt/db';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
// import { sendVerificationEmail } from '@/lib/email';

/**
 * Create a new user (register new account)
 * @param {Object} payload - The user data to create
 * @param {string} payload.email - The user's email
 * @param {string} payload.username - The user's username
 * @param {string} payload.password - The user's password
 * @returns {Promise<Object>} The created user or an error object
 */
export const createUser = async ({
  email,
  username,
  password
}: {
  email: string;
  username: string;
  password: string;
}) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        OR: [
          {
            email: {
              equals: email
            }
          },
          {
            username: {
              equals: username
            }
          }
        ]
      }
    });

    // user exists
    if (user && user.length) {
      return {
        meta: {
          code: 400,
          message: 'User already exists'
        }
      };
    }

    // default salt rounds is 10
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        // used for email verification
        verification_token: nanoid()
      }
    });

    if (newUser) {
      // TODO: send verification email
      // await sendVerificationEmail(newUser);
      return { meta: { code: 'OK' } };
    } else {
      return {
        meta: {
          code: 500,
          message: 'Failed to create account, please try again.'
        }
      };
    }
  } catch (error) {
    return catchPrismaError(
      error,
      'Failed to create account, please try again.'
    );
  }
};
