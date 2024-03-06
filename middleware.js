import { NextResponse } from 'next/server';

const protectedRoutes = process.env.PROTECTED_ROUTES.split(',');

export default function middleware(req) {
  const { cookies } = req;

  const user = cookies.get('userid');

  const returnUrl = req.nextUrl.clone();
  returnUrl.pathname = '/login';

  const pathname = req.nextUrl.pathname;
  if (pathname.includes('/login')) {
    if (user) {
      if (user.value) {
        try {
          return NextResponse.redirect(new URL('/', req.url).toString());
        } catch (error) {
          return NextResponse.next();
        }
      }
    }
  }

  if (protectedRoutes.includes(pathname)) {
    if (user) {
      return NextResponse.next();
    }

    console.log('No esta autorizado para ingresar a la ruta solicitada');
    return NextResponse.redirect(returnUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
