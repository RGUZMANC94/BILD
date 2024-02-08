export default async function handler(req, res) {
  console.log('heyo:-', req.body.datos);
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/CreateEvent?username=${req.body.id}`,
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
      throw new Error(
        `Bad response from server: Create event - ${errorText}`
      );
    }
    console.log('Success: ', response.status);

    const eventCreated = await response.json();

    if (eventCreated) {
      res.status(200).json(eventCreated);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
