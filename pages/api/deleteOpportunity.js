export default async function handler(req, res) {
  console.log('heyo:                     ', req.body.opportunitySelected);

  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/DeleteSalesOp?idopt=${encodeURIComponent(
        req.body.opportunitySelected
      )}&username=${req.body.id}`,
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
        `Bad response from server: Delete Opportunity - ${errorText}`
      );
    }

    console.log('Success: ', response.status);

    const opportunityCreated = await response.json();

    if (opportunityCreated) {
      console.log('Success: ', opportunityCreated);
      res.status(200).json(opportunityCreated);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
