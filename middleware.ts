import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const cookies = req.cookies;
  const accessToken = cookies.get('access_token');
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (accessToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
