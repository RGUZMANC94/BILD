export default async function handler(req, res) {
  console.log('quote:                     ', req.body.datos);

  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/CreatePrice?username=${req.body.id}`,
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
      console.log('Error Back: ', errorText);
      throw new Error(`Bad response from server: Create Quote- ${errorText}`);
    }
    const quoteCreated = await response.json();

    if (quoteCreated) {
      res.status(200).json(quoteCreated);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
