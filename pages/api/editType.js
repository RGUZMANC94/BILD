export default async function handler(req, res) {
  console.log('quote:                     ', req.body.datos);

  try {
    const response = await fetch(
      'http://44.206.53.75/Sales-1.0/REST_Index.php/backend/EditType',
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
      throw new Error(`Bad response from server: Edit Quote - ${errorText}`);
    }
    const quoteEdited = await response.json();

    if (quoteEdited) {
      res.status(200).json(quoteEdited);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
