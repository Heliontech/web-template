import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { authenticateUser } from '@/models/user';
import { loginUserSchema } from '@/lib/schema';

const authConfig: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: { type: 'text', placeholder: 'Please input your email' },
        password: {
          type: 'password',
          placeholder: 'Please input your password'
        }
      },
      // async authorize(credentials, req) {
      async authorize(credentials) {
        try {
          const validation = loginUserSchema.safeParse(credentials);
          if (!validation.success) {
            throw new Error('Invalid credentials');
          }

          // const { email, password } = loginUserSchema.parse(credentials);
          const user = await authenticateUser(credentials as any);
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null or false then the credentials will be rejected
            return null;
          }
        } catch (err) {
          // TODO
          // Log to monitor platform
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
