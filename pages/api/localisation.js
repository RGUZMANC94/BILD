export default async function handler(req, res) {
  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/GetCities?codecountry=${req.body.codecountry}&codedeparment=${req.body.codedeparment}&namecountry=${req.body.namecountry}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error: ', errorText);
      throw new Error(
        `Bad response from server: Request localisation - ${errorText}`
      );
    }

    const localisation = await response.json();

    if (localisation) {
      res.status(200).json(localisation);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
