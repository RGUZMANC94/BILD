export default async function handler(req, res) {
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/login?username=${req.body.name}&password=0f64c95acb3a7fb93ee845d2d3d26c8e391d373e`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const user = await response.json();

    if (user) {
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Login failed' });
  }
}
