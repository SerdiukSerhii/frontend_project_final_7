import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = [
  '/profile',
  '/articles/edit',
];

const publicRoutes = [
  '/login',
  '/register',
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route =>
    pathname.startsWith(route),
  );

  const isPrivateRoute =
    privateRoutes.some(route =>
      pathname.startsWith(route),
    ) ||
    /^\/articles\/[^/]+\/edit(?:\/|$)/.test(pathname);

  // 1. Є accessToken
  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(
        new URL('/', request.url),
      );
    }

    return NextResponse.next();
  }

  // 2. AccessToken немає, але є refreshToken
  if (refreshToken) {
    try {
      const refreshResponse = await fetch(
        new URL('/api/auth/refresh', request.url),
        {
          method: 'POST',
          headers: {
            cookie: request.headers.get('cookie') ?? '',
          },
        },
      );

      if (refreshResponse.ok) {
        const response = isPublicRoute
          ? NextResponse.redirect(
              new URL('/', request.url),
            )
          : NextResponse.next();

        const setCookies =
          refreshResponse.headers.getSetCookie();

        for (const cookie of setCookies) {
          response.headers.append(
            'Set-Cookie',
            cookie,
          );
        }

        return response;
      }
    } catch (error) {
      console.error(
        'Proxy refresh error:',
        error,
      );
    }
  }

  // 3. Refresh немає або він не спрацював
  if (isPrivateRoute) {
    const response = NextResponse.redirect(
      new URL('/login', request.url),
    );

    response.cookies.delete('sessionId');
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
  }

  // 4. Неавторизований користувач може відкрити login/register
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/articles/edit/:path*',
    '/articles/:articleId/edit/:path*',
    '/login',
    '/register',
  ],
};