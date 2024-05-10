import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const authRoutes = ['/login', '/register', '/register/*'];

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token');
  const pathname = req.nextUrl.pathname;

  // If already accessToken
  if (accessToken) {
    // Check access token's expire
    try {
      const secret = new TextEncoder().encode(process.env.SECRET_KEY);
      const { payload } = await jose.jwtVerify(accessToken?.value as string, secret);

      // If user in auth routes and already login redirect into home page
      if (authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      // If access token is expired and user in home page redirect into login page
      if (!authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      return NextResponse.next();
    }
  }

  // If accessToken is empty
  if (!accessToken) {
    authRoutes.forEach((route) => {
      if (!pathname.startsWith(route))
        return NextResponse.redirect(new URL('/login', req.url));
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
