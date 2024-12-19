// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
const { NEXTAUTH_SECRET = '', NEXTAUTH_SALT = 'authjs.session-token' } =
  process.env;
// import NextAuth from 'next-auth';
// import authConfig from './auth.config';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiAuthRegister,
  authRoutes,
  DEFAULT_ADMIN_URL,
  DEFAULT_LOGIN_REDIRECT_URL
} from '@/lib/routes';

// const { auth } = NextAuth(authConfig);
// export default auth((req) => {
//   if (!req.auth) {
//     const url = req.url.replace(req.nextUrl.pathname, '/');
//     return Response.redirect(url);
//   }
// });

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { pathname } = nextUrl;

  const isApiAuthRoute =
    pathname.startsWith(apiAuthPrefix) || pathname === apiAuthRegister;
  // const isPublicRoute = publicRoutes.includes(pathname) || publicRoutes;
  // Update the public route check
  const isAuthRoute = authRoutes.includes(pathname);

  if (isApiAuthRoute) {
    return null;
  }

  const token = await getToken({
    req,
    secret: NEXTAUTH_SECRET,
    salt: NEXTAUTH_SALT
  });

  console.log('token', token);

  if (token) {
    // user access auth route directly, and application could redirect to dashboard
    if (isAuthRoute) {
      return Response.redirect(new URL(DEFAULT_ADMIN_URL, nextUrl));
    }
    return null;
  } else {
    if (!isAuthRoute) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_URL, nextUrl));
    }
    return null;
  }
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
};
