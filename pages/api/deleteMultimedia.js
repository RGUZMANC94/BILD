export default async function handler(req, res) {
  console.log('quote:                     ', req.body.iddpf);

  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/DeleteFile?idobject=${req.body.idobject}&type=${req.body.type}&subtype=${req.body.subtype}&username=${req.body.id}&idfile=${req.body.idfile}`,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error: ', errorText);
      throw new Error(`Bad response from server: Delete File - ${errorText}`);
    }
    const paymentEdited = await response.json();

    if (paymentEdited) {
      res.status(200).json(paymentEdited);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
