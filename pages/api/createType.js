export default async function handler(req, res) {
  console.log('heyo:-', req.body.datos);
  try {
    const response = await fetch(
      'http://44.206.53.75/Sales-1.0/REST_Index.php/backend/AddType',
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
      throw new Error(`Bad response from server: Create Type - ${errorText}`);
    }
    const typeCreated = await response.json();

    if (typeCreated) {
      res.status(200).json(typeCreated);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
