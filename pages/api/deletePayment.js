export default async function handler(req, res) {
  console.log('quote:                     ', req.body.iddpf);

  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/DeletePrice?iddpf=${req.body.iddpf}&username=${req.body.id}`,
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
      throw new Error(
        `Bad response from server: Delete Payment - ${errorText}`
      );
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
