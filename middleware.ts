import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('openMarketToken')?.value;

  // Verificar si el usuario tiene un token y está intentando acceder a /auth
  if (currentUser && request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(
      new URL('/seller/inventory?skip=0&limit=12', request.url)
    );
  }

  // Verificar si el usuario no tiene un token y está intentando acceder a /seller
  if (!currentUser && request.nextUrl.pathname.startsWith('/seller')) {
    return Response.redirect(new URL('/auth/signin', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
