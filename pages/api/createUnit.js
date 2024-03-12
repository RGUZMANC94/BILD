export default async function handler(req, res) {
  console.log('heyo:-', req.body.updatedDatos);
  try {
    const response = await fetch(
      'http://44.206.53.75/Sales-1.0/REST_Index.php/backend/AddUnit',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body.updatedDatos),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error: ', errorText);
      throw new Error(`Bad response from server: Create Unit - ${errorText}`);
    }
    const unitCreated = await response.json();

    if (unitCreated) {
      res.status(200).json(unitCreated);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
