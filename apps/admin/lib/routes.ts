/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/register',
  '/auth/reset',
  '/auth/new-password'
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';
export const apiAuthRegister = '/api/register';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/overview';

export const DEFAULT_ADMIN_URL = '/overview';

export const DEFAULT_LOGIN_REDIRECT_URL = '/auth/signin';
