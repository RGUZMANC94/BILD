export default async function handler(req, res) {
  console.log('heyo: ', JSON.stringify(req.body));

  try {
    const response = await fetch(
      'http://44.206.53.75/Sales-1.0/REST_Index.php/backend/UploadFile',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept-Encoding': 'gzip, deflate, br',
          'User-Agent': 'PostmanRuntime/7.26.8',
          'Connection': 'keep-alive',
          'Accept': '*/*',
        },
        body: req.body,
      }
    );
    if (!response.ok) {
      // console.log('Error: ', response);
      throw new Error('Bad response from server: Upload image Project');
    }
    const projectCreated = await response.json();

    if (projectCreated) {
      res.status(200).json(projectCreated);
    }
  } catch (error) {
    console.error('Error:------', error);
    res.status(400).json({ error: 'Failed Charge Image' });
  }
}
