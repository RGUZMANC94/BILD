export default async function handler(req, res) {
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/projectOverview?username=${req.body.id}&page=${req.body.page}&rows=2`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const projects = await response.json();

    if (projects) {
      res.status(200).json(projects);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Login failed' });
  }
}
