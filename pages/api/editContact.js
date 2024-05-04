export default async function handler(req, res) {
  console.log('quote:                     ', req.body.datos);

  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/EditContact?idclient=${req.body.idclient}&username=${req.body.idclient}`,
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
        `Bad response from server: Edit contact - ${errorText}`
      );
    }
    console.log('Success: ', response.status);

    const contactCreated = await response.json();

    if (contactCreated) {
      res.status(200).json(contactCreated);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
