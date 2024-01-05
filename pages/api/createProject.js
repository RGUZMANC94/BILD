export default async function handler(req, res) {
  console.log('heyo:                     ', req.body.datos);

  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/CreateProject?username=${req.body.id}`,
      {
        method: 'post',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body.form),
        // body:  req.body.datos,
      }
    );
    if (!response.ok) {
      throw new Error('Bad response from server: Create Project');
    }
    const projectCreated = await response.json();

    if (projectCreated) {
      res.status(200).json(projectCreated);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed' });
  }
}
