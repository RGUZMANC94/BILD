import cookie from 'cookie';
export const parseCookies = (cookieString) => {
  console.log(cookieString);
  console.log(typeof cookieString);
  if (!cookieString || typeof cookieString !== 'string') {
    return;
  }
  return cookie.parse(cookieString);
};
