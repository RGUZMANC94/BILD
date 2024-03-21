import { serialize } from 'cookie';

export default async function handler(req, res) {
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/login?username=${req.body.name}&password=${req.body.password}`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const user = await response.json();

    const { userid, rol } = user;

    if (user) {
      const useridSerialized = serialize('userid', userid, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      });
      const rolSerialized = serialize('rol', rol, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24,
        path: '/',
      });

      res.setHeader('Set-Cookie', [useridSerialized, rolSerialized]);
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Login failed' });
  }
}
