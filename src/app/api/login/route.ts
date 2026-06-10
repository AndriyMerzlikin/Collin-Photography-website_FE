import { NextResponse } from 'next/server';
import { checkCredentials, AUTH_COOKIE } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (checkCredentials(email, password)) {
    const res = NextResponse.json({ ok: true });

    res.cookies.set(AUTH_COOKIE, 'true', {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });

    return res;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
