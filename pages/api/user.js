import { cookies } from 'next/headers';
export default function handler(req, res) {
  const isLogged = cookies().get('isLogged') === true;

  res.status(200).json({
    isLogged,
  });
}
