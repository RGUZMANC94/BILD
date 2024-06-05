import { serialize } from 'cookie';

export default async function handler(req, res) {
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/OAuth?grant_type=${req.body.grant_type}&client_id=${req.body.client_id}&client_secret=${req.body.client_secret}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body.datos),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error: ', errorText);
      throw new Error(`Bad response from server: Token Session - ${errorText}`);
    }
    console.log('Success Catchign token: ', response.status);

    const tokenResponse = await response.json();

    const { expires_in } = tokenResponse;

    if (tokenResponse) {
      const tokenResponse_serialized = serialize(
        'BD_TK',
        JSON.stringify(tokenResponse),
        {
          httpOnly: false,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'strict',
          maxAge: expires_in,
          path: '/',
        }
      );
      res.setHeader('Set-Cookie', [tokenResponse_serialized]);
      res.status(200).json(tokenResponse);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Auth Failed' });
  }
}
