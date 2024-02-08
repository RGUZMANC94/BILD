export default async function handler(req, res) {
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/projectDetails?projectId=${req.body.projectId}&username=${req.body.id}&type=&page=${req.body.page}&rows=${req.body.rows}`
    );
    if (!response.ok) {
      throw new Error('Bad response from server');
    }
    const units = await response.json();

    if (units) {
      
      res.status(200).json(units);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'units not found' });
  }
}
