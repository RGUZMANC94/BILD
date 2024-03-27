import { NextResponse } from 'next/server';

// const protectedRoutes = process.env.PROTECTED_ROUTES.split(',');

export default function middleware(req) {
  const { cookies } = req;

  const user = cookies.get('userid');

  const returnUrl = req.nextUrl.clone();
  returnUrl.pathname = '/login';

  const pathname = req.nextUrl.pathname;

  if (pathname.includes('/login')) {
    if (user) {
      if (user.value) {
        return NextResponse.redirect(new URL('/', req.url).toString());
      }
    }
    return NextResponse.next();
  }

  // if (protectedRoutes.includes(pathname)) {
  if (user) {
    return NextResponse.next();
  }
  console.log('Devolviendo a login');
  return NextResponse.redirect(returnUrl);
  // }
}

export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/',
    '/detail-estate/:detailId*',
    '/contact',
    '/create-contact',
    '/create-project',
    '/dashboard',
    '/payments',
    '/login',
    '/quotes',
    '/buyer/:buyerId*',
    '/documentation/:path*',
    '/oportunities/:path*',
    '/oportunities',
    '/payments/:path*',
    '/profile/:path+',
  ],
};
