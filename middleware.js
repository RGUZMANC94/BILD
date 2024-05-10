import { NextResponse } from 'next/server';

// const protectedRoutes = process.env.PROTECTED_ROUTES.split(',');

export default function middleware(req) {
  const { cookies } = req;

  const user = cookies.get('userid');

  const token = cookies.get('access_token');

  const returnUrl = req.nextUrl.clone();
  returnUrl.pathname = '/login';

  const pathname = req.nextUrl.pathname;

  if (pathname.includes('/login')) {
    if (user && token) {
      if (user.value && token.value) {
        return NextResponse.redirect(new URL('/', req.url).toString());
      }
    }
    return NextResponse.next();
  }

  // if (protectedRoutes.includes(pathname)) {
  if (user && token) {
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
    '/detail-estate',
    '/detail-estate/:detailId*',
    '/edit-project',
    '/edit-project/:projectId*',
    '/edit-conatct',
    '/dashboard',
    '/payments',
    '/login',
    '/quotes',
    '/buyer/:buyerId*',
    '/documentation/:path*',
    '/oportunities/:path*',
    '/oportunities',
    '/payments/:path*',
    '/payments',
    '/profile/:path+',
    '/profile'
  ],
};
