export const AUTH_COOKIE = 'admin-auth';

export function checkCredentials(email: string, password: string) {
  return (
    email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD
  );
}
