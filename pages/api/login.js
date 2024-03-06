// import { serialize } from 'cookie';
// import { sign } from 'jsonwebtoken';
// const secret = process.env.SECRET;

export default async function handler(req, res) {
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/login?username=${req.body.name}&password=0f64c95acb3a7fb93ee845d2d3d26c8e391d373e`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const user = await response.json();

    const { email, last_name, name, rol, userid } = user;

    if (user) {
      // const token = sign(
      //   {
      //     exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      //     username: userid,
      //   },
      //   secret
      // );

      // const serialised = serialize('OursiteJWT', token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV !== 'development',
      //   sameSite: 'strict',
      //   maxAge: 60 * 60 * 24,
      //   path: '/',
      // });

      res.writeHead(200, {
        'Set-Cookie': [
          `userid=${userid}; expires=${new Date(
            new Date().getTime() + 30 * 60000
          ).toUTCString()}, name=${name}; expires=${new Date(
            new Date().getTime() + 30 * 60000
          ).toUTCString()}`,
        ],
      });
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Login failed' });
  }
}
