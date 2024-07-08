export default async function handler(req, res) {
  console.log('quote:                     ', req.body.datos);

  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/editSalesConsultant?salesConsultantId=${req.body.salesConsultantId}&username=${req.body.idclient}`,
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
      throw new Error(`Bad response from server: Edit consultant - ${errorText}`);
    }
    console.log('Success: ', response.status);

    const opportunityCreated = await response.json();

    if (opportunityCreated) {
      res.status(200).json(opportunityCreated);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
