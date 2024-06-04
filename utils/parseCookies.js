import cookie from 'cookie';
export const parseCookies = (cookieString) => {
  if (!cookieString) {
    return;
  }
  return cookie.parse(cookieString);
};
