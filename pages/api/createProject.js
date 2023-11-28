export default async function handler(req, res) {
  console.log(req);
  console.log(req.body);

  try {
    const response = await fetch(
      `http://44.206.53.75/Sales-1.0/REST_Index.php/backend/CreateProject`,
      {
        method: "put",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: req.body,
      }
    );
    if (!response.ok) {
      throw new Error("Bad response from server");
    }
    const projectCreated = await response.json();

    if (projectCreated) {
      res.status(200).json(projectCreated);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed" });
  }
}
