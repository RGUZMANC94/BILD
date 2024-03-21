import cookie from 'cookie';
export const parseCookies = (cookieString) => {
  return cookie.parse(cookieString);
};
