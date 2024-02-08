export default async function handler(req, res) {
  console.log('Multimedia Service:----------', req.body);
  try {
    const response = await fetch(
      'http://44.206.53.75/Sales-1.0/REST_Index.php/backend/UploadFile',
      {
        method: 'POST',
        headers: {
        },
        body: req.body.formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error: ', errorText);
      throw new Error(`Bad response from server: upload file - ${errorText}`);
    }

    console.log('Success: ', response.status);

    const responseData = await response.json();
    res.status(200).json(responseData);

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message || 'Failed' });
  }
}
