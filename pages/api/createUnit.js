export default async function handler(req, res) {
  console.log('heyo:-', req.body.updatedDatos);
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/backend/AddUnit`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body.updatedDatos),
    });
    if (!response.ok) {
      throw new Error('Bad response from server: Create Unit');
    }
    const unitCreated = await response.json();

    if (unitCreated) {
      res.status(200).json(unitCreated);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed' });
  }
}
