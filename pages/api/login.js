import { serialize } from 'cookie';

export default async function handler(req, res) {
  // const { API_URL } = process.env;
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/login?username=${req.body.name}&password=${req.body.password}`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }

    const user = await response.json();

    const responseToken = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/OAuth?grant_type=${req.body.grant_type}&client_id=${req.body.client_id}&client_secret=${req.body.client_secret}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body.datos),
      }
    );

    if (!responseToken.ok) {
      const errorText = await responseToken.text();
      console.log('Error: ', errorText);
      throw new Error(`Bad response from server: Token Session - ${errorText}`);
    }
    console.log('Success Catchign token: ', responseToken.status);

    const tokenResponse = await responseToken.json();

    const infoToSave = {
      tokenResponse,
      user,
    };

    const { expires_in } = tokenResponse;

    if (user) {
      if (tokenResponse) {
        const userInfo_serialized = serialize(
          'user_tk',
          JSON.stringify(infoToSave),
          {
            httpOnly: false,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: expires_in,
            path: '/',
          }
        );
        res.setHeader('Set-Cookie', [userInfo_serialized]);
        res.status(200).json(infoToSave);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Login failed' });
  }
}
