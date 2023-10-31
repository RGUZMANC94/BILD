import fsPromises from "fs/promises";
import path from "path";

export async function getLocalData() {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), "pages/api/projects.json");
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
  const objectData = JSON.parse(jsonData);

  return objectData;
}

export default async function handler(req, res) {
  const projectsDetails = await getLocalData();

  const projectSelected = projectsDetails.find(
    (project) => project.id === Number(req.body.identificator)
  );

  if (projectSelected) {
    res.status(200).json(projectSelected);
  } else {
    res.status(200).json([
      {
        body: "saf",
      },
    ]);
  }
}
