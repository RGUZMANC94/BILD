import { serialize } from 'cookie';

export default function logoutHandler(req, res) {
  const deleteCookie = serialize('user_tk', '', {
    httpOnly: false,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1, // Esto hace que la cookie expire inmediatamente
    path: '/',
  });

  res.setHeader('Set-Cookie', [deleteCookie]);
  res.status(200).json({ message: 'Cookie deleted' });
}