import { NextResponse } from 'next/server';

// const protectedRoutes = process.env.PROTECTED_ROUTES.split(',');

export default function middleware(req) {
  const { cookies } = req;

  const userInfo = cookies.get('user_tk');

  const returnUrl = req.nextUrl.clone();
  returnUrl.pathname = '/login';

  const pathname = req.nextUrl.pathname;

  if (pathname.includes('/login')) {
    if (userInfo) {
      if (userInfo.value) {
        return NextResponse.redirect(new URL('/', req.url).toString());
      }
    }
    return NextResponse.next();
  }

  // if (protectedRoutes.includes(pathname)) {
  if (userInfo) {
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
    '/contacts',
    '/contacts/:contactId*',
    '/contacts/:contactId*/payments',
    '/contacts/:contactId*/payments/:paymentId*',
    '/contacts/:contactId*/quotes',
    '/create-contact',
    '/create-project',
    '/dashboard',
    '/payments',
    '/login',
    '/quotes',
    '/buyer/:buyerId*',
    '/documentation/:path*',
    '/opportunities/:path*',
    '/opportunities',
    '/payments/:path*',
    '/profile/:path+',
    
  ],
};
