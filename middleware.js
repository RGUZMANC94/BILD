import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const secret = process.env.SECRET;
const protectedRoutes = process.env.PROTECTED_ROUTES.split(',');

export default function middleware(req) {
  const { cookies } = req;

  console.log(cookies);

  const jwt = cookies.get('OursiteJWT');

  const returnUrl = req.nextUrl.clone();
  returnUrl.pathname = '/login';

  const pathname = req.nextUrl.pathname;
  if (pathname.includes('/login')) {
    console.log('Entrando a Login');
    if (jwt) {
      if (jwt.value) {
        console.log('Si hay token');
        try {
          verify(jwt.value, secret);
          console.log('Llevando a home despues de verificar token');
          return NextResponse.redirect(new URL('/', req.url).toString());
        } catch (error) {
          return NextResponse.next();
        }
      }
    }

    console.log(pathname);
  }

  if (protectedRoutes.includes(pathname)) {
    console.log('La ruta solicitada esta protegida');
    if (jwt) {
      if (jwt.value === undefined) {
        console.log('No esta autorizado para ingresar a la ruta solicitada');
        return NextResponse.redirect(returnUrl);
      }
    }
    console.log('Si hay token');
    try {
      console.log('trantado de ingresar a la ruta');
      verify(jwt.value, secret);
      return NextResponse.redirect(new URL(pathname, req.url).toString());
    } catch (error) {
      console.log('no se pudo ingresar a la ruta');
      console.log(error);
      return NextResponse.redirect(returnUrl);
    }
  }
  // return NextResponse.redirect(new URL(pathname, req.url).toString());
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
